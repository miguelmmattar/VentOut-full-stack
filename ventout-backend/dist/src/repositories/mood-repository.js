"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const errors_1 = require("../errors");
const date_utils_1 = require("../utils/date-utils");
async function findByUserId(userId, skip) {
    const userMoods = await config_1.prisma.myMoods.findMany({
        skip,
        take: 30,
        where: {
            userId,
        },
        include: {
            Moods: true,
        }
    });
    return userMoods;
}
async function findFiltered(userId, filter) {
    const filteredMoods = await config_1.prisma.myMoods.findMany({
        where: {
            userId,
            createdAt: {
                gte: new Date((0, date_utils_1.callFilter)(filter)),
            }
        }, include: {
            Moods: true,
        }
    });
    return filteredMoods;
}
async function upsert(newMood, name) {
    let result;
    await config_1.prisma.$transaction(async (tx) => {
        const { id } = await config_1.prisma.moods.findFirst({
            where: {
                name,
            },
            select: {
                id: true,
            }
        });
        if (!id) {
            throw (0, errors_1.invalidDataError)();
        }
        const todayMood = await config_1.prisma.myMoods.findFirst({
            where: {
                userId: newMood.userId,
                createdAt: {
                    gte: new Date((0, date_utils_1.callFilter)({ date: newMood.updatedAt, param: date_utils_1.filters.day })),
                }
            }
        });
        if (todayMood) {
            result = await config_1.prisma.myMoods.update({
                where: {
                    id: todayMood.id,
                },
                data: {
                    moodId: id,
                    updatedAt: new Date(),
                }
            });
        }
        else {
            result = await config_1.prisma.myMoods.create({
                data: {
                    userId: newMood.userId,
                    moodId: id,
                    updatedAt: new Date(),
                }
            });
        }
    });
    return result;
}
const moodRepository = {
    findByUserId,
    findFiltered,
    upsert,
};
exports.default = moodRepository;
