import { MenuItem, Order } from "@/modules/lunch/api-client/types";
import { formatDate } from "@/commons/helpers/datetime/datetime";

export const getUniqueName = () => {
    return {
        firstName: `John ${Math.random()}`,
        lastName: `Doe ${Math.random()}`,
    };
};
export const createOrder = (
    mealType: string,
    orderStatus?: Order["orderStatus"],
    diet?: string,
): Order => {
    const { firstName, lastName } = getUniqueName();

    return {
        allergies: [],
        diet: diet ?? "Vanlig",
        firstName,
        lastName,
        mealType: mealType,
        orderDate: formatDate(new Date()),
        orderStatus: orderStatus ?? "PROCURED",
    };
};

export const createMenuItem = (
    mealType: string,
    diet: string,
    date: string = formatDate(new Date()),
    description: string = "description",
    allergens: string[] = [],
): MenuItem => {
    return {
        id: 1,
        diet: {
            id: 1,
            name: diet,
        },
        mealType: {
            id: 1,
            name: mealType,
        },
        description,
        date,
        allergens: allergens.map((a) => ({ id: 1, type: a })),
    };
};
