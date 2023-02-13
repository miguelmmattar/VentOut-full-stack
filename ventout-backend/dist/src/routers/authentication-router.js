"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const express_1 = require("express");
const authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter = authenticationRouter;
authenticationRouter
    .post("/sign-up", (0, middlewares_1.validateBody)(schemas_1.signUpSchema), controllers_1.singUpPost)
    .post("/sign-in", (0, middlewares_1.validateBody)(schemas_1.signInSchema), controllers_1.singInPost)
    .delete("/sign-out/:userId", controllers_1.signOut);
