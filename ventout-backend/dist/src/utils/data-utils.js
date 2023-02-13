"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = require("./date-utils");
function handleSymptomData(symptoms) {
    return symptoms.map(item => ({
        value: item.id,
        label: item.name,
        type: item.type,
        spotId: item.spotId,
        color: item.Spots.color,
    }));
}
function handleEmotionData(emotions) {
    return emotions.map(item => ({
        value: item.id,
        label: item.name,
        color: item.color,
    }));
}
function concatData(emotions, symptoms) {
    const result = {
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
function sortEmotionsByDay(reports) {
    const reportDays = [0, 0, 0, 0, 0, 0, 0];
    reports.forEach((report) => {
        const i = (0, date_utils_1.getWeekDay)(report.MyReports.date);
        reportDays[i]++;
        return reportDays;
    });
    return reportDays;
}
const dataUtils = {
    handleSymptomData,
    handleEmotionData,
    concatData,
};
exports.default = dataUtils;
