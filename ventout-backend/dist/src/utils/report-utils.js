"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
function processReportData(reportData) {
    const physicalSymptoms = reportData.MySymptoms.filter((symptom) => symptom.Symptoms.type === client_1.SymptomType.PHYSICAL);
    const emotionalSymptoms = reportData.MySymptoms.filter((symptom) => symptom.Symptoms.type === client_1.SymptomType.EMOTIONAL);
    const result = {
        text: reportData.text,
        date: reportData.date,
        emotions: reportData.MyEmotions.map((emotion) => ({
            name: emotion.Emotions.name,
            color: emotion.Emotions.color,
        })),
        physicalSymptoms: physicalSymptoms.map((symptom) => ({
            name: symptom.Symptoms.name,
            color: symptom.Symptoms.Spots.color,
        })),
        emotionalSymptoms: emotionalSymptoms.map((symptom) => ({
            name: symptom.Symptoms.name,
            color: symptom.Symptoms.Spots.color,
        })),
    };
    return result;
}
const reportUtils = {
    processReportData,
};
exports.default = reportUtils;
