import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Providers from "@/app/providers";

describe("providers.tsx", () => {
    it("should render children", () => {
        render(
            <Providers>
                <div>test</div>
            </Providers>,
        );

        const testDiv = screen.getByText("test");
        expect(testDiv).toBeInTheDocument();
    });
});

export {};
