"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.singUpPost = exports.singInPost = void 0;
const authentication_service_1 = __importDefault(require("../services/authentication-service"));
const http_status_1 = __importDefault(require("http-status"));
async function singInPost(req, res) {
    const { email, token } = req.body;
    if (!email || !token) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        const result = await authentication_service_1.default.signIn({ email, token });
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.status(http_status_1.default.UNAUTHORIZED).send({});
    }
}
exports.singInPost = singInPost;
async function singUpPost(req, res) {
    const { name, email } = req.body;
    if (!email || !name) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        const result = await authentication_service_1.default.signUp({ name, email });
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
}
exports.singUpPost = singUpPost;
async function signOut(req, res) {
    const userId = Number(req.params.userId);
    if (!userId || isNaN(userId)) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    try {
        await authentication_service_1.default.signOut(userId);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.signOut = signOut;
