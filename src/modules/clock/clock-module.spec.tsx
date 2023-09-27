import "@testing-library/jest-dom";
import ClockModule from "@/modules/clock/clock-module";
import { render, screen } from "@testing-library/react";
import { useClockModule } from "@/modules/clock/clock-module.hook";
import React from "react";

jest.mock("./clock-module.hook");
const mockedUseClockModule = useClockModule as jest.MockedFunction<
    typeof useClockModule
>;

describe("ClockModule", () => {
    it("should render time", async () => {
        // Given
        mockedUseClockModule.mockReturnValue({
            parentRef: React.createRef<HTMLDivElement>(),
            textRef: React.createRef<HTMLSpanElement>(),
            hour: "12",
            minute: "00",
        });

        // When
        const { getByText } = render(<ClockModule />);

        // Then
        const hour = getByText(/12/);
        expect(hour).toBeInTheDocument();

        const minute = getByText(/00/);
        expect(minute).toBeInTheDocument();

        const colon = getByText(":");
        expect(colon).toBeInTheDocument();
    });
});

export {};
