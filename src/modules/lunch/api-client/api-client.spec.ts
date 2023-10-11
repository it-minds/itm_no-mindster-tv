import { fetchMenu, fetchOrders } from "@/modules/lunch/api-client/api-client";
import jestFetchMock from "jest-fetch-mock";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import { MenuItem } from "@/modules/lunch/api-client/types";

jestFetchMock.enableMocks();

describe("LunchModule: fetchOrders", () => {
    it("should fetch orders given date", async () => {
        // given
        const date = new Date();
        const orders = [
            {
                allergies: [],
                diet: "Vanlig",
                firstName: "John",
                lastName: "Doe",
                mealType: "Varmt",
                orderDate: formatDate(date),
                orderStatus: "PROCURED",
            },
        ];

        fetchMock.mockOnceIf(
            `${
                process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN
            }/api/v1/public/users-orders/${formatDate(date)}`,
            async () => {
                return {
                    body: JSON.stringify(orders),
                    status: 200,
                };
            },
        );

        // when
        const fetchedOrders = await fetchOrders(date);

        // then
        expect(fetchedOrders).toEqual(orders);
    });

    it("should fail when invalid json", async () => {
        // given
        const date = new Date();

        fetchMock.mockOnceIf(
            `${
                process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN
            }/api/v1/public/users-orders/${formatDate(date)}`,
            async () => {
                return {
                    body: "not valid json",
                    status: 200,
                };
            },
        );

        // when & then
        await expect(fetchOrders(date)).rejects.toThrow();
    });

    it("should fail when response is not 200", async () => {
        // given
        const date = new Date();

        fetchMock.mockOnceIf(
            `${
                process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN
            }/api/v1/public/users-orders/${formatDate(date)}`,
            async () => {
                return {
                    body: JSON.stringify({
                        error: "Internal server error",
                    }),
                    status: 500,
                };
            },
        );

        // when & then
        await expect(fetchOrders(date)).rejects.toThrow();
    });
});

describe("LunchModule: fetchMenu", () => {
    it("should fetch menu given date", async () => {
        // given
        const date = new Date();
        const menu: MenuItem[] = [
            {
                id: 1,
                description: "Pasta",
                diet: {
                    id: 1,
                    name: "Vanlig",
                },
                mealType: {
                    id: 1,
                    name: "Varmt",
                },
                date: formatDate(date),
                allergens: [],
            },
        ];

        fetchMock.mockOnceIf(
            `${
                process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN
            }/api/v1/public/menu/${formatDate(date)}`,
            async () => {
                return {
                    body: JSON.stringify(menu),
                    status: 200,
                };
            },
        );

        // when
        const fetchedMenu = await fetchMenu(date);

        // then
        expect(fetchedMenu).toEqual(menu);
    });

    it("should fail to fetch menu when invalid json", async () => {
        // given
        const date = new Date();

        fetchMock.mockOnceIf(
            `${
                process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN
            }/api/v1/public/menu/${formatDate(date)}`,
            async () => {
                return {
                    body: "not valid json",
                    status: 200,
                };
            },
        );

        // when & then
        await expect(fetchMenu(date)).rejects.toThrow();
    });

    it("should fail to fetch order when response is not 200", async () => {
        // given
        const date = new Date();

        fetchMock.mockOnceIf(
            `${
                process.env.NEXT_PUBLIC_OFFICEMINDSTER_API_ORIGIN
            }/api/v1/public/menu/${formatDate(date)}`,
            async () => {
                return {
                    body: JSON.stringify({
                        error: "Internal server error",
                    }),
                    status: 500,
                };
            },
        );

        // when & then
        await expect(fetchMenu(date)).rejects.toThrow();
    });
});
