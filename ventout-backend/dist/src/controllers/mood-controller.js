"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateMood = exports.getUserMoods = exports.getTodaysMood = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mood_service_1 = __importDefault(require("../services/mood-service"));
async function getTodaysMood(req, res) {
    const { userId } = res.locals;
    const { filterDate, filterParam } = req.query;
    if (!userId || !filterDate || !filterParam) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    const filter = {
        date: new Date(filterDate),
        param: filterParam,
    };
    try {
        const result = await mood_service_1.default.findTodaysMood({ userId, filter });
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
}
exports.getTodaysMood = getTodaysMood;
async function getUserMoods(req, res) {
    const { userId } = res.locals;
    const offset = Number(req.query.offset);
    if (!userId || (!offset && offset !== 0) || isNaN(offset)) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        const result = await mood_service_1.default.findUserMoods(userId, offset);
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getUserMoods = getUserMoods;
async function createOrUpdateMood(req, res) {
    const { newMood, name } = req.body;
    const { userId } = res.locals;
    if (!newMood || !name || !userId) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    newMood.updatedAt = new Date(newMood.updatedAt);
    newMood.userId = userId;
    try {
        await mood_service_1.default.upsertMood({ newMood, name });
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
}
exports.createOrUpdateMood = createOrUpdateMood;
