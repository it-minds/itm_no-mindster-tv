import { act, renderHook, waitFor } from "@testing-library/react";
import { useMeal } from "@/modules/lunch/meal/hook/meal.hook";
import {
    createOrder,
    createMenuItem,
} from "@/modules/lunch/__testhelpers__/model-builders";

const TEN_SECONDS_IN_MILLISECONDS = 10000;
describe("UseMeal", () => {
    it("should resolve first variant as active variant", async () => {
        // given
        const diet = "Vegansk";

        const menuItem = createMenuItem("Varmt", diet);
        const orders = [createOrder("Varmt", "PROCURED", diet)];

        // when
        const { result } = renderHook(() =>
            useMeal([
                {
                    menuItem,
                    orders,
                },
            ]),
        );

        // then
        await waitFor(() => {
            expect(result.current.activeVariant).toEqual(0);
        });
    });

    it(`should loop through variants with ${TEN_SECONDS_IN_MILLISECONDS}ms interval when multiple variants`, async () => {
        // given
        const meal1 = {
            menuItem: createMenuItem("Varmt", "Vegansk"),
            orders: [createOrder("Varmt", "PROCURED", "Vegansk")],
        };
        const meal2 = {
            menuItem: createMenuItem("Varmt", "Vanlig"),
            orders: [createOrder("Varmt", "PROCURED", "Vanlig")],
        };

        jest.useFakeTimers();

        // when
        const { result } = renderHook(() => useMeal([meal1, meal2]));

        act(() => {
            jest.advanceTimersByTime(TEN_SECONDS_IN_MILLISECONDS);
        });

        // when
        await waitFor(() => {
            expect(result.current.activeVariant).toEqual(1);
        });

        act(() => {
            jest.advanceTimersByTime(TEN_SECONDS_IN_MILLISECONDS);
        });

        // then
        await waitFor(() => {
            expect(result.current.activeVariant).toEqual(0);
        });
    });

    it("should resolve hasOrders to true when there are orders", async () => {
        // given
        const variants = [
            {
                menuItem: createMenuItem("Varmt", "Vegansk"),
                orders: [createOrder("Varmt", "PROCURED", "Vegansk")],
            },
        ];

        // when
        const { result } = renderHook(() => useMeal(variants));

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBeTruthy();
        });
    });

    it("should resolve hasOrders to false when there are no orders", async () => {
        // given
        const variants = [
            {
                menuItem: createMenuItem("Varmt", "Vegansk"),
                orders: [],
            },
        ];

        // when
        const { result } = renderHook(() => useMeal(variants));

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBeFalsy();
        });
    });
});

export {};
