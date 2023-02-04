import { SymptomType } from "@prisma/client";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createReport(userId: number) {
  const emotion = await prisma.emotions.findFirst({});
  const physicalSymptom = await prisma.symptoms.findFirst({
    where: {
      type: SymptomType.PHYSICAL,
    },
  });
  const emotionalSymptom = await prisma.symptoms.findFirst({
    where: {
      type: SymptomType.EMOTIONAL,
    },
  });
  
  const report = await prisma.myReports.create({
    data: {
      userId,
      date: new Date(),
      text: faker.lorem.paragraph(),
      updatedAt: new Date(),
    }
  });

  await prisma.myEmotions.create({
    data: {
      emotionId: emotion.id,
      reportId: report.id,
      updatedAt: new Date(),
    }
  });

  await prisma.mySymptoms.create({
    data: {
      symptomId: physicalSymptom.id,
      reportId: report.id,
      updatedAt: new Date(),
    }
  });

  await prisma.mySymptoms.create({
    data: {
      symptomId: emotionalSymptom.id,
      reportId: report.id,
      updatedAt: new Date(),
    }
  });

  const newReport = await prisma.myReports.findUnique({
    where: {
      id: report.id,
    }, include: {
      MyEmotions: {
        select: {
          Emotions: true,
        }
      },
      MySymptoms: {
        orderBy: [{
          createdAt: "asc",
        }],
        select: {
          Symptoms: {
            select: {
              name: true,
              Spots: true,
            }
          },
        }
      },
    }
  });

  return newReport;
}
