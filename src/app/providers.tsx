"use client";

import { FC, ReactNode } from "react";

/*
 * Working around NextUI import rule by disabling the rule for this line.
 * See `CONTRIBUTING.md` for more information.
 */
/* eslint-disable-next-line no-restricted-imports */
import { NextUIProvider } from "@nextui-org/react";

type ProviderProps = {
    children: ReactNode;
};

const Providers: FC<ProviderProps> = ({ children }) => {
    return <NextUIProvider className="h-full">{children}</NextUIProvider>;
};

export default Providers;
