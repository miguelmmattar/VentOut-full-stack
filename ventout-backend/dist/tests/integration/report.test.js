"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importStar(require("@/app"));
const faker_1 = require("@faker-js/faker");
const http_status_1 = __importDefault(require("http-status"));
const supertest_1 = __importDefault(require("supertest"));
const factories_1 = require("../factories");
const helpers_1 = require("../helpers");
beforeAll(async () => {
    await (0, app_1.init)();
});
beforeEach(async () => {
    await (0, helpers_1.cleanDb)();
});
const server = (0, supertest_1.default)(app_1.default);
describe("GET /report", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/report");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker_1.faker.lorem.word();
        const response = await server.get("/report").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if there is no session for given token", async () => {
        await (0, factories_1.createUser)();
        const token = faker_1.faker.random.alphaNumeric(20);
        const response = await server.get("/report").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with status 400 when no query param is passed", async () => {
            const token = await (0, helpers_1.generateValidToken)();
            const response = await server.get("/report").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with status 400 when given query param is not valid", async () => {
            const token = await (0, helpers_1.generateValidToken)();
            const response = await server.get("/report?offset=NaN").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with empty array when user hasn't made any reports", async () => {
            const token = await (0, helpers_1.generateValidToken)();
            const response = await server.get("/report?offset=0").set("Authorization", `Bearer ${token}`);
            expect(response.body).toEqual([]);
        });
        it("should respond with status 200 and with existing reports history data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = faker_1.faker.random.alphaNumeric(20);
            await (0, factories_1.createSession)(token, user.id);
            const report = await (0, factories_1.createReport)(user.id);
            const response = await server.get("/report?offset=0").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([{
                    date: (report.date).toISOString(),
                    id: report.id,
                }]);
        });
    });
});
describe("GET /report/1", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/report");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker_1.faker.lorem.word();
        const response = await server.get("/report/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if there is no session for given token", async () => {
        await (0, factories_1.createUser)();
        const token = faker_1.faker.random.alphaNumeric(20);
        const response = await server.get("/report/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with status 400 when given params are invalid", async () => {
            const token = await (0, helpers_1.generateValidToken)();
            const response = await server.get("/report/NaN").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with status 404 when no report is found for given report id", async () => {
            const token = await (0, helpers_1.generateValidToken)();
            const response = await server.get("/report/-1").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should respond with status 200 and with given report data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = faker_1.faker.random.alphaNumeric(20);
            await (0, factories_1.createSession)(token, user.id);
            const report = await (0, factories_1.createReport)(user.id);
            const response = await server.get(`/report/${report.id}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual({
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
            });
        });
    });
});
