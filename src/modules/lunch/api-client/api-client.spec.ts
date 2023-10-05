import { fetchOrders } from "@/modules/lunch/api-client/api-client";
import jestFetchMock from "jest-fetch-mock";
import { formatDate } from "@/commons/helpers/datetime/datetime";

jestFetchMock.enableMocks();

describe("LunchModule: ApiClient", () => {
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
        const { orders: fetchedOrders, isError } = await fetchOrders(date);

        // then
        expect(isError).toBe(false);
        expect(fetchedOrders).toEqual(orders);
    });

    it("should resolve error when not valid json", async () => {
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

        // when
        const { isError } = await fetchOrders(date);

        // then
        expect(isError).toBe(true);
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

        // when
        const { isError } = await fetchOrders(date);

        // then
        expect(isError).toBe(true);
    });
});
