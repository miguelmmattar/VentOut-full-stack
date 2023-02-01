import { PrismaClient } from "@prisma/client";
import seeds from "./prisma-utils/actions";
const prisma = new PrismaClient();

async function main() {
  await seeds.seedMoods();
  await seeds.seedSpots();
  await seeds.seedSymptoms();
  await seeds.seedEmotions();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
