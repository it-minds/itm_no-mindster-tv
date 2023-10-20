import { act, renderHook, waitFor } from "@testing-library/react";
import { useMeal } from "@/modules/lunch/meal/hook/meal.hook";
import {
    createOrder,
    createMenuItem,
} from "@/modules/lunch/__testhelpers__/model-builders";
describe("UseMeal", () => {
    it("should resolve hasOrders to true when there are orders", async () => {
        // given
        const meal = {
            menuItem: createMenuItem("Varmt", "Vegansk"),
            orders: [createOrder("Varmt", "PROCURED", "Vegansk")],
        };

        // when
        const { result } = renderHook(() => useMeal(meal));

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBeTruthy();
        });
    });

    it("should resolve hasOrders to false when there are no orders", async () => {
        // given
        const mail = {
            menuItem: createMenuItem("Varmt", "Vegansk"),
            orders: [],
        };

        // when
        const { result } = renderHook(() => useMeal(mail));

        // then
        await waitFor(() => {
            expect(result.current.hasOrders).toBeFalsy();
        });
    });
});

export {};
