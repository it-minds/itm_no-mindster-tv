export type Order = {
    allergies: string[];
    diet: string;
    firstName: string;
    lastName: string;
    mealType: string;
    orderDate: string;
    orderStatus: "PROCURED" | "PENDING" | "REJECTED";
};

export type Diet = {
    id: number;
    name: string;
};

export type MealType = {
    id: number;
    name: string;
};

export type Allergy = {
    id: number;
    type: string;
};

export type MenuItem = {
    id: number;
    description: string;
    diet: Diet;
    mealType: MealType;
    date: string;
    allergens: Allergy[];
};
