import localFont from "next/font/local";

export const franklinGothic = localFont({
    variable: "--franklin-gothic",
    src: [
        {
            weight: "400",
            path: "../../../../public/fonts/FranklinGothicATF-Regular.otf",
        },
        {
            weight: "700",
            path: "../../../../public/fonts/FranklinGothicATF-Bold.otf",
        },
    ],
});

export const bookmanOldStyle = localFont({
    variable: "--bookman-old-style",
    src: [
        {
            weight: "400",
            path: "../../../../public/fonts/BookmanOldStylePro-Regular.otf",
        },
        {
            weight: "700",
            path: "../../../../public/fonts/BookmanOldStylePro-Bold.otf",
        },
        {
            weight: "400",
            style: "italic",
            path: "../../../../public/fonts/BookmanOldStylePro-Italic.otf",
        },
        {
            weight: "700",
            style: "italic",
            path: "../../../../public/fonts/BookmanOldStylePro-BoldIt.otf",
        },
    ],
});
