"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const date_utils_1 = require("../utils/date-utils");
async function findAll() {
    const emotions = await config_1.prisma.emotions.findMany({});
    return emotions;
}
async function createEmotion(emotionId, reportId) {
    const newEmotion = await config_1.prisma.myEmotions.create({
        data: {
            emotionId,
            reportId,
            updatedAt: new Date(),
        }
    });
    return newEmotion;
}
async function findFiltered(userId, filter) {
    const filteredEmotions = await config_1.prisma.emotions.findMany({
        select: {
            color: true,
            name: true,
            MyEmotions: {
                select: {
                    MyReports: true,
                },
                where: {
                    MyReports: {
                        userId,
                        date: {
                            gte: new Date((0, date_utils_1.callFilter)(filter)),
                        }
                    },
                }
            }
        }
    });
    return filteredEmotions;
}
const emotionRepository = {
    findAll,
    createEmotion,
    findFiltered,
};
exports.default = emotionRepository;
