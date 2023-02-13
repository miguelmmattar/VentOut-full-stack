"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredData = exports.getInitialData = void 0;
const http_status_1 = __importDefault(require("http-status"));
const data_service_1 = __importDefault(require("../services/data-service"));
async function getInitialData(req, res) {
    try {
        const result = await data_service_1.default.loadInitialData();
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getInitialData = getInitialData;
async function getFilteredData(req, res) {
    const { date, param } = req.query;
    const { userId } = res.locals;
    if (!userId || !date || !param) {
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    }
    const filter = {
        date: new Date(date),
        param,
    };
    try {
        const result = await data_service_1.default.loadFilteredData(userId, filter);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        //console.log(error); 
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getFilteredData = getFilteredData;
