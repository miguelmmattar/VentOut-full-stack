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
    await (0, helpers_1.cleanDb)();
});
const server = (0, supertest_1.default)(app_1.default);
describe("POST /auth/sign-in", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/auth/sign-in");
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    it("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker_1.faker.lorem.word()]: faker_1.faker.lorem.word() };
        const response = await server.post("/auth/sign-in").send(invalidBody);
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    describe("when body is valid", () => {
        const generateValidSessionParams = async (email) => ({
            email: email || faker_1.faker.internet.email(),
            token: await (0, helpers_1.generateValidToken)(),
        });
        const generateValidUserParams = async () => ({
            email: faker_1.faker.internet.email(),
            name: faker_1.faker.name.fullName(),
        });
        it("should respond with status 401 if there is no user for given email", async () => {
            const body = await generateValidSessionParams();
            const response = await server.post("/auth/sign-in").send(body);
            expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
        });
        describe("when credentials are valid", () => {
            it("should respond with status 200", async () => {
                const userBody = await generateValidUserParams();
                const user = await (0, factories_1.createUser)(userBody);
                const sessionBody = await generateValidSessionParams(user.email);
                const response = await server.post("/auth/sign-in").send(sessionBody);
                expect(response.status).toBe(http_status_1.default.OK);
            });
            it("should respond with user data and valid token", async () => {
                const userBody = await generateValidUserParams();
                const user = await (0, factories_1.createUser)(userBody);
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
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    it("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker_1.faker.lorem.word()]: faker_1.faker.lorem.word() };
        const response = await server.post("/auth/sign-up").send(invalidBody);
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    describe("when body is valid", () => {
        const generateValidUserParams = async () => ({
            email: faker_1.faker.internet.email(),
            name: faker_1.faker.name.fullName(),
        });
        it("should respond with status 200", async () => {
            const userBody = await generateValidUserParams();
            const response = await server.post("/auth/sign-up").send(userBody);
            expect(response.status).toBe(http_status_1.default.OK);
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
        expect(response.status).toBe(http_status_1.default.NOT_FOUND);
    });
    it("should respond with status 400 when user id is not valid", async () => {
        const invalidBody = { [faker_1.faker.lorem.word()]: faker_1.faker.lorem.word() };
        const response = await server.delete("/auth/sign-out/NaN").send(invalidBody);
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    describe("when user id is valid", () => {
        const generateValidUserParams = async () => ({
            email: faker_1.faker.internet.email(),
            name: faker_1.faker.name.fullName(),
        });
        const generateValidSessionParams = async (email) => ({
            email: email || faker_1.faker.internet.email(),
            token: await (0, helpers_1.generateValidToken)(),
        });
        it("should respond with status 404 when there is no user for given id", async () => {
            const userBody = await generateValidUserParams();
            const user = await (0, factories_1.createUser)(userBody);
            const invalidUserId = user.id + 1;
            const response = await server.delete(`/auth/sign-out/${invalidUserId}`);
            expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should respond with status 200", async () => {
            const userBody = await generateValidUserParams();
            const user = await (0, factories_1.createUser)(userBody);
            const sessionBody = await generateValidSessionParams(user.email);
            await (0, factories_1.createSession)(sessionBody.token, user.id);
            const response = await server.delete(`/auth/sign-out/${user.id}`);
            expect(response.status).toBe(http_status_1.default.OK);
        });
    });
});
