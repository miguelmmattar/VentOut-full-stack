"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReport = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("@/config");
const faker_1 = require("@faker-js/faker");
async function createReport(userId) {
    const emotion = await config_1.prisma.emotions.findFirst({});
    const physicalSymptom = await config_1.prisma.symptoms.findFirst({
        where: {
            type: client_1.SymptomType.PHYSICAL,
        },
    });
    const emotionalSymptom = await config_1.prisma.symptoms.findFirst({
        where: {
            type: client_1.SymptomType.EMOTIONAL,
        },
    });
    const report = await config_1.prisma.myReports.create({
        data: {
            userId,
            date: new Date(),
            text: faker_1.faker.lorem.paragraph(),
            updatedAt: new Date(),
        }
    });
    await config_1.prisma.myEmotions.create({
        data: {
            emotionId: emotion.id,
            reportId: report.id,
            updatedAt: new Date(),
        }
    });
    await config_1.prisma.mySymptoms.create({
        data: {
            symptomId: physicalSymptom.id,
            reportId: report.id,
            updatedAt: new Date(),
        }
    });
    await config_1.prisma.mySymptoms.create({
        data: {
            symptomId: emotionalSymptom.id,
            reportId: report.id,
            updatedAt: new Date(),
        }
    });
    const newReport = await config_1.prisma.myReports.findUnique({
        where: {
            id: report.id,
        }, include: {
            MyEmotions: {
                select: {
                    Emotions: true,
                }
            },
            MySymptoms: {
                orderBy: [{
                        createdAt: "asc",
                    }],
                select: {
                    Symptoms: {
                        select: {
                            name: true,
                            Spots: true,
                        }
                    },
                }
            },
        }
    });
    return newReport;
}
exports.createReport = createReport;
