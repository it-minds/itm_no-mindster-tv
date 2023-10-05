"use client";
import type { Module } from "@/modules/module";
import useAdaptiveText from "@/commons/hooks/adaptive-text/use-adaptive-text";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import { useClockModule } from "@/modules/clock/clock-module.hook";

const ClockModule: Module = () => {
    const { parentRef, textRef, hour, minute } = useClockModule();

    return (
        <div className="h-full overflow-hidden px-4">
            <div
                ref={parentRef}
                className="grid h-full w-full place-items-center"
            >
                <span
                    ref={textRef}
                    className="block w-full font-bold leading-tight"
                >
                    {hour}
                    <span className="animate-pulse">:</span>
                    {minute}
                </span>
            </div>
        </div>
    );
};

export default ClockModule;
