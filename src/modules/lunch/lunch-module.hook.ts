import { useEffect, useMemo, useState } from "react";
import { fetchMenu, fetchOrders } from "@/modules/lunch/api-client/api-client";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import { MenuItem, Order } from "@/modules/lunch/api-client/types";
import { useContainerQuery } from "react-container-query";
import { useReactiveCarousel } from "@/commons/hooks/reactive-carousel/use-reactive-carousel";
import { ResponsiveType } from "react-multi-carousel";

export type MealVariant = {
    menuItem: MenuItem;
    orders: Order[];
};

export type Meals = {
    [mealType: string]: MealVariant[];
};

const FULL_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const SECOND_IN_MILLISECONDS = 1000;

type UseLunchModule = {
    ref: React.RefObject<HTMLDivElement>;
    responsive: ResponsiveType;
    meals: Meals;
    hasOrders: boolean;
};

export const useLunchModule = (): UseLunchModule => {
    const { date } = useCurrentDate();

    const { data: orders, isLoading: ordersAreLoading } = useQuery<
        unknown,
        unknown,
        Order[]
    >({
        queryKey: ["orders", formatDate(date)],
        queryFn: () => fetchOrders(date),
    });

    const { data: menuItems, isLoading: menuItemsAreLoading } = useQuery<
        unknown,
        unknown,
        MenuItem[]
    >({
        queryKey: ["menuItems", formatDate(date)],
        queryFn: () => fetchMenu(date),
    });

    const meals = useMemo(
        () => sortOrdersIntoMeals(menuItems, orders),
        [menuItems, orders],
    );
    const hasOrders = useMemo(() => Object.keys(meals).length > 0, [meals]);
    const numberOfMeals = useMemo(() => {
        return Object.entries(meals).reduce((acc, [mealType, mealVariants]) => {
            return acc + mealVariants.length;
        }, 0);
    }, [meals]);

    const { ref, responsive } = useReactiveCarousel(
        [
            {
                minWidth: 0,
                maxWidth: 600,
            },
            {
                minWidth: 601,
                maxWidth: 900,
            },
            {
                minWidth: 901,
                maxWidth: 5000,
            },
        ],
        numberOfMeals,
    );

    return {
        ref,
        responsive,
        meals,
        hasOrders,
    };
};

const useCurrentDate = () => {
    const [date, setDate] = useState(new Date());

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

    return { date };
};

function sortOrdersIntoMeals(
    menuItems: MenuItem[] | undefined,
    orders: Order[] | undefined,
) {
    if (!orders || !menuItems) {
        return {};
    }

    return menuItems.reduce((meals: Meals, menuItem) => {
        const { mealType, diet } = menuItem;

        const ordersForMeal = orders.filter(
            (order) =>
                order.mealType === mealType.name &&
                order.orderStatus === "PROCURED" &&
                order.diet === diet.name,
        );

        if (ordersForMeal.length === 0) {
            return meals;
        }

        if (meals[mealType.name] === undefined) {
            return {
                ...meals,
                [mealType.name]: [
                    {
                        menuItem,
                        orders: ordersForMeal,
                    },
                ],
            };
        }

        return {
            ...meals,
            [mealType.name]: [
                ...meals[mealType.name],
                {
                    menuItem,
                    orders: ordersForMeal,
                },
            ],
        };
    }, {});
}
