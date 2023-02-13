"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const reportRouter = (0, express_1.Router)();
exports.reportRouter = reportRouter;
reportRouter
    .all("/*", middlewares_1.authenticateToken)
    .post("", (0, middlewares_1.validateBody)(schemas_1.postReportSchema), controllers_1.postReport)
    .get("", controllers_1.getUserReports)
    .get("/:reportId", controllers_1.getReportById);
