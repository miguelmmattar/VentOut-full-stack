import { prisma } from "../config";
import { DateFilter } from "../protocols";
import { callFilter } from "../utils/date-utils";
import { MyEmotions } from "@prisma/client";

async function findAll() {
  const emotions = await prisma.emotions.findMany({});

  return emotions;
}

async function createEmotion(emotionId: number, reportId: number): Promise<MyEmotions> {
  const newEmotion = await prisma.myEmotions.create({
    data: {
      emotionId,
      reportId,
      updatedAt: new Date(),
    }
  });

  return newEmotion;
}

async function findFiltered(userId: number, filter: DateFilter) {
  const filteredEmotions = await prisma.emotions.findMany({
    select: {
      color: true,
      name: true,
      MyEmotions: {
        select: {
          MyReports: true,
        },
        where: {
          MyReports: {
            userId,
            date: {
              gte: new Date(callFilter(filter)),
            }
          },
                    
        }
      }
    }
  });
  
  return filteredEmotions;
}

const emotionRepository = {
  findAll,
  createEmotion,
  findFiltered,
};

export default emotionRepository;
