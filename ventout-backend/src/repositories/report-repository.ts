import { prisma } from "@/config";
import { DateFilter } from "@/protocols";

import { ReportParams, ReportsList } from "@/services/report-service";
import { callFilter } from "@/utils/date-utils";
import { MyEmotions, MyReports, MySymptoms } from "@prisma/client";

async function createReport(date: Date, text: string, userId: number): Promise<number> {
  const newReport = await prisma.myReports.create({
    data: {
      userId,
      date,
      text,
      updatedAt: new Date(),
    }
  });

  return newReport?.id;
}

async function findUserReports(userId: number, skip: number): Promise<ReportsList> {
  const userReports = await prisma.myReports.findMany({
    skip,
    take: 40,
    orderBy: [
      {
        date: "desc",
      },
    ],
    select: {
      id: true,
      date: true,
    },
    where: {
      userId,
    }, 
  });

  return userReports;
}

async function findById(reportId: number, userId: number) {
  const myReport = await prisma.myReports.findFirst({
    where: {
      id: reportId,
      userId,
    },
    select: {
      date: true,
      text: true,
      MyEmotions: {
        select: {
          Emotions: {
            select: {
              name: true,
              color: true,
            }
          }
        }
      },
      MySymptoms: {
        select: {
          Symptoms: {
            select: {
              name: true,
              type: true,
              Spots: {
                select: {
                  color: true,
                }
              }
            }
          }
        }
      }
    }
  });

  return myReport;
}

const reportRepository = {
  createReport,
  findUserReports,
  findById,
};

export default reportRepository;
