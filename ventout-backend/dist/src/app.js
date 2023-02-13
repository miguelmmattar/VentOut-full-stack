"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
(0, config_1.loadEnv)();
const middlewares_1 = require("./middlewares");
const routers_1 = require("./routers");
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .get("/health", (_req, res) => res.send("OK!"))
    .use(middlewares_1.handleApplicationErrors)
    .use("/auth", routers_1.authenticationRouter)
    .use("/moods", routers_1.moodRouter)
    .use("/data", routers_1.dataRouter)
    .use("/report", routers_1.reportRouter);
function init() {
    (0, config_1.connectDb)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, config_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
