import {fireEvent, render, waitFor} from "@testing-library/react";
import {Page} from "@/stories/Page";

describe('Page', () => {
    it('should render the page', () => {
        const { getByText } = render(<Page />);
        const label = getByText(/Pages in Storybook/i);
        expect(label).toBeDefined();
    });

    it('should set the user when logging in', async () => {
        const { getByText } = render(<Page />);
        const loginButton = getByText("Log in");
        fireEvent.click(loginButton);
        await waitFor(() => {
            const username = getByText("Jane Doe");
            expect(username).toBeDefined();
        });
    })

    it('should unset the user when logging out', async () => {
        const { getByText } = render(<Page />);
        const loginButton = getByText(/Log in/i);
        fireEvent.click(loginButton);

        await waitFor(() => {
            const logoutButton = getByText(/Log out/i);
            logoutButton.click();
        })

        await waitFor(() => {
            const loginButtonAfterLogout = getByText(/Log in/i);
            expect(loginButtonAfterLogout).toBeDefined();
        })
    })

    it('should set the user when creating an account', async () => {
        const { getByText } = render(<Page />);
        const createAccountButton = getByText(/Sign up/i);
        fireEvent.click(createAccountButton);
        await waitFor(() => {
            const username = getByText("Jane Doe");
            expect(username).toBeDefined();
        });
    })
});
