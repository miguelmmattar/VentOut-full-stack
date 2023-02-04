import { Emotions, Moods, Symptoms, SymptomType } from "@prisma/client";

export type ApplicationError = {
    name: string;
    message: string;
  };

export type RequestError = {
status: number,
data: object | null,
statusText: string,
name: string,
message: string,
};

export type LoginParams = {
  email: string,
  token: string,
}

export type RegisterParams = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
};

export type LogoutParams = {
  userId: number,
};

export type DateFilter = {
  date: Date | string,
  param: string,
}

export type NewMood = Omit<Moods, "id">

export type NewEmotion = Omit<Emotions, "id">

export type NewSymptom = Omit<Symptoms, "id" | "type">

export type incomingEmotion = {
  value: number,
  label: string,
  color: string,
};

export type incomingSymptom = {
  value: number,
  label: string,
  color: string,
  spotId: number,
  type: SymptomType,
};
