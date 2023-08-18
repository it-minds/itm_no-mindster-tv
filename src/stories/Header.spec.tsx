import {render} from "@testing-library/react";
import {Header} from "@/stories/Header";

describe("Header", () => {
    it("should render username if a user exists", () => {
        const { getByText } = render(
            <Header
                user={{ name: "Test User" }}
                onLogin={() => {}}
                onLogout={() => {}}
                onCreateAccount={() => {}}
            />
        );

        const username = getByText(/Test User/i);

        expect(username).toBeDefined();
    });

    it("should render login button if a user does not exist", () => {
        const { getByText } = render(
            <Header
                user={undefined}
                onLogin={() => {}}
                onLogout={() => {}}
                onCreateAccount={() => {}}
            />
        );

        const loginButton = getByText(/Log in/i);

        expect(loginButton).toBeDefined();
    });
})
