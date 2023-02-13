"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const mood_repository_1 = __importDefault(require("../repositories/mood-repository"));
async function findTodaysMood(params) {
    const { userId, filter } = params;
    const moods = await mood_repository_1.default.findFiltered(userId, filter);
    if (!moods[0]) {
        return;
    }
    return moods[0].Moods;
}
async function findUserMoods(userId, offset) {
    const moods = await mood_repository_1.default.findByUserId(userId, offset);
    if (!moods) {
        throw (0, errors_1.notFoundError)();
    }
    const result = moods.map((mood) => ({
        mood: mood.Moods.name,
        color: mood.Moods.color,
        date: mood.createdAt
    }));
    return result;
}
async function upsertMood(params) {
    const { newMood, name } = params;
    await mood_repository_1.default.upsert(newMood, name);
}
const moodService = {
    findTodaysMood,
    upsertMood,
    findUserMoods,
};
exports.default = moodService;
