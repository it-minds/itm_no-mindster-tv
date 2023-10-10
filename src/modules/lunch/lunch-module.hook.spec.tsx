import { fetchOrders, Order } from "@/modules/lunch/api-client/api-client";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import theoretically from "jest-theories";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            cacheTime: Infinity,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: () => {},
    },
});
const queryClientWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("./api-client/api-client");
const mockedFetchOrders = fetchOrders as jest.MockedFunction<
    typeof fetchOrders
>;

const ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
describe("useLunchModule", () => {
    afterEach(() => {
        jest.resetAllMocks();
        queryClient.clear();
    });

    it("should filter orders by meal type", async () => {
        const orders = [
            createOrder("Varmt"),
            createOrder("Salat"),
            createOrder("Salat"),
            createOrder("Wrap"),
            createOrder("Varmt"),
            createOrder("Varmt"),
        ];

        // given
        setupOrders(orders);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            expect(result.current.meals).toEqual({
                Varmt: [orders[0], orders[4], orders[5]],
                Salat: [orders[1], orders[2]],
                Wrap: [orders[3]],
            });
        });
    });

    it("should only show orders with status PROCURED", async () => {
        // given
        const orders = [
            createOrder("Varmt", "PROCURED"),
            createOrder("Varmt", "REJECTED"),
            createOrder("Varmt", "PENDING"),
            createOrder("Varmt", "PROCURED"),
        ];

        setupOrders(orders);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            expect(result.current.meals).toEqual({
                Varmt: [orders[0], orders[3]],
            });
        });
    });

    it("should show orders for today", async () => {
        // given
        const orders = [createOrder("Varmt", "PROCURED")];
        setupOrders(orders);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const firstOrder = result.current.meals["Varmt"][0];
            expect(firstOrder.orderDate).toEqual(formatDate(new Date()));
        });
    });

    it("should switch to next day at midnight", async () => {
        // given
        const orders = [createOrder("Varmt", "PROCURED")];
        setupOrders(orders);

        jest.useFakeTimers();
        jest.setSystemTime(new Date().setHours(23, 59, 50));

        const dateBeforeMidnight = new Date();

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // and when
        act(() => {
            jest.advanceTimersByTime(10000);
        });

        // then
        const dateAfterMidnight = new Date();
        await waitFor(() => {
            const firstOrder = result.current.meals["Varmt"][0];
            expect(firstOrder.orderDate).toEqual(formatDate(dateAfterMidnight));
        });
    });
});

const getUniqueName = () => {
    return {
        firstName: `John ${Math.random()}`,
        lastName: `Doe ${Math.random()}`,
    };
};

const createOrder = (
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

function setupOrders(orders: Order[]) {
    mockedFetchOrders.mockImplementation(async (date) => {
        const formattedDate = formatDate(date);

        return orders.map((order) => ({ ...order, orderDate: formattedDate }));
    });
}

export {};
