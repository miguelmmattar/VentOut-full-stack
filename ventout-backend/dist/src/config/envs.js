"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
function loadEnv() {
    const path = process.env.NODE_ENV === "test"
        ? ".env.test"
        : process.env.NODE_ENV === "development"
            ? ".env.development"
            : ".env";
    const currentEnvs = dotenv_1.default.config({ path });
    dotenv_expand_1.default.expand(currentEnvs);
}
exports.loadEnv = loadEnv;
