"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    token: joi_1.default.string().required(),
});
exports.signUpSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(60).required(),
    email: joi_1.default.string().email().required(),
});
