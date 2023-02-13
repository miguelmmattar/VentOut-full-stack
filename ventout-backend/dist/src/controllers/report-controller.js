"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportById = exports.getUserReports = exports.postReport = void 0;
const report_service_1 = __importDefault(require("../services/report-service"));
const http_status_1 = __importDefault(require("http-status"));
async function postReport(req, res) {
    const { date, emotions, symptoms, text } = req.body;
    const { userId } = res.locals;
    if (!date || !text || !userId || !symptoms || !emotions || !symptoms[0] || !emotions[0]) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        await report_service_1.default.createNewReport({ date, emotions, symptoms, text }, userId);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
    }
}
exports.postReport = postReport;
async function getUserReports(req, res) {
    const offset = Number(req.query.offset);
    const { userId } = res.locals;
    if (!userId || (!offset && offset !== 0) || isNaN(offset)) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        const result = await report_service_1.default.loadUserReports(userId, offset);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getUserReports = getUserReports;
async function getReportById(req, res) {
    const reportId = Number(req.params.reportId);
    const { userId } = res.locals;
    if (!userId || !reportId || isNaN(reportId)) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        const result = await report_service_1.default.loadById(reportId, userId);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getReportById = getReportById;
