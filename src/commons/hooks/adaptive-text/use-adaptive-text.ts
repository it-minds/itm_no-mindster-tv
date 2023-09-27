import { useEffect, useRef } from "react";
import useResizeObserver from "@/commons/hooks/resize-observer/use-resize-observer";

const STARTING_FONT_SIZE = 12;
const MAX_FONT_SIZE = 512;
const FONT_SIZE_INCREMENT_STEP = 1;

type UseResizeTextOptions = {
    maxFontSize?: number;
    minFontSize?: number;
    incrementStep?: number;
};

const useResizeText = (options?: UseResizeTextOptions) => {
    const {
        maxFontSize = MAX_FONT_SIZE,
        minFontSize = STARTING_FONT_SIZE,
        incrementStep = FONT_SIZE_INCREMENT_STEP,
    } = options || {};

    const textRef = useRef<HTMLSpanElement | null>(null);

    const resizeText = () => {
        const element = textRef.current;
        let fontSize = minFontSize;

        while (
            element &&
            !textHasOverflownContainer() &&
            fontSize <= maxFontSize
        ) {
            element.style.fontSize = `${fontSize}px`;
            fontSize += incrementStep;
        }

        // Revert to the last font size where no overflow occurred
        if (element && textHasOverflownContainer()) {
            const lastFontSize = fontSize - (incrementStep + 1);
            const cappedFontSize = Math.max(lastFontSize, minFontSize);

            element.style.fontSize = `${cappedFontSize}px`;
        }
    };

    const parentRef = useResizeObserver<HTMLDivElement>(resizeText);

    const textHasOverflownContainer = () => {
        const element = parentRef.current;

        if (!element) return false;

        const { clientWidth, clientHeight, scrollWidth, scrollHeight } =
            element;

        return scrollWidth > clientWidth || scrollHeight > clientHeight;
    };

    useEffect(() => {
        resizeText();
    });

    return {
        parentRef,
        textRef,
    };
};

export default useResizeText;
