import "@testing-library/jest-dom";
import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Frame from "@/commons/components/frame/frame";

describe("Frame", () => {
    it("should render children", () => {
        render(
            <Frame>
                <div>Test</div>
            </Frame>,
        );

        const element = screen.getByText("Test");

        expect(element).toBeInTheDocument();
    });
});

export {};
