import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createMood, createSession, createUser, generateValidBodyForMoods } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /moods/today", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/moods/today");
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
  
    const response = await server.get("/moods/today").set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
  
    const response = await server.get("/moods/today").set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  describe("when token is valid", () => {
    it("should respond with status 400 when params are not passed", async () => {
      const token = await generateValidToken();
      
      const response = await server.get("/moods/today").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
      
    it("should respond with empty object when there is no mood for today yet", async () => {
      const token = await generateValidToken();
  
      const response = await server.get(`/moods/today?filterDate=${new Date()}, filterParam=day`).set("Authorization", `Bearer ${token}`);
  
      expect(response.body).toEqual({});
    });

    it("should respond with status 200 and with existing mood data", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
      const mood = await createMood(user.id);
      
      const response = await server.get(`/moods/today?filterDate=${new Date()}&filterParam=day`).set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        {
          id: mood.moodId,
          name: mood.Moods.name,
          color: mood.Moods.color, 
        },
      );
    });
  });
});

describe("POST /moods", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/moods");
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
  
    const response = await server.post("/moods").set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
  
    const response = await server.post("/moods").set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const token = await generateValidToken();
      
      const response = await server.post("/moods").set("Authorization", `Bearer ${token}`).send({});
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
      
    it("should respond with  status 400 when given mood name is invalid", async () => {
      const token = await generateValidToken();
      const invalidBody = { ...generateValidBodyForMoods(), name: faker.lorem.words() };
  
      const response = await server.post("/moods").set("Authorization", `Bearer ${token}`).send(invalidBody);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 200", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
      const validBody = generateValidBodyForMoods();

      const response = await server.post("/moods").set("Authorization", `Bearer ${token}`).send(validBody);
        
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe("GET /moods/history", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/moods/history");
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
  
    const response = await server.get("/moods/history").set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
  
    const response = await server.get("/moods/history").set("Authorization", `Bearer ${token}`);
  
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  
  describe("when token is valid", () => {
    it("should respond with status 400 when no query param is passed", async () => {
      const token = await generateValidToken();
  
      const response = await server.get("/moods/history").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when given query param is not valid", async () => {
      const token = await generateValidToken();
  
      const response = await server.get(`/moods/history?offset=NaN`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with empty array when there are no moods reported", async () => {
      const token = await generateValidToken();
  
      const response = await server.get(`/moods/history?offset=0`).set("Authorization", `Bearer ${token}`);
  
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and with existing mood history data", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
      const mood = await createMood(user.id);
      
      const response = await server.get(`/moods/history?offset=0`).set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.OK);

      expect(response.body).toEqual(
        [{
          date: (mood.createdAt).toISOString(),
          mood: mood.Moods.name, 
          color: mood.Moods.color, 
        }]
      );
    });
  });
});
