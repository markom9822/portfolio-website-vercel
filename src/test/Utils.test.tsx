import { describe, expect, test } from "vitest"
import { getDaysBetweenDates, getDurationInYearsMonths } from "../utils/helper";


describe("Duration In Years & Months Function", () => {

    test("GivenSameDates_ThenDurationInMonthsAndYearsIsZero", () => {

        const startDate = new Date(2025, 0, 1);
        const endDate = new Date(2025, 0, 1);

        const durationResult = getDurationInYearsMonths(startDate, endDate);

        expect(durationResult.years).toEqual(0);
        expect(durationResult.months).toEqual(0);
    })

    test("GivenDatesAMonthApart_ThenDurationIsOneMonth", () => {

        const startDate = new Date(2025, 0, 1);
        const endDate = new Date(2025, 1, 1);

        const durationResult = getDurationInYearsMonths(startDate, endDate);

        expect(durationResult.years).toEqual(0);
        expect(durationResult.months).toEqual(1);
    })

    test("GivenDatesAFewDaysApart_ThenDurationIsRoundedUpToOneMonth", () => {

        const startDate = new Date(2025, 0, 1);
        const endDate = new Date(2025, 0, 15);

        const durationResult = getDurationInYearsMonths(startDate, endDate);

        expect(durationResult.years).toEqual(0);
        expect(durationResult.months).toEqual(1);
    })

    test("GivenDatesOverAYearApart_ThenDurationIsCorrect", () => {

        const startDate = new Date(2024, 4, 1);
        const endDate = new Date(2025, 6, 30);

        const durationResult = getDurationInYearsMonths(startDate, endDate);

        expect(durationResult.years).toEqual(1);
        expect(durationResult.months).toEqual(3);
    })
    
})


describe("Days Apart Function", () => {

    test("GivenDatesZeroDaysApart_ThenDaysBetweenIsZero", () => {

        const startDate = new Date(2025, 0, 1);
        const endDate = new Date(2025, 0, 1);

        const daysBetweenResult = getDaysBetweenDates(startDate, endDate);

        expect(daysBetweenResult).toEqual(0);
    })

    test("GivenDatesOneDayApart_ThenDaysBetweenIsOne", () => {

        const startDate = new Date(2025, 0, 1);
        const endDate = new Date(2025, 0, 2);

        const daysBetweenResult = getDaysBetweenDates(startDate, endDate);

        expect(daysBetweenResult).toEqual(1);
    })

    test("GivenReverseDatesOneDayApart_ThenDaysBetweenIsNegativeOne", () => {

        const startDate = new Date(2025, 0, 2);
        const endDate = new Date(2025, 0, 1);

        const daysBetweenResult = getDaysBetweenDates(startDate, endDate);

        expect(daysBetweenResult).toEqual(-1);
    })

    test("GivenDatesOneYearApart_ThenDaysBetweenIs365", () => {

        const startDate = new Date(2024, 0, 1);
        const endDate = new Date(2025, 0, 1);

        const daysBetweenResult = getDaysBetweenDates(startDate, endDate);

        expect(daysBetweenResult).toEqual(366); // 2024 is a leap year
    })
})