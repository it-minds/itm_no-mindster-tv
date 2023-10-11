import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import { render } from "@testing-library/react";
import LunchModuleLayout from "@/modules/lunch/lunch-module.layout";
import "@testing-library/jest-dom";
import Meal from "@/modules/lunch/meal/meal";
import {
    createMenuItem,
    createOrder,
} from "@/modules/lunch/__testhelpers__/model-builders";

jest.mock("./lunch-module.hook");
const mockedUseLunchModule = useLunchModule as jest.MockedFunction<
    typeof useLunchModule
>;

jest.mock("./meal/meal");
const mockedMeal = Meal as jest.MockedFunction<typeof Meal>;

describe("LunchModule", () => {
    it("should render all meal options available", () => {
        // given
        mockedUseLunchModule.mockReturnValue({
            meals: {
                Varmt: [
                    {
                        menuItem: createMenuItem("Varmt", "Vanlig"),
                        orders: [createOrder("Varmt")],
                    },
                ],
                Salat: [
                    {
                        menuItem: createMenuItem("Salat", "Vanlig"),
                        orders: [createOrder("Salat")],
                    },
                ],
                Suppe: [
                    {
                        menuItem: createMenuItem("Suppe", "Vanlig"),
                        orders: [createOrder("Suppe")],
                    },
                ],
                Pai: [
                    {
                        menuItem: createMenuItem("Pai", "Vanlig"),
                        orders: [createOrder("Pai")],
                    },
                ],
            },
            hasOrders: true,
        });

        mockedMeal.mockImplementation(({ mealType }) => <div>{mealType}</div>);

        // when
        const { getByText } = render(<LunchModuleLayout />);

        // then
        expect(getByText("Varmt")).toBeInTheDocument();
        expect(getByText("Salat")).toBeInTheDocument();
        expect(getByText("Suppe")).toBeInTheDocument();
        expect(getByText("Pai")).toBeInTheDocument();
    });

    it("should render title", () => {
        // given
        mockedUseLunchModule.mockReturnValue({
            meals: {},
            hasOrders: false,
        });

        // when
        const { getByText } = render(<LunchModuleLayout />);

        // then
        expect(getByText("Dagens Lunsj")).toBeInTheDocument();
    });

    it("should render message when no orders", () => {
        // given
        mockedUseLunchModule.mockReturnValue({
            meals: {},
            hasOrders: false,
        });

        // when
        const { getByText } = render(<LunchModuleLayout />);

        // then
        expect(
            getByText(
                "Ingen bestillinger i dag. Husk å bestille til i morgen!",
            ),
        ).toBeInTheDocument();
    });
});

export {};
