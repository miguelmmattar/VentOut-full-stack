"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const faker_1 = require("@faker-js/faker");
const config_1 = require("@/config");
async function createUser(params = {}) {
    const name = params.name || faker_1.faker.name.fullName();
    return config_1.prisma.user.create({
        data: {
            email: params.email || faker_1.faker.internet.email(),
            name,
        },
    });
}
exports.createUser = createUser;
