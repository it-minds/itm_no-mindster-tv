import { MealVariant } from "@/modules/lunch/lunch-module.hook";
import { useEffect, useMemo, useState } from "react";

type UseMeal = {
    hasOrders: boolean;
};

export const useMeal = (meal: MealVariant): UseMeal => {
    const hasOrders = useMemo(() => meal.orders.length > 0, [meal.orders]);

    return {
        hasOrders,
    };
};
