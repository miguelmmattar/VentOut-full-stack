import { notFoundError } from "@/errors";
import { DateFilter } from "@/protocols";
import emotionRepository from "@/repositories/emotion-repository";
import symptomRepository from "@/repositories/symptom-repository";
import { SymptomType } from "@prisma/client";
import dataUtils from "../utils/data-utils";

async function loadInitialData(): Promise<InitialData> {
  try {
    const emotions = await emotionRepository.findAll();
    const physicalSymptoms = await symptomRepository.findAllPhysical();
    const emotionalSymptoms = await symptomRepository.findAllEmotional();

    if( !emotions[0] || !physicalSymptoms[0] || !emotionalSymptoms[0]) {
      throw notFoundError();
    }

    const result = {
      emotions: dataUtils.handleEmotionData(emotions),
      physicalSymptoms: dataUtils.handleSymptomData(physicalSymptoms),
      emotionalSymptoms: dataUtils.handleSymptomData(emotionalSymptoms),
    };

    return result;
  } catch (error) {
    throw notFoundError();
  }    
}

async function loadFilteredData(userId: number, filter: DateFilter) {
  const emotions = await emotionRepository.findFiltered(userId, filter);
  const symptoms = await symptomRepository.findFiltered(userId, filter);
  
  const filteredData = dataUtils.concatData(emotions, symptoms);

  return filteredData;
}

export type InitialData = {
    emotions: InitialEmotionData[],
    physicalSymptoms: InitialSymptomData[],
    emotionalSymptoms: InitialSymptomData[],
};

export type InitialSymptomData = {
    value: number,
    label: string,
    type: SymptomType,
    spotId: number,
    color: string,
};

export type InitialEmotionData = {
    value: number,
    label: string,
    color: string,
};

const dataService = {
  loadInitialData,
  loadFilteredData,
};

export default dataService;
