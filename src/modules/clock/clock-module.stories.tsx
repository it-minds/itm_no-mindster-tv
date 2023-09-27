import type { Meta, StoryObj } from "@storybook/react";
import ClockModule from "@/modules/clock/clock-module";

const meta = {
    title: "Modules/Clock",
    component: ClockModule,
} satisfies Meta<typeof ClockModule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CurrentTime: Story = {};
