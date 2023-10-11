import { fetchMenu, fetchOrders } from "@/modules/lunch/api-client/api-client";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { MenuItem, Order } from "@/modules/lunch/api-client/types";
import {
    createMenuItem,
    createOrder,
} from "@/modules/lunch/__testhelpers__/model-builders";

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

const mockedFetchMenuItems = fetchMenu as jest.MockedFunction<typeof fetchMenu>;

const ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

function setupMenu(menuItems: MenuItem[]) {
    mockedFetchMenuItems.mockImplementation(async (date) => {
        const formattedDate = formatDate(date);

        return menuItems.map((m) => ({ ...m, date: formattedDate }));
    });
}

describe("useLunchModule", () => {
    afterEach(() => {
        jest.resetAllMocks();
        queryClient.clear();
    });

    it("should filter orders by meal type", async () => {
        // given
        const orders = [
            createOrder("Varmt"),
            createOrder("Salat"),
            createOrder("Salat"),
            createOrder("Wrap"),
            createOrder("Varmt"),
            createOrder("Varmt"),
        ];

        const menu = [
            createMenuItem("Varmt", "Vanlig"),
            createMenuItem("Salat", "Vanlig"),
            createMenuItem("Wrap", "Vanlig"),
        ];

        setupOrders(orders);
        setupMenu(menu);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const varmMeal = result.current.meals["Varmt"];
            const salatMeal = result.current.meals["Salat"];
            const wrapMeal = result.current.meals["Wrap"];

            expect(varmMeal[0].orders).toEqual([
                orders[0],
                orders[4],
                orders[5],
            ]);
            expect(salatMeal[0].orders).toEqual([orders[1], orders[2]]);
            expect(wrapMeal[0].orders).toEqual([orders[3]]);
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
        setupMenu([createMenuItem("Varmt", "Vanlig")]);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const varmMeal = result.current.meals["Varmt"];

            expect(varmMeal[0].orders).toEqual([orders[0], orders[3]]);
        });
    });

    it("should show orders for today", async () => {
        // given
        const orders = [createOrder("Varmt", "PROCURED")];
        setupOrders(orders);
        setupMenu([createMenuItem("Varmt", "Vanlig")]);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const firstOrder = result.current.meals["Varmt"][0].orders[0];
            expect(firstOrder.orderDate).toEqual(formatDate(new Date()));
        });
    });

    it("should switch to next day at midnight", async () => {
        // given
        const orders = [createOrder("Varmt", "PROCURED")];
        setupOrders(orders);
        setupMenu([createMenuItem("Varmt", "Vanlig")]);

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
            const firstOrder = result.current.meals["Varmt"][0].orders[0];
            expect(firstOrder.orderDate).toEqual(formatDate(dateAfterMidnight));
        });
    });

    it("should sort menu items by mealType", async () => {
        // given
        const menuItems = [
            createMenuItem("Varmt", "Vanlig"),
            createMenuItem("Salat", "Vegetar"),
        ];

        setupOrders([
            createOrder("Varmt", "PROCURED"),
            createOrder("Salat", "PROCURED", "Vegetar"),
        ]);
        setupMenu(menuItems);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const varmMeal = result.current.meals["Varmt"];
            const salatMeal = result.current.meals["Salat"];

            expect(varmMeal).toBeDefined();
            expect(salatMeal).toBeDefined();

            const varmVanligMeal = varmMeal[0];
            const salatVegetarMeal = salatMeal[0];

            expect(varmVanligMeal.menuItem).toEqual(menuItems[0]);
            expect(salatVegetarMeal.menuItem).toEqual(menuItems[1]);
        });
    });

    it("should not show mealTypes that no-one has ordered", async () => {
        // given
        const menuItems = [
            createMenuItem("Varmt", "Vanlig"),
            createMenuItem("Salat", "Vanlig"),
            createMenuItem("Wrap", "Vanlig"),
        ];

        setupOrders([
            createOrder("Varmt", "PROCURED"),
            createOrder("Salat", "PROCURED"),
        ]);
        setupMenu(menuItems);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const varmMeal = result.current.meals["Varmt"];
            const salatMeal = result.current.meals["Salat"];
            const wrapMeal = result.current.meals["Wrap"];

            expect(varmMeal[0].menuItem).toEqual(menuItems[0]);
            expect(salatMeal[0].menuItem).toEqual(menuItems[1]);
            expect(wrapMeal).toBeUndefined();
        });
    });

    it("should not show meal variants that no-one has ordered", async () => {
        // given
        const menuItems = [
            createMenuItem("Varmt", "Vanlig"),
            createMenuItem("Varmt", "Vegetar"),
            createMenuItem("Varmt", "Vegan"),
        ];

        setupOrders([
            createOrder("Varmt", "PROCURED", "Vanlig"),
            createOrder("Varmt", "PROCURED", "Vegetar"),
        ]);

        setupMenu(menuItems);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            const varmMeal = result.current.meals["Varmt"];

            expect(varmMeal[0]).toBeDefined();
            expect(varmMeal[1]).toBeDefined();
            expect(varmMeal[2]).toBeUndefined();
        });
    });

    it("should resolve true for hasOrders when there are procured orders", async () => {
        // given
        setupOrders([createOrder("Varmt", "PROCURED")]);
        setupMenu([createMenuItem("Varmt", "Vanlig")]);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBe(true);
        });
    });

    it("should resolve false for hasOrders when there are no orders", async () => {
        // given
        setupOrders([]);
        setupMenu([createMenuItem("Varmt", "Vanlig")]);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBe(false);
        });
    });

    it("should resolve false for hasOrders when there orders, but no-one are procured", async () => {
        // given
        setupOrders([createOrder("Varmt", "PENDING")]);

        setupMenu([createMenuItem("Varmt", "Vanlig")]);

        // when
        const { result } = renderHook(() => useLunchModule(), {
            wrapper: queryClientWrapper,
        });

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBe(false);
        });
    });
});

function setupOrders(orders: Order[]) {
    mockedFetchOrders.mockImplementation(async (date) => {
        const formattedDate = formatDate(date);

        return orders.map((order) => ({ ...order, orderDate: formattedDate }));
    });
}

export {};
