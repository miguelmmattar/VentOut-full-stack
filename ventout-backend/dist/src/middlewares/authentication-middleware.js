"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../errors");
const config_1 = require("../config");
async function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader)
        return generateUnauthorizedResponse(res);
    const token = authHeader.split(" ")[1];
    if (!token)
        return generateUnauthorizedResponse(res);
    try {
        const session = await config_1.prisma.session.findFirst({
            where: {
                token,
            },
        });
        if (!session)
            return generateUnauthorizedResponse(res);
        res.locals.userId = session.userId;
        return next();
    }
    catch (err) {
        return generateUnauthorizedResponse(res);
    }
}
exports.authenticateToken = authenticateToken;
function generateUnauthorizedResponse(res) {
    res.status(http_status_1.default.UNAUTHORIZED).send((0, errors_1.unauthorizedError)());
}
