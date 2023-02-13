"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const app_1 = require("@/app");
const config_1 = require("@/config");
const errors_1 = require("@/errors");
const authentication_service_1 = __importDefault(require("@/services/authentication-service"));
const factories_1 = require("../factories");
const helpers_1 = require("../helpers");
beforeAll(async () => {
    await (0, app_1.init)();
    await (0, helpers_1.cleanDb)();
});
describe("signIn", () => {
    const generateParams = async () => ({
        email: faker_1.faker.internet.email(),
        token: await (0, helpers_1.generateValidToken)(),
    });
    it("should throw InvalidCredentialError if there is no user for given email", async () => {
        const params = await generateParams();
        try {
            await authentication_service_1.default.signIn(params);
            fail("should throw InvalidCredentialError");
        }
        catch (error) {
            expect(error).toEqual((0, errors_1.invalidCredentialsError)());
        }
    });
    describe("when email and password are valid", () => {
        it("should return user data if given email and password are valid", async () => {
            const params = await generateParams();
            const user = await (0, factories_1.createUser)(params);
            const { user: signInUser } = await authentication_service_1.default.signIn(params);
            expect(user).toEqual(expect.objectContaining({
                id: signInUser.id,
                email: signInUser.email,
            }));
        });
        it("should create new session and return given token", async () => {
            const params = await generateParams();
            const user = await (0, factories_1.createUser)(params);
            const { token: createdSessionToken } = await authentication_service_1.default.signIn(params);
            expect(createdSessionToken).toBeDefined();
            const session = await config_1.prisma.session.findFirst({
                where: {
                    token: createdSessionToken,
                    userId: user.id,
                },
            });
            expect(session).toBeDefined();
        });
    });
});
