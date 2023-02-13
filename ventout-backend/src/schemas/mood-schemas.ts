import Joi from "joi";

import { MoodParams, UpsertMoodParams } from "../services/mood-service";
import { ReportParams } from "../services/report-service";
import { incomingEmotion, incomingSymptom } from "../protocols";

export const postMoodSchema = Joi.object<UpsertMoodParams>({
  name: Joi.string().min(1).required(),
  newMood: Joi.object<MoodParams>({
    updatedAt: Joi.date().required(),
  }),
});

export const postReportSchema = Joi.object<ReportParams>({
  date: Joi.date().required() || Joi.string().min(1).required(),
  text: Joi.string().min(1).required(),
  emotions: Joi.array().items(Joi.object<incomingEmotion>({
    value: Joi.number().min(1).required(),
    label: Joi.string().min(1).required(),
    color: Joi.string().min(7).required(),
  })),
  symptoms: Joi.array().items(Joi.object<incomingSymptom>({
    value: Joi.number().min(1).required(),
    label: Joi.string().min(1).required(),
    color: Joi.string().min(7).required(),
    spotId: Joi.number().min(1).required(),
    type: Joi.string().min(8).max(9).required(),
  })),
});
