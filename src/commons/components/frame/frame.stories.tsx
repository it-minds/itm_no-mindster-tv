import type { Meta, StoryObj } from "@storybook/react";
import Frame from "./frame";

const meta = {
    title: "Commons/Frame/Frame",
    component: Frame,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fill",
    },
} satisfies Meta<typeof Frame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithModule: Story = {
    args: {
        children: (
            <div className="col-start-4 col-end-10 row-start-2 row-end-5 rounded-3xl bg-amber-50 p-12 text-gray-900">
                <h1 className="mb-8 font-serif text-5xl">Example module</h1>
                <p className="text-lg">
                    This is an example module placed between column 2 and 6 and
                    row 3 and 5
                </p>
            </div>
        ),
    },
};

export const EmptyGrid: Story = {
    args: {
        children: <></>,
    },
};

const FilledGridChildren = [];
for (let i = 0; i < 72; i++) {
    FilledGridChildren.push(<div className="rounded-2xl bg-blue-950"></div>);
}

export const FilledGrid: Story = {
    args: {
        children: <>{FilledGridChildren}</>,
    },
};
