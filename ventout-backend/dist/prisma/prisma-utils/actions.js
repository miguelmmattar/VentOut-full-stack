"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const initialData_1 = __importDefault(require("./initialData"));
const prisma = new client_1.PrismaClient();
async function seedMoods() {
    const mood = await prisma.moods.findFirst();
    if (mood)
        return;
    const moods = await Promise.all(initialData_1.default.newMoods.map(async (item) => (await prisma.moods.create({
        data: {
            name: item.name,
            color: item.color,
        },
    }))));
    console.log({ moods });
}
async function seedSpots() {
    const spot = await prisma.spots.findFirst();
    if (spot)
        return;
    const spots = await Promise.all(initialData_1.default.newSpots.map(async (item) => (await prisma.spots.create({
        data: {
            id: item.id,
            name: item.name,
            color: item.color,
        },
    }))));
    console.log({ spots });
}
async function seedEmotions() {
    const emotion = await prisma.emotions.findFirst();
    if (emotion)
        return;
    const emotions = await Promise.all(initialData_1.default.newEmotions.map(async (item) => (await prisma.emotions.create({
        data: {
            name: item.name,
            color: item.color,
        },
    }))));
    console.log({ emotions });
}
async function seedSymptoms() {
    const symptom = await prisma.symptoms.findFirst();
    if (symptom)
        return;
    const physicalSymptoms = await Promise.all(initialData_1.default.newPhysicalSymptoms.map(async (item) => (await prisma.symptoms.create({
        data: {
            name: item.name,
            type: client_1.SymptomType.PHYSICAL,
            spotId: item.spotId,
        },
    }))));
    const emotionalSymptoms = await Promise.all(initialData_1.default.newEmotionalSymptoms.map(async (item) => (await prisma.symptoms.create({
        data: {
            name: item.name,
            type: client_1.SymptomType.EMOTIONAL,
            spotId: item.spotId,
        },
    }))));
    const symptoms = physicalSymptoms.concat(emotionalSymptoms);
    console.log({ symptoms });
}
exports.default = {
    seedMoods,
    seedSpots,
    seedEmotions,
    seedSymptoms,
};
