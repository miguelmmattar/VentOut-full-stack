import { InitialEmotionData, InitialSymptomData } from "@/services/data-service";
import { Emotions,  MyReports, MySymptoms, Spots, Symptoms } from "@prisma/client";
import { getWeekDay } from "./date-utils";

function handleSymptomData(symptoms: (Symptoms & {Spots: Spots;})[]): InitialSymptomData[] {
  return symptoms.map(item => ({
    value: item.id,
    label: item.name,
    type: item.type,
    spotId: item.spotId,
    color: item.Spots.color,
  }));
}

function handleEmotionData(emotions: Emotions[]): InitialEmotionData[] {
  return emotions.map(item => ({
    value: item.id,
    label: item.name,
    color: item.color,
  }));
}

function concatData(emotions: FilteredEmotions[], symptoms: FilteredSymptoms[]): ConcatedData {
  const result: ConcatedData = {
    symptoms: [],
    emotions: [],
    week: [],
  };

  emotions.forEach((item) => {
    if (item.MyEmotions.length > 0) {
      result.emotions.push({
        name: item.name,
        color: item.color,
        value: item.MyEmotions.length,
      });
    }
  });

  emotions.forEach((item) => {
    if (item.MyEmotions.length > 0) {
      result.week.push({
        name: item.name,
        color: item.color,
        value: sortEmotionsByDay(item.MyEmotions),
      });
    }
  });

  symptoms.forEach((item) => {
    const mySymptoms = item.Symptoms.filter((subItem) => (subItem.MySymptoms.length > 0));
    result.symptoms.push({
      name: item.name,
      color: item.color,
      value: mySymptoms.length,
    });
  });

  return result;
}

function sortEmotionsByDay(reports: { MyReports: MyReports }[]) {
  const reportDays = [0, 0, 0, 0, 0, 0, 0];
  reports.forEach((report) => {
    const i = getWeekDay(report.MyReports.date);                   
    reportDays[i] ++;
    return reportDays;
  });
    
  return reportDays;
}

export type ConcatedData = {
    symptoms: FilteredData[],
    emotions: FilteredData[],
    week?: FilteredData[],
}

type FilteredData = {
    name: string,
    color: string,
    value: number | number[],
};

export type FilteredEmotions = {
    MyEmotions: {
        MyReports: MyReports;
    }[];
    name: string;
    color: string;
}

export type FilteredSymptoms = {
    Symptoms: {
        MySymptoms: MySymptoms[]        
    }[];
    name: string;
    color?: string;
}

const dataUtils = {
  handleSymptomData,
  handleEmotionData,
  concatData,
};

export default dataUtils;
