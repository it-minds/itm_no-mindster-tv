import { useLunchModule } from "@/modules/lunch/lunch-module.hook";
import { render } from "@testing-library/react";
import LunchModuleLayout from "@/modules/lunch/lunch-module.layout";
import { Order } from "@/modules/lunch/api-client/api-client";
import { formatDate } from "@/commons/helpers/datetime/datetime";
import "@testing-library/jest-dom";

jest.mock("./lunch-module.hook");
const mockedUseLunchModule = useLunchModule as jest.MockedFunction<
    typeof useLunchModule
>;

describe("LunchModule", () => {
    it("should render all meal options available", () => {
        // given
        mockedUseLunchModule.mockReturnValue({
            meals: {
                Varmt: [],
                Salat: [],
                Suppe: [],
                Pai: [],
            },
        });

        // when
        const { getByText } = render(<LunchModuleLayout />);

        // then
        expect(getByText("Varmt")).toBeInTheDocument();
        expect(getByText("Salat")).toBeInTheDocument();
        expect(getByText("Suppe")).toBeInTheDocument();
        expect(getByText("Pai")).toBeInTheDocument();
    });

    it("should show name of persons that has placed an order", () => {
        // given
        const order = createOrder("Varmt");

        mockedUseLunchModule.mockReturnValue({
            meals: {
                Varmt: [order],
            },
        });

        // when
        const { getByText } = render(<LunchModuleLayout />);

        // then
        expect(getByText(order.firstName)).toBeInTheDocument();
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

export {};
