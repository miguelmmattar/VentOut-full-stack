import httpStatus from "http-status";

import { invalidDataError, notFoundError, requestError } from "@/errors";
import { incomingEmotion, incomingSymptom } from "@/protocols";
import emotionRepository from "@/repositories/emotion-repository";
import reportRepository from "@/repositories/report-repository";
import symptomRepository from "@/repositories/symptom-repository";
import { Emotions, MyReports, Symptoms } from "@prisma/client";
import reportUtils from "../utils/report-utils";

async function createNewReport(params: ReportParams, userId: number) {
  const reportId = await reportRepository.createReport(new Date(params.date), params.text, userId);

  if(!reportId) {
    throw requestError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus["500_MESSAGE"]);
  }

  const newEmotions = await Promise.all(params.emotions.map(async (emotion) => (
    await emotionRepository.createEmotion(emotion.value, reportId)
  )));

  const newSymptoms = await Promise.all(params.symptoms.map(async (symptom) => (
    await symptomRepository.createSymptom(symptom.value, reportId)
  )));

  if(!newEmotions || !newSymptoms) {
    throw requestError(httpStatus.INTERNAL_SERVER_ERROR, httpStatus["500_MESSAGE"]);
  }
}

async function loadUserReports(userId: number, offset: number): Promise<ReportsList> {
  const userReports = await reportRepository.findUserReports(userId, offset);

  if(!userReports) {
    throw notFoundError;
  }

  return userReports;
}

async function loadById(reportId: number, userId: number): Promise<Report> {
  const report = await reportRepository.findById(reportId, userId);

  if(!report) {
    throw notFoundError;
  }

  const result = reportUtils.processReportData(report);

  return result;
}

export type ReportsList = Pick<MyReports, "id" | "date">[];

export type ReportParams = {
    date: Date | string,
    emotions: incomingEmotion[],
    symptoms: incomingSymptom[],
    text: string,
};

export type Report = {
    text: string,
    date: Date | string,
    emotions: ReportTag[],
    physicalSymptoms: ReportTag[],
    emotionalSymptoms: ReportTag[],
}

type ReportTag = {
    name: string,
    color: string
}

const reportService = {
  createNewReport,
  loadUserReports,
  loadById,
};

export default reportService;
