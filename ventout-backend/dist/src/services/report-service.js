"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../errors");
const emotion_repository_1 = __importDefault(require("../repositories/emotion-repository"));
const report_repository_1 = __importDefault(require("../repositories/report-repository"));
const symptom_repository_1 = __importDefault(require("../repositories/symptom-repository"));
const report_utils_1 = __importDefault(require("../utils/report-utils"));
async function createNewReport(params, userId) {
    const reportId = await report_repository_1.default.createReport(new Date(params.date), params.text, userId);
    if (!reportId) {
        throw (0, errors_1.requestError)(http_status_1.default.INTERNAL_SERVER_ERROR, http_status_1.default["500_MESSAGE"]);
    }
    const newEmotions = await Promise.all(params.emotions.map(async (emotion) => (await emotion_repository_1.default.createEmotion(emotion.value, reportId))));
    const newSymptoms = await Promise.all(params.symptoms.map(async (symptom) => (await symptom_repository_1.default.createSymptom(symptom.value, reportId))));
    if (!newEmotions || !newSymptoms) {
        throw (0, errors_1.requestError)(http_status_1.default.INTERNAL_SERVER_ERROR, http_status_1.default["500_MESSAGE"]);
    }
}
async function loadUserReports(userId, offset) {
    const userReports = await report_repository_1.default.findUserReports(userId, offset);
    if (!userReports) {
        throw errors_1.notFoundError;
    }
    return userReports;
}
async function loadById(reportId, userId) {
    const report = await report_repository_1.default.findById(reportId, userId);
    if (!report) {
        throw errors_1.notFoundError;
    }
    const result = report_utils_1.default.processReportData(report);
    return result;
}
const reportService = {
    createNewReport,
    loadUserReports,
    loadById,
};
exports.default = reportService;
