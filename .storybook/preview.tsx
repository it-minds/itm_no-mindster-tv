import "../src/app/globals.css";
import type { Preview, StoryContext, StoryFn } from "@storybook/react";
import {
    withThemeByClassName,
    withThemeByDataAttribute,
} from "@storybook/addon-styling";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

const themeDecorator = withThemeByClassName({
    themes: {
        light: "light",
        dark: "dark",
    },
    defaultTheme: "dark",
});

const fullscreenDecorator = (Story: StoryFn, context: StoryContext) => {
    if (context?.parameters.layout !== "fill") return <Story />;

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
            }}
        >
            <Story />
        </div>
    );
};

export const decorators = [themeDecorator, fullscreenDecorator];

export default preview;
