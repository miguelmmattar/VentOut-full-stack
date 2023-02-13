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
describe("GET /data", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/data");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker_1.faker.lorem.word();
        const response = await server.get("/data").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if there is no session for given token", async () => {
        await (0, factories_1.createUser)();
        const token = faker_1.faker.random.alphaNumeric(20);
        const response = await server.get("/data").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with status 200 and with existing mood data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = faker_1.faker.random.alphaNumeric(20);
            await (0, factories_1.createSession)(token, user.id);
            const response = await server.get("/data").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
        });
    });
});
describe("GET /data", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/data/filter");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker_1.faker.lorem.word();
        const response = await server.get("/data/filter").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should respond with status 401 if there is no session for given token", async () => {
        await (0, factories_1.createUser)();
        const token = faker_1.faker.random.alphaNumeric(20);
        const response = await server.get("/data/filter").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with status 400 when no queries are given", async () => {
            const token = await (0, helpers_1.generateValidToken)();
            const response = await server.get("/data/filter").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with status 200 and with existing filtered data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = faker_1.faker.random.alphaNumeric(20);
            await (0, factories_1.createSession)(token, user.id);
            await (0, factories_1.createReport)(user.id);
            const date = faker_1.faker.date.past();
            const response = await server.get(`/data/filter?date=${date}&param=week`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
        });
    });
});
