import { formatDate } from "@/commons/helpers/datetime/datetime";

export type Order = {
    allergies: string[];
    diet: string;
    firstName: string;
    lastName: string;
    mealType: string;
    orderDate: string;
    orderStatus: string;
};

export type OrdersResponse =
    | {
          orders: Order[];
          isError: false;
      }
    | {
          orders: null;
          isError: true;
      };
export const fetchOrders = async (date: Date): Promise<OrdersResponse> => {
    const localDate = formatDate(date);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN}/api/v1/public/users-orders/${localDate}`,
        );

        if (!response.ok) {
            return {
                orders: null,
                isError: true,
            };
        }

        const orders = await response.json();

        return {
            orders: orders,
            isError: false,
        };
    } catch (error) {
        return {
            orders: null,
            isError: true,
        };
    }
};
