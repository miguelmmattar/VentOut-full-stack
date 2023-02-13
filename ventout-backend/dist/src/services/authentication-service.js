"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const errors_1 = require("../errors");
const authentication_repository_1 = __importDefault(require("../repositories/authentication-repository"));
async function signUp(params) {
    const { email, name } = params;
    await checkNewUserOrFail(email);
    const { id } = await createUser(email, name);
    return {
        id,
        email,
        name,
    };
}
async function signIn(params) {
    const { email, token } = params;
    const user = await getUserOrFail(email);
    await createSession(user.id, token);
    return {
        user,
        token,
    };
}
async function signOut(userId) {
    const closedSession = await authentication_repository_1.default.closeSession(userId);
    if (!closedSession) {
        throw (0, errors_1.notFoundError)();
    }
}
async function getUserOrFail(email) {
    const user = await authentication_repository_1.default.findByEmail(email);
    if (!user)
        throw (0, errors_1.invalidCredentialsError)();
    return user;
}
async function checkNewUserOrFail(email) {
    const user = await authentication_repository_1.default.findByEmail(email);
    if (user)
        throw (0, errors_1.invalidCredentialsError)();
}
async function createUser(email, name) {
    const newUser = await authentication_repository_1.default.createUser({
        name,
        email,
        updatedAt: (0, dayjs_1.default)().toDate(),
    });
    return newUser;
}
async function createSession(userId, token) {
    const newSession = await authentication_repository_1.default.createSession({
        userId,
        token,
    });
    return newSession;
}
const authenticationService = {
    signUp,
    signIn,
    signOut,
};
exports.default = authenticationService;
