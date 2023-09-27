import { formatDate } from "@/commons/helpers/datetime/datetime";
import theoretically from "jest-theories";
import { date } from "zod";

describe("formatDate", () => {
    const dateTheories = [
        { date: new Date(2020, 0, 1, 12, 30), format: "mm", expected: "30" },
        { date: new Date(2020, 0, 1, 12, 30), format: "HH", expected: "12" },
        {
            date: new Date(2020, 0, 1, 12, 30),
            format: "HH:mm",
            expected: "12:30",
        },
        { date: new Date(2020, 0, 1, 12, 30), format: "DD", expected: "01" },
        { date: new Date(2020, 0, 1, 12, 30), format: "MM", expected: "01" },
        {
            date: new Date(2020, 0, 1, 12, 30),
            format: "YYYY",
            expected: "2020",
        },
        {
            date: new Date(2020, 0, 1, 12, 30),
            format: "YYYY-MM-DD",
            expected: "2020-01-01",
        },
        {
            date: new Date(2020, 0, 1, 12, 30),
            format: "YYYY-MM-DD HH:mm",
            expected: "2020-01-01 12:30",
        },
        {
            date: new Date(2020, 0, 1, 12, 30),
            format: "YYYY-MM-DD HH:mm:ss",
            expected: "2020-01-01 12:30:00",
        },
    ];

    theoretically(
        "should format date {date} with format: {format}",
        dateTheories,
        (theory) => {
            // Given
            const { date, format, expected } = theory;

            // When
            const formattedDate = formatDate(date, format);

            // Then
            expect(formattedDate).toEqual(expected);
        },
    );
});
