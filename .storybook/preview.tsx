import type { Preview, StoryContext, StoryFn } from "@storybook/react";
import {
    withThemeByClassName,
    withThemeByDataAttribute,
} from "@storybook/addon-styling";
import localFont from "next/font/local";
import "../src/app/globals.css";

const franklinGothic = localFont({
    variable: "--franklin-gothic",
    src: [
        {
            weight: "400",
            path: "../fonts/FranklinGothicATF-Regular.otf",
        },
        {
            weight: "700",
            path: "../fonts/FranklinGothicATF-Bold.otf",
        },
    ],
});

const bookmanOldStyle = localFont({
    variable: "--bookman-old-style",
    src: [
        {
            weight: "400",
            path: "../fonts/BookmanOldStylePro-Regular.otf",
        },
        {
            weight: "700",
            path: "../fonts/BookmanOldStylePro-Bold.otf",
        },
        {
            weight: "400",
            style: "italic",
            path: "../fonts/BookmanOldStylePro-Italic.otf",
        },
        {
            weight: "700",
            style: "italic",
            path: "../fonts/BookmanOldStylePro-BoldIt.otf",
        },
    ],
});

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

const fontDecorator = (Story: StoryFn) => (
    <div
        className={`${`font-sans ${franklinGothic.variable} ${bookmanOldStyle.variable}`}`}
    >
        <Story />
    </div>
);

export const decorators = [themeDecorator, fontDecorator, fullscreenDecorator];

export default preview;
