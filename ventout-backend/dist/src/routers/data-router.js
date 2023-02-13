"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const dataRouter = (0, express_1.Router)();
exports.dataRouter = dataRouter;
dataRouter
    .all("/*", middlewares_1.authenticateToken)
    .get("", controllers_1.getInitialData)
    .get("/filter", controllers_1.getFilteredData);
