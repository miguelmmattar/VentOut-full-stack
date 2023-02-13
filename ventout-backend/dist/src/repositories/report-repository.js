"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function createReport(date, text, userId) {
    const newReport = await config_1.prisma.myReports.create({
        data: {
            userId,
            date,
            text,
            updatedAt: new Date(),
        }
    });
    return newReport?.id;
}
async function findUserReports(userId, skip) {
    const userReports = await config_1.prisma.myReports.findMany({
        skip,
        take: 30,
        orderBy: [
            {
                date: "desc",
            },
        ],
        select: {
            id: true,
            date: true,
        },
        where: {
            userId,
        },
    });
    return userReports;
}
async function findById(reportId, userId) {
    const myReport = await config_1.prisma.myReports.findFirst({
        where: {
            id: reportId,
            userId,
        },
        select: {
            date: true,
            text: true,
            MyEmotions: {
                select: {
                    Emotions: {
                        select: {
                            name: true,
                            color: true,
                        }
                    }
                }
            },
            MySymptoms: {
                select: {
                    Symptoms: {
                        select: {
                            name: true,
                            type: true,
                            Spots: {
                                select: {
                                    color: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return myReport;
}
const reportRepository = {
    createReport,
    findUserReports,
    findById,
};
exports.default = reportRepository;
