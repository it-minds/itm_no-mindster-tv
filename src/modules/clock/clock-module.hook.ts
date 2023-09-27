import useAdaptiveText from "@/commons/hooks/adaptive-text/use-adaptive-text";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/commons/helpers/datetime/datetime";

export const useClockModule = () => {
    const { parentRef, textRef } = useAdaptiveText();

    const [time, setTime] = useState<Date>(getCurrentTime());
    const hour = useMemo(() => formatDate(time, "HH"), [time]);
    const minute = useMemo(() => formatDate(time, "mm"), [time]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function getCurrentTime(): Date {
        return new Date();
    }

    return {
        parentRef,
        textRef,
        hour,
        minute,
    };
};
