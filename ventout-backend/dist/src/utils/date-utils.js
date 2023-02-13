"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekDay = exports.callFilter = exports.filters = void 0;
const filters = {
    day: "day",
    week: "week",
    month: "month",
    year: "year",
    allTime: "all time",
};
exports.filters = filters;
function filterByDay(date) {
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${year}-${month}-${day}`;
}
function filterByWeek(date) {
    const weekDay = new Date(date).getDay();
    let day = new Date(date).getDate() - weekDay;
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();
    if (day <= 0) {
        day = handleMultiMonthWeek(day, month, year);
        if (month === 1) {
            month = 12;
            year--;
        }
        else {
            month--;
        }
    }
    return `${year}-${month}-${day}`;
}
function filterByMonth(date) {
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${year}-${month}-1`;
}
function filterByYear(date) {
    const year = new Date(date).getFullYear();
    return `${year}-1-1`;
}
function callFilter(filter) {
    let result;
    if (filter.param === filters.day)
        result = filterByDay(filter.date);
    if (filter.param === filters.week)
        result = filterByWeek(filter.date);
    if (filter.param === filters.month)
        result = filterByMonth(filter.date);
    if (filter.param === filters.year)
        result = filterByYear(filter.date);
    if (filter.param === filters.allTime)
        result = (new Date(0)).toString();
    return result;
}
exports.callFilter = callFilter;
function getWeekDay(date) {
    return new Date(date).getDay();
}
exports.getWeekDay = getWeekDay;
function handleMultiMonthWeek(day, month, year) {
    if (month === 3) {
        if (year % 4 === 0)
            return (29 + day);
        return (28 + day);
    }
    if (month === 5 || month === 7 || month === 10 || month === 12)
        return (30 + day);
    return (31 + day);
}
