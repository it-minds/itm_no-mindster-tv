import { MealVariant } from "@/modules/lunch/lunch-module.hook";
import { useEffect, useMemo, useState } from "react";

const TEN_SECONDS_IN_MILLISECONDS = 10000;
const MEAL_VARIANT_CAROUSEL_INTERVAL = TEN_SECONDS_IN_MILLISECONDS;

type UseMeal = {
    activeVariant: number;
    hasOrders: boolean;
};

export const useMeal = (variants: MealVariant[]): UseMeal => {
    const [activeVariant, setActiveVariant] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVariant((activeVariant + 1) % variants.length);
        }, MEAL_VARIANT_CAROUSEL_INTERVAL);

        return () => clearInterval(interval);
    }, [activeVariant, variants.length]);

    const hasOrders = useMemo(
        () => variants[activeVariant].orders.length > 0,
        [activeVariant, variants],
    );

    return {
        activeVariant,
        hasOrders,
    };
};
