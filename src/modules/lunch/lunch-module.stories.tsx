import type { Meta, StoryObj } from "@storybook/react";
import LunchModuleLayout from "@/modules/lunch/lunch-module.layout";

const meta = {
    title: "Modules/Lunch",
    component: LunchModuleLayout,
    parameters: {
        environment: {
            NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN: "https://example.com",
        },
        mockData: [
            {
                url: "/undefined/api/v1/public/users-orders/2023-10-09",
                method: "GET",
                status: 200,
                response: [
                    {
                        allergies: [],
                        diet: "Vanlig",
                        firstName: "John",
                        lastName: "Doe",
                        mealType: "Varmt",
                        orderDate: "2021-09-30",
                        orderStatus: "PROCURED",
                    },
                    {
                        allergies: [],
                        diet: "Vegetar",
                        firstName: "Jane",
                        lastName: "Doe",
                        mealType: "Salat",
                        orderDate: "2021-09-30",
                        orderStatus: "PROCURED",
                    },
                ],
            },
        ],
    },
} satisfies Meta<typeof LunchModuleLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
