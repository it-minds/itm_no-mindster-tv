import { useEffect, useMemo, useState } from "react";
import { fetchOrders, Order } from "@/modules/lunch/api-client/api-client";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/commons/helpers/datetime/datetime";

type Meals = {
    [mealType: string]: Order[];
};

const FULL_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const SECOND_IN_MILLISECONDS = 1000;

export const useLunchModule = (): { meals: Meals } => {
    const [date, setDate] = useState(new Date());

    const { data: orders } = useQuery<unknown, unknown, Order[]>({
        queryKey: ["orders", formatDate(date)],
        queryFn: () => fetchOrders(date),
    });

    useEffect(() => {
        const timeOfDayInMilliseconds =
            date.getHours() * HOUR_IN_MILLISECONDS +
            date.getMinutes() * MINUTE_IN_MILLISECONDS +
            date.getSeconds() * SECOND_IN_MILLISECONDS;

        const timeUntilMidnightInMilliseconds =
            FULL_DAY_IN_MILLISECONDS - timeOfDayInMilliseconds;

        const timeout = setTimeout(() => {
            const date = new Date();
            setDate(date);
        }, timeUntilMidnightInMilliseconds);

        return () => clearTimeout(timeout);
    }, [date]);

    const meals = useMemo(() => sortOrdersByMealType(orders), [orders]);

    return {
        meals,
    };
};

function sortOrdersByMealType(orders: Order[] | undefined) {
    if (!orders) {
        return {};
    }

    return orders.reduce((acc: Meals, order) => {
        const { mealType, orderStatus } = order;

        if (orderStatus !== "PROCURED") {
            return acc;
        }

        if (!acc[mealType]) {
            acc[mealType] = [];
        }

        acc[mealType].push(order);

        return acc;
    }, {});
}
