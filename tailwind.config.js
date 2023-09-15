/*
 * Working around NextUI import rule by disabling the rule for this line.
 * See `CONTRIBUTING.md` for more information.
 */
/* eslint-disable-next-line no-restricted-imports */
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        background: "#00173a",
                        primary: "#009bde",
                        secondary: "#e2378d",
                    },
                },
                light: {
                    colors: {
                        background: "#fcfcfc",
                        primary: "#009bde",
                        secondary: "#e2378d",
                    },
                },
            },
        }),
    ],
    darkMode: ["class"],
};
export default config;
