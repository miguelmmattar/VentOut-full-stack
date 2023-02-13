"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidBodyForMoods = exports.createMood = void 0;
const config_1 = require("@/config");
const initialData_1 = __importDefault(require("../../prisma/prisma-utils/initialData"));
async function createMood(userId) {
    const mood = await config_1.prisma.moods.findFirst({});
    return config_1.prisma.myMoods.create({
        data: {
            userId,
            moodId: mood.id,
            updatedAt: new Date(),
        }, include: {
            Moods: true,
        }
    });
}
exports.createMood = createMood;
function generateValidBodyForMoods() {
    const validBody = {
        name: initialData_1.default.newMoods[0].name,
        newMood: {
            updatedAt: new Date(),
        },
    };
    return validBody;
}
exports.generateValidBodyForMoods = generateValidBodyForMoods;
