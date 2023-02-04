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

describe("GET /report", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/report");
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    
    const response = await server.get("/report").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
    
    const response = await server.get("/report").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  describe("when token is valid", () => {
    it("should respond with status 400 when no query param is passed", async () => {
      const token = await generateValidToken();
    
      const response = await server.get("/report").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when given query param is not valid", async () => {
      const token = await generateValidToken();
    
      const response = await server.get("/report?offset=NaN").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
      
    it("should respond with empty array when user hasn't made any reports", async () => {
      const token = await generateValidToken();
    
      const response = await server.get("/report?offset=0").set("Authorization", `Bearer ${token}`);
    
      expect(response.body).toEqual([]);
    });
  
    it("should respond with status 200 and with existing reports history data", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
      const report = await createReport(user.id);
        
      const response = await server.get("/report?offset=0").set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(httpStatus.OK);
  
      expect(response.body).toEqual(
        [{
          date: (report.date).toISOString(),
          id: report.id, 
        }]
      );
    });
  });
});

describe("GET /report/1", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/report");
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    
    const response = await server.get("/report/1").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if there is no session for given token", async () => {
    await createUser();
    const token = faker.random.alphaNumeric(20);
    
    const response = await server.get("/report/1").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  describe("when token is valid", () => {     
    it("should respond with status 400 when given params are invalid", async () => {
      const token = await generateValidToken();
        
      const response = await server.get("/report/NaN").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 404 when no report is found for given report id", async () => {
      const token = await generateValidToken();
    
      const response = await server.get("/report/-1").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  
    it("should respond with status 200 and with given report data", async () => {
      const user = await createUser();
      const token = faker.random.alphaNumeric(20);
      await createSession(token, user.id);
      const report = await createReport(user.id);
        
      const response = await server.get(`/report/${report.id}`).set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(httpStatus.OK);
  
      expect(response.body).toEqual(
        {
          date: (report.date).toISOString(),
          text: report.text,
          emotionalSymptoms: [{
            name: report.MySymptoms[1].Symptoms.name,
            color: report.MySymptoms[1].Symptoms.Spots.color,
          }],
          physicalSymptoms: [{
            name: report.MySymptoms[0].Symptoms.name,
            color: report.MySymptoms[0].Symptoms.Spots.color,
          }],
          emotions: [{
            name: report.MyEmotions[0].Emotions.name,
            color: report.MyEmotions[0].Emotions.color,
          }], 
        }
      );
    });
  });
});
