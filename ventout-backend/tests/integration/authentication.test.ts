import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createSession, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /auth/sign-in", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/auth/sign-in");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/auth/sign-in").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidSessionParams = async (email?: string) => ({
      email: email || faker.internet.email(),
      token: await generateValidToken(),
    });

    const generateValidUserParams = async () => ({
      email: faker.internet.email(),
      name: faker.name.fullName(),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = await generateValidSessionParams();
      
      const response = await server.post("/auth/sign-in").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const userBody = await generateValidUserParams();
        const user = await createUser(userBody);
        const sessionBody = await generateValidSessionParams(user.email);
  
        const response = await server.post("/auth/sign-in").send(sessionBody);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with user data and valid token", async () => {
        const userBody = await generateValidUserParams();
        const user = await createUser(userBody);
        const sessionBody = await generateValidSessionParams(user.email);

        const response = await server.post("/auth/sign-in").send(sessionBody);

        expect(response.body).toEqual({
          user: {
            name: userBody.name,
            email: userBody.email,
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          token: sessionBody.token,
        });
      });
    });
  });
});

describe("POST /auth/sign-up", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/auth/sign-up");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/auth/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidUserParams = async () => ({
      email: faker.internet.email(),
      name: faker.name.fullName(),
    });

    it("should respond with status 200", async () => {
      const userBody = await generateValidUserParams();

      const response = await server.post("/auth/sign-up").send(userBody);

      expect(response.status).toBe(httpStatus.OK);
    });

    it("should respond with user data", async () => {
      const userBody = await generateValidUserParams();

      const response = await server.post("/auth/sign-up").send(userBody);

      expect(response.body).toEqual({
        name: userBody.name,
        email: userBody.email,
        id: expect.any(Number),
      });
    });
  });
});

describe("DELETE /auth/sign-out", () => {
  it("should respond with status 404 when user id is not given", async () => {
    const response = await server.delete("/auth/sign-out");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 400 when user id is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.delete("/auth/sign-out/NaN").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when user id is valid", () => {
    const generateValidUserParams = async () => ({
      email: faker.internet.email(),
      name: faker.name.fullName(),
    });

    const generateValidSessionParams = async (email?: string) => ({
      email: email || faker.internet.email(),
      token: await generateValidToken(),
    });

    it("should respond with status 404 when there is no user for given id", async () => {
      const userBody = await generateValidUserParams();
      const user = await createUser(userBody);
      const invalidUserId = user.id + 1;

      const response = await server.delete(`/auth/sign-out/${invalidUserId}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 200", async () => {
      const userBody = await generateValidUserParams();
      const user = await createUser(userBody);
      const sessionBody = await generateValidSessionParams(user.email);
      await createSession(sessionBody.token, user.id);

      const response = await server.delete(`/auth/sign-out/${user.id}`);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
