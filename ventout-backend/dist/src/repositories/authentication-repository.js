"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function findByEmail(email) {
    const user = {
        where: {
            email,
        },
    };
    return config_1.prisma.user.findUnique(user);
}
async function createUser(data) {
    return config_1.prisma.user.create({
        data,
    });
}
async function createSession(data) {
    return config_1.prisma.session.create({
        data,
    });
}
async function closeSession(userId) {
    let closedSession;
    await config_1.prisma.$transaction(async (tx) => {
        const session = await config_1.prisma.session.findFirst({
            where: {
                userId,
            }
        });
        if (!session) {
            return closedSession;
        }
        closedSession = await config_1.prisma.session.delete({
            where: {
                id: session.id,
            }
        });
    });
    return closedSession;
}
const authenticationRepository = {
    findByEmail,
    createUser,
    createSession,
    closeSession,
};
exports.default = authenticationRepository;
