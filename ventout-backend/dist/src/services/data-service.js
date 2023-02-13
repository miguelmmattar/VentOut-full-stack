"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const emotion_repository_1 = __importDefault(require("../repositories/emotion-repository"));
const symptom_repository_1 = __importDefault(require("../repositories/symptom-repository"));
const data_utils_1 = __importDefault(require("../utils/data-utils"));
async function loadInitialData() {
    try {
        const emotions = await emotion_repository_1.default.findAll();
        const physicalSymptoms = await symptom_repository_1.default.findAllPhysical();
        const emotionalSymptoms = await symptom_repository_1.default.findAllEmotional();
        if (!emotions[0] || !physicalSymptoms[0] || !emotionalSymptoms[0]) {
            throw (0, errors_1.notFoundError)();
        }
        const result = {
            emotions: data_utils_1.default.handleEmotionData(emotions),
            physicalSymptoms: data_utils_1.default.handleSymptomData(physicalSymptoms),
            emotionalSymptoms: data_utils_1.default.handleSymptomData(emotionalSymptoms),
        };
        return result;
    }
    catch (error) {
        throw (0, errors_1.notFoundError)();
    }
}
async function loadFilteredData(userId, filter) {
    const emotions = await emotion_repository_1.default.findFiltered(userId, filter);
    const symptoms = await symptom_repository_1.default.findFiltered(userId, filter);
    const filteredData = data_utils_1.default.concatData(emotions, symptoms);
    return filteredData;
}
const dataService = {
    loadInitialData,
    loadFilteredData,
};
exports.default = dataService;
