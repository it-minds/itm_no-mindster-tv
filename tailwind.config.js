/*
 * Working around NextUI import rule by disabling the rule for this line.
 * See `CONTRIBUTING.md` for more information.
 */
/* eslint-disable-next-line no-restricted-imports */
import { nextui } from "@nextui-org/react";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 120s linear infinite",
            },
            fontFamily: {
                serif: ["var(--bookman-old-style)", "serif"],
                sans: ["var(--franklin-gothic)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [
        containerQueries,
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
