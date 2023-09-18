import "@testing-library/jest-dom";
import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Framed from "@/commons/framed/framed";
import theoretically from "jest-theories";
import Frame from "@/commons/frame/frame";

describe("Framed", () => {
    it("should render children", () => {
        render(
            <Framed width={1} height={1} col={1} row={1}>
                <div>Test</div>
            </Framed>,
        );

        const element = screen.getByText("Test");

        expect(element).toBeInTheDocument();
    });

    const positionTheories = [
        { width: 1, height: 1, col: 1, row: 1 },
        { width: 1, height: 1, col: 2, row: 2 },
        { width: 1, height: 1, col: 3, row: 3 },
        { width: 2, height: 2, col: 1, row: 1 },
        { width: 12, height: 6, col: 1, row: 1 },
    ];

    theoretically(
        `should render module with (col: {col}, row: {row}, width: {width} and height: {height} correctly`,
        positionTheories,
        (theory) => {
            render(
                <Frame>
                    <Framed {...theory}>Framed content</Framed>
                </Frame>,
            );

            const element = screen.getByText("Framed content");

            const computedStyle = window.getComputedStyle(element);

            const gridColumnStart =
                computedStyle.getPropertyValue("grid-column-start");
            const gridColumnEnd =
                computedStyle.getPropertyValue("grid-column-end");
            const gridRowStart =
                computedStyle.getPropertyValue("grid-row-start");
            const gridRowEnd = computedStyle.getPropertyValue("grid-row-end");

            expect(gridColumnStart).toBe(`${theory.col}`);
            expect(gridColumnEnd).toBe(`${theory.col + theory.width}`);
            expect(gridRowStart).toBe(`${theory.row}`);
            expect(gridRowEnd).toBe(`${theory.row + theory.height}`);
        },
    );
});

export {};
