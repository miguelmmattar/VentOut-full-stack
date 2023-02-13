import { prisma } from "../config";
import { DateFilter } from "../protocols";
import { callFilter } from "../utils/date-utils";
import { MySymptoms, SymptomType } from "@prisma/client";

async function findAllPhysical() {
  const physicalSymptoms = await prisma.symptoms.findMany({
    where: {
      type: SymptomType.PHYSICAL,
    },
    include: {
      Spots: true,
    },
  });

  return physicalSymptoms;
}

async function findAllEmotional() {
  const emtionalSymptoms = await prisma.symptoms.findMany({
    where: {
      type: SymptomType.EMOTIONAL,
    },
    include: {
      Spots: true,
    },
  });

  return emtionalSymptoms;
}

async function createSymptom(symptomId: number, reportId: number): Promise<MySymptoms> {
  const newSymptom = await prisma.mySymptoms.create({
    data: {
      symptomId,
      reportId,
      updatedAt: new Date(),
    }
  });

  return newSymptom;
}

async function findFiltered(userId: number, filter: DateFilter) {
  const filteredSymptoms = await prisma.spots.findMany({
    orderBy: [{
      id: "desc",
    }],
    select: {
      color: true,
      name: true,
      Symptoms: {
        select: {
          MySymptoms: {
            where: {
              MyReports: {
                userId,
                date: {
                  gte: new Date(callFilter(filter)),
                }
              }
            }
          }
        },
      }
    }
  });

  return filteredSymptoms;
}

const symptomRepository = {
  findAllPhysical,
  findAllEmotional,
  createSymptom,
  findFiltered,
};

export default symptomRepository;
