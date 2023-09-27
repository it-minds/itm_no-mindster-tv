import { act } from "react-dom/test-utils";
import { render, renderHook, waitFor } from "@testing-library/react";
import useResizeObserver from "@/commons/hooks/resize-observer/use-resize-observer";
import React from "react";

let container: HTMLDivElement;

global.ResizeObserver = require("resize-observer-polyfill");

const ResizeObserverWrapperComponent = ({ cb }: { cb: () => {} }) => {
    const containerRef = useResizeObserver<HTMLDivElement>(cb);

    return <div ref={containerRef}>test</div>;
};

describe("useResizeObserver", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // setupResizeContainer();
    });

    it("should invoke callback when element is resized", () => {
        // Given
        const callback = jest.fn();

        // When
        const { getByText } = render(
            <ResizeObserverWrapperComponent cb={callback} />,
        );

        const textElement = getByText("test");

        act(() => {
            const resizeEvent = new Event("resize");
            textElement.dispatchEvent(resizeEvent);
        });

        waitFor(() => {
            expect(callback).toHaveBeenCalled();
        });
    });

    it("should not invoke callback when element is not resized", () => {
        // Given
        const callback = jest.fn();

        // When
        const { getByText } = render(
            <ResizeObserverWrapperComponent cb={callback} />,
        );

        const textElement = getByText("test");

        // Then
        waitFor(() => {
            expect(callback).not.toHaveBeenCalled();
        });
    });
});

function setupResizeContainer() {
    container = document.createElement("div");
    jest.spyOn(React, "useRef").mockReturnValue({ current: container });
}
