/** Foundations / Motion — duration/* and easing/* demos. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MotionPage } from "./MotionPage";

const meta = {
  title: "Foundations/Motion",
  component: MotionPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MotionPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
