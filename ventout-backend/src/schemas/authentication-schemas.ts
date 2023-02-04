import Joi from "joi";

import { LoginParams, RegisterParams } from "@/protocols";

export const signInSchema = Joi.object<LoginParams>({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
});

export const signUpSchema = Joi.object<RegisterParams>({
  name: Joi.string().min(3).max(60).required(),
  email: Joi.string().email().required(),
});
