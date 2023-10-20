import Meal from "@/modules/lunch/meal/meal";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import { useMeal } from "@/modules/lunch/meal/hook/meal.hook";
import {
    createMenuItem,
    createOrder,
} from "@/modules/lunch/__testhelpers__/model-builders";

jest.mock("./hook/meal.hook");
const mockedUseMeal = useMeal as jest.MockedFunction<typeof useMeal>;

describe("Meal", () => {
    it("should render meal type", () => {
        // given
        mockedUseMeal.mockReturnValue({
            hasOrders: false,
        });

        // when
        const { getByText } = render(
            <Meal
                meal={{
                    menuItem: createMenuItem("Varmt", "Vanlig"),
                    orders: [createOrder("Varmt", "PROCURED")],
                }}
            />,
        );

        // then
        expect(getByText("Varmt")).toBeInTheDocument();
    });

    it("should render meal description meal", () => {
        // given
        const mealType = "Varmt";
        const meal = {
            menuItem: createMenuItem(
                "Varmt",
                "Vanlig",
                formatDate(new Date()),
                "Test description of regular variant",
            ),
            orders: [],
        };
        const activeVariant = 1;

        mockedUseMeal.mockReturnValue({
            hasOrders: true,
        });

        // when
        const { getByText } = render(<Meal meal={meal} />);

        // then
        expect(getByText(meal.menuItem.description)).toBeInTheDocument();
    });

    it("should render first name of everybody who ordered the active variant", async () => {
        // given
        const mealType = "Varmt";

        const orders = [
            createOrder("Varmt", "PROCURED"),
            createOrder("Varmt", "PROCURED"),
        ];

        const meal = {
            menuItem: createMenuItem(
                "Varmt",
                "Vanlig",
                formatDate(new Date()),
                "Test description of regular variant",
            ),
            orders,
        };

        mockedUseMeal.mockReturnValue({
            hasOrders: true,
        });

        // when
        const { getByText } = render(<Meal meal={meal} />);

        // then
        await waitFor(() => {
            expect(getByText(orders[0].firstName)).toBeInTheDocument();
            expect(getByText(orders[1].firstName)).toBeInTheDocument();
        });
    });

    it("should render no orders message if no orders", () => {
        // given
        const mealType = "Varmt";
        const meal = {
            menuItem: createMenuItem(
                "Varmt",
                "Vanlig",
                formatDate(new Date()),
                "Test description of regular variant",
            ),
            orders: [],
        };

        const activeVariant = 1;

        mockedUseMeal.mockReturnValue({
            hasOrders: false,
        });

        // when
        const { getByText } = render(<Meal meal={meal} />);

        // then
        expect(getByText("Ingen bestillinger")).toBeInTheDocument();
    });
});

export {};
