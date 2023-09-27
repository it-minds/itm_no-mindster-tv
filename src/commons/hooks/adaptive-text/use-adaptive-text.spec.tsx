import useAdaptiveText from "@/commons/hooks/adaptive-text/use-adaptive-text";
import { act, render, renderHook } from "@testing-library/react";
import { useResizeObserver } from "@/commons/hooks/resize-observer/use-resize-observer";
import React from "react";
import { beforeEach } from "@jest/globals";

jest.mock("../resize-observer/use-resize-observer");
const mockedUseResizeObserver = useResizeObserver as jest.MockedFunction<
    typeof useResizeObserver
>;

let parentElement: HTMLDivElement;
let triggerResize: () => void;

describe("useAdaptiveText", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupTextElement();
        parentElement = setupParentElement();
    });

    it("should increase fontsize when text has vertical and horizontal space", () => {
        // Given
        setupTooSmallTextOnce(parentElement);
        setupTooSmallTextOnce(parentElement);
        setupTooSmallTextOnce(parentElement);

        setupTextOverflowBoth(parentElement);

        // When
        const { result } = renderHook(() =>
            useAdaptiveText({
                minFontSize: 12,
                maxFontSize: 20,
                incrementStep: 1,
            }),
        );

        // Then
        const { textRef } = result.current;

        const currentFontSize = getFontSize(textRef);
        expect(currentFontSize).toBe("13px");
    });

    it("should increase fontsize when text has vertical space", () => {
        // Given
        setupTooSmallTextOnce(parentElement);
        setupTooSmallTextOnce(parentElement);
        setupTooSmallTextOnce(parentElement);

        setupTextOverflowVertical(parentElement);

        // When
        const { result } = renderHook(() =>
            useAdaptiveText({
                minFontSize: 12,
                maxFontSize: 20,
                incrementStep: 1,
            }),
        );

        // Then
        const { textRef } = result.current;

        const currentFontSize = getFontSize(textRef);
        expect(currentFontSize).toBe("13px");
    });

    it("should increase fontsize when text has horizontal space", () => {
        // Given
        setupTooSmallTextOnce(parentElement);
        setupTooSmallTextOnce(parentElement);

        setupTextOverflowHorizontal(parentElement);

        // When
        const { result } = renderHook(() =>
            useAdaptiveText({
                minFontSize: 12,
                maxFontSize: 20,
                incrementStep: 1,
            }),
        );

        // Then
        const { textRef } = result.current;
    });

    it("should increase fontsize until maxFontSize is reached when not overflowing", () => {
        // Given
        setupTooSmallText(parentElement);

        // When
        const { result } = renderHook(() =>
            useAdaptiveText({
                minFontSize: 12,
                maxFontSize: 200,
                incrementStep: 1,
            }),
        );

        // Then
        const { textRef } = result.current;

        const currentFontSize = getFontSize(textRef);
        expect(currentFontSize).toBe("200px");
    });

    it("should remain at minFontSize when container is too small", () => {
        // Given
        setupTextOverflowBoth(parentElement);

        // When
        const { result } = renderHook(() =>
            useAdaptiveText({
                minFontSize: 12,
                maxFontSize: 20,
                incrementStep: 1,
            }),
        );

        // Then
        const { textRef } = result.current;

        const currentFontSize = getFontSize(textRef);
        expect(currentFontSize).toBe("12px");
    });

    it("should increase fontsize when container is resized", () => {
        // Given
        setupTextOverflowBoth(parentElement);

        // When
        const { result } = renderHook(() =>
            useAdaptiveText({
                minFontSize: 12,
                maxFontSize: 20,
                incrementStep: 1,
            }),
        );

        // Then
        const { textRef } = result.current;
        const fontSizeBeforeResize = getFontSize(textRef);
        expect(fontSizeBeforeResize).toBe("12px");

        // And When
        act(() => {
            setupTooSmallTextOnce(parentElement);
            setupTooSmallTextOnce(parentElement);
            setupTooSmallTextOnce(parentElement);

            triggerResize();
        });

        // Then
        const fontSizeAfterResize = getFontSize(textRef);
        expect(fontSizeAfterResize).toBe("13px");
    });
});

function setupParentElement() {
    const parentElement = document.createElement("div");
    mockedUseResizeObserver.mockImplementation((resize) => {
        triggerResize = resize as () => void;
        return { current: parentElement };
    });
    return parentElement;
}

function setupTextElement() {
    const textElement = document.createElement("span");
    jest.spyOn(React, "useRef").mockReturnValue({ current: textElement });
}

function getFontSize(textRef: React.MutableRefObject<HTMLSpanElement | null>) {
    return textRef.current?.style.getPropertyValue("font-size");
}

const setupTextOverflowHorizontal = (parentElement: HTMLDivElement) => {
    jest.spyOn(parentElement, "clientWidth", "get").mockReturnValue(100);
    jest.spyOn(parentElement, "clientHeight", "get").mockReturnValue(100);

    jest.spyOn(parentElement, "scrollWidth", "get").mockReturnValue(101);
    jest.spyOn(parentElement, "scrollHeight", "get").mockReturnValue(99);
};

const setupTextOverflowVertical = (parentElement: HTMLDivElement) => {
    jest.spyOn(parentElement, "clientWidth", "get").mockReturnValue(100);
    jest.spyOn(parentElement, "clientHeight", "get").mockReturnValue(100);

    jest.spyOn(parentElement, "scrollWidth", "get").mockReturnValue(99);
    jest.spyOn(parentElement, "scrollHeight", "get").mockReturnValue(101);
};

const setupTextOverflowBoth = (parentElement: HTMLDivElement) => {
    jest.spyOn(parentElement, "clientWidth", "get").mockReturnValue(100);
    jest.spyOn(parentElement, "clientHeight", "get").mockReturnValue(100);

    jest.spyOn(parentElement, "scrollWidth", "get").mockReturnValue(101);
    jest.spyOn(parentElement, "scrollHeight", "get").mockReturnValue(101);
};

const setupTooSmallTextOnce = (parentElement: HTMLDivElement) => {
    jest.spyOn(parentElement, "clientWidth", "get").mockReturnValue(100);
    jest.spyOn(parentElement, "clientHeight", "get").mockReturnValue(100);

    jest.spyOn(parentElement, "scrollWidth", "get").mockReturnValueOnce(50);
    jest.spyOn(parentElement, "scrollHeight", "get").mockReturnValueOnce(50);
};

const setupTooSmallText = (parentElement: HTMLDivElement) => {
    jest.spyOn(parentElement, "clientWidth", "get").mockReturnValue(100);
    jest.spyOn(parentElement, "clientHeight", "get").mockReturnValue(100);

    jest.spyOn(parentElement, "scrollWidth", "get").mockReturnValue(50);
    jest.spyOn(parentElement, "scrollHeight", "get").mockReturnValue(50);
};

export {};
