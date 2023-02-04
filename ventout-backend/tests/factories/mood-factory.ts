import { Moods, MyMoods } from "@prisma/client";
import { prisma } from "@/config";
import initialData from "../../prisma/prisma-utils/initialData";

export async function createMood(userId: number): Promise<MyMoods & {Moods: Moods}> {
  const mood = await prisma.moods.findFirst({});
  
  return prisma.myMoods.create({
    data: {
      userId,
      moodId: mood.id,
      updatedAt: new Date(),
    }, include: {
      Moods: true, 
    }
  });
}

export function generateValidBodyForMoods() {
  const validBody = {
    name: initialData.newMoods[0].name,
    newMood: {
      updatedAt: new Date(),
    },
  };
  
  return validBody;
}
