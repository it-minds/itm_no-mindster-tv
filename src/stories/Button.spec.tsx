import {render} from "@testing-library/react";
import {Button} from "@/stories/Button";

describe('Button', () => {
    it('should render the button', () => {
        const { getByText } = render(<Button label="Click me" />);

        const label = getByText(/Click me/i);

        expect(label).toBeDefined();
    });
});
