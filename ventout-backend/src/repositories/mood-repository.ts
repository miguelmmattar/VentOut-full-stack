import { prisma } from "@/config";
import { invalidDataError } from "@/errors";
import { DateFilter } from "@/protocols";
import { MoodParams } from "@/services/mood-service";
import { callFilter, filters } from "@/utils/date-utils";
import { MyMoods } from "@prisma/client";
 
async function findByUserId(userId: number, skip: number) {
  const userMoods = await prisma.myMoods.findMany({
    skip,
    take: 30,
    where: {
      userId,
    },
    include: {
      Moods: true,
    }
  });

  return userMoods;
}

async function findFiltered(userId: number, filter: DateFilter) {    
  const filteredMoods = await prisma.myMoods.findMany({
    where: {
      userId,
      createdAt: {
        gte: new Date(callFilter(filter)),
      }
    }, include: {
      Moods: true,
    }
  });
    
  return filteredMoods;
}

async function upsert(newMood: MoodParams, name: string) {
  let result: MyMoods;

  await prisma.$transaction(async (tx) => {
    const { id } = await prisma.moods.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      }
    });

    if(!id) {
      throw invalidDataError();
    }
    
    const todayMood = await prisma.myMoods.findFirst({
      where: {
        userId: newMood.userId,
        createdAt: {
          gte: new Date(callFilter({ date: newMood.updatedAt, param: filters.day })),   
        }
      }
    });

    if(todayMood) {
      result = await prisma.myMoods.update({
        where: {
          id: todayMood.id,
        },
        data: {
          moodId: id,
          updatedAt: new Date(),
        } 
      });
    } else {
      result = await prisma.myMoods.create({
        data: {
          userId: newMood.userId,
          moodId: id,
          updatedAt: new Date(),
        }
      });
    }
  });
    
  return result;
}

const moodRepository = {
  findByUserId,
  findFiltered,
  upsert,
};

export default moodRepository;
