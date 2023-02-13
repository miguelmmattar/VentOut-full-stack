"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const actions_1 = __importDefault(require("./prisma-utils/actions"));
const prisma = new client_1.PrismaClient();
async function main() {
    await actions_1.default.seedMoods();
    await actions_1.default.seedSpots();
    await actions_1.default.seedSymptoms();
    await actions_1.default.seedEmotions();
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
