"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const date_utils_1 = require("../utils/date-utils");
const client_1 = require("@prisma/client");
async function findAllPhysical() {
    const physicalSymptoms = await config_1.prisma.symptoms.findMany({
        where: {
            type: client_1.SymptomType.PHYSICAL,
        },
        include: {
            Spots: true,
        },
    });
    return physicalSymptoms;
}
async function findAllEmotional() {
    const emtionalSymptoms = await config_1.prisma.symptoms.findMany({
        where: {
            type: client_1.SymptomType.EMOTIONAL,
        },
        include: {
            Spots: true,
        },
    });
    return emtionalSymptoms;
}
async function createSymptom(symptomId, reportId) {
    const newSymptom = await config_1.prisma.mySymptoms.create({
        data: {
            symptomId,
            reportId,
            updatedAt: new Date(),
        }
    });
    return newSymptom;
}
async function findFiltered(userId, filter) {
    const filteredSymptoms = await config_1.prisma.spots.findMany({
        orderBy: [{
                id: "desc",
            }],
        select: {
            color: true,
            name: true,
            Symptoms: {
                select: {
                    MySymptoms: {
                        where: {
                            MyReports: {
                                userId,
                                date: {
                                    gte: new Date((0, date_utils_1.callFilter)(filter)),
                                }
                            }
                        }
                    }
                },
            }
        }
    });
    return filteredSymptoms;
}
const symptomRepository = {
    findAllPhysical,
    findAllEmotional,
    createSymptom,
    findFiltered,
};
exports.default = symptomRepository;
