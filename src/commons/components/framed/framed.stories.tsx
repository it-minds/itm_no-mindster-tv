import type { Meta, StoryObj } from "@storybook/react";
import Framed from "./framed";

const meta = {
    title: "Commons/Frame/Framed",
    component: Framed,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fill",
    },
} satisfies Meta<typeof Framed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithModule: Story = {
    args: {
        row: 2,
        col: 4,
        height: 3,
        width: 6,
        children: (
            <div className="col-start-4 col-end-10 row-start-2 row-end-5 rounded-3xl bg-amber-50 p-12 text-gray-900">
                <h1 className="mb-8 text-5xl">Example module</h1>
                <p className="text-lg">
                    This is an example module placed between column 2 and 6 and
                    row 3 and 5
                </p>
            </div>
        ),
    },
};
