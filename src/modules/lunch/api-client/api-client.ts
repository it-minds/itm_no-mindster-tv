import { formatDate } from "@/commons/helpers/datetime/datetime";
import { Order } from "@/modules/lunch/api-client/types";

export const fetchOrders = async (date: Date): Promise<Order[]> => {
    const localDate = formatDate(date);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN}/api/v1/public/users-orders/${localDate}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch orders for date ${localDate}. Status: ${response.status}`,
        );
    }

    return response.json();
};

export const fetchMenu = async (date: Date) => {
    const localDate = formatDate(date);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN}/api/v1/public/menu/${localDate}`,
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch menus for date ${localDate}. Status: ${response.status}`,
        );
    }

    return response.json();
};
