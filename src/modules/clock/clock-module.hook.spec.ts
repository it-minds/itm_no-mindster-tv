import { act, renderHook } from "@testing-library/react";
import theoretically from "jest-theories";
import { useClockModule } from "@/modules/clock/clock-module.hook";
describe("useClockModule", () => {
    it("should advance time every second", async () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2021, 0, 1));

        const { result } = renderHook(useClockModule);

        expect(`${result.current.hour}:${result.current.minute}`).toBe("00:00");

        act(() => {
            jest.advanceTimersByTime(60000);
        });
        expect(`${result.current.hour}:${result.current.minute}`).toBe("00:01");

        act(() => {
            jest.advanceTimersByTime(60000);
        });
        expect(`${result.current.hour}:${result.current.minute}`).toBe("00:02");

        jest.useRealTimers();
    });

    const timeTheories = [
        { time: new Date(2021, 0, 1), expected: "00:00" },
        { time: new Date(2021, 0, 1, 0, 1), expected: "00:01" },
        { time: new Date(2021, 0, 1, 0, 2), expected: "00:02" },
        { time: new Date(2021, 0, 1, 0, 59), expected: "00:59" },
        { time: new Date(2021, 0, 1, 1, 0), expected: "01:00" },
        { time: new Date(2021, 0, 1, 2, 0), expected: "02:00" },
        { time: new Date(2021, 0, 1, 3, 0), expected: "03:00" },
        { time: new Date(2021, 0, 1, 4, 0), expected: "04:00" },
        { time: new Date(2021, 0, 1, 5, 0), expected: "05:00" },
        { time: new Date(2021, 0, 1, 6, 0), expected: "06:00" },
        { time: new Date(2021, 0, 1, 7, 0), expected: "07:00" },
        { time: new Date(2021, 0, 1, 8, 0), expected: "08:00" },
        { time: new Date(2021, 0, 1, 9, 0), expected: "09:00" },
        { time: new Date(2021, 0, 1, 10, 0), expected: "10:00" },
        { time: new Date(2021, 0, 1, 11, 0), expected: "11:00" },
        { time: new Date(2021, 0, 1, 12, 0), expected: "12:00" },
        { time: new Date(2021, 0, 1, 13, 0), expected: "13:00" },
        { time: new Date(2021, 0, 1, 14, 0), expected: "14:00" },
        { time: new Date(2021, 0, 1, 15, 0), expected: "15:00" },
        { time: new Date(2021, 0, 1, 16, 0), expected: "16:00" },
        { time: new Date(2021, 0, 1, 17, 0), expected: "17:00" },
        { time: new Date(2021, 0, 1, 18, 0), expected: "18:00" },
        { time: new Date(2021, 0, 1, 19, 0), expected: "19:00" },
        { time: new Date(2021, 0, 1, 20, 0), expected: "20:00" },
        { time: new Date(2021, 0, 1, 21, 0), expected: "21:00" },
        { time: new Date(2021, 0, 1, 22, 0), expected: "22:00" },
        { time: new Date(2021, 0, 1, 23, 0), expected: "23:00" },
    ];

    theoretically(
        "should show correct time for {expected}",
        timeTheories,
        (theory) => {
            jest.useFakeTimers();
            jest.setSystemTime(theory.time);

            const { result } = renderHook(useClockModule);

            const timeStr = result.current.hour + ":" + result.current.minute;
            expect(timeStr).toBe(theory.expected);

            jest.useRealTimers();
        },
    );
});

export {};
