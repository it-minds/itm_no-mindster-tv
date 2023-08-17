import { getByRole, render } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
    it("should renter start page", () => {
        const { getByText } = render(<Page />);

        const paragraph = getByText(
            /Learn about Next.js in an interactive course with quizzes!/i,
        );

        expect(paragraph).toBeDefined();
    });
});

export {};
