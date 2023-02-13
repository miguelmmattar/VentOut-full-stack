"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidCredentialsError = void 0;
function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "email or password are incorrect",
    };
}
exports.invalidCredentialsError = invalidCredentialsError;
