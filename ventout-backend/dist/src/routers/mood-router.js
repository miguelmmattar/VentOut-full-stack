"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moodRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const moodRouter = (0, express_1.Router)();
exports.moodRouter = moodRouter;
moodRouter
    .all("/*", middlewares_1.authenticateToken)
    .get("/today", controllers_1.getTodaysMood)
    .post("", (0, middlewares_1.validateBody)(schemas_1.postMoodSchema), controllers_1.createOrUpdateMood)
    .get("/history", controllers_1.getUserMoods);
