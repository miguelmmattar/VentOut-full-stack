import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createReport, createSession, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /data", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/data");
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    
    const response = await server.get("/data").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
    
    const response = await server.get("/data").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  describe("when token is valid", () => {  
    it("should respond with status 200 and with existing mood data", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
        
      const response = await server.get("/data").set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});

describe("GET /data", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/data/filter");
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
      
    const response = await server.get("/data/filter").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
      
    const response = await server.get("/data/filter").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  describe("when token is valid", () => {
    it("should respond with status 400 when no queries are given", async () => {
      const token = await generateValidToken();
          
      const response = await server.get("/data/filter").set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    
    it("should respond with status 200 and with existing filtered data", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
      await createReport(user.id);
      const date = faker.date.past();
          
      const response = await server.get(`/data/filter?date=${date}&param=week`).set("Authorization", `Bearer ${token}`);
            
      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
