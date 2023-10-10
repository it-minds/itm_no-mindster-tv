import { formatDate } from "@/commons/helpers/datetime/datetime";

export type Order = {
    allergies: string[];
    diet: string;
    firstName: string;
    lastName: string;
    mealType: string;
    orderDate: string;
    orderStatus: "PROCURED" | "PENDING" | "REJECTED";
};

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
