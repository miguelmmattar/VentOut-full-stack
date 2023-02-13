"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReportSchema = exports.postMoodSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.postMoodSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    newMood: joi_1.default.object({
        updatedAt: joi_1.default.date().required(),
    }),
});
exports.postReportSchema = joi_1.default.object({
    date: joi_1.default.date().required() || joi_1.default.string().min(1).required(),
    text: joi_1.default.string().min(1).required(),
    emotions: joi_1.default.array().items(joi_1.default.object({
        value: joi_1.default.number().min(1).required(),
        label: joi_1.default.string().min(1).required(),
        color: joi_1.default.string().min(7).required(),
    })),
    symptoms: joi_1.default.array().items(joi_1.default.object({
        value: joi_1.default.number().min(1).required(),
        label: joi_1.default.string().min(1).required(),
        color: joi_1.default.string().min(7).required(),
        spotId: joi_1.default.number().min(1).required(),
        type: joi_1.default.string().min(8).max(9).required(),
    })),
});
