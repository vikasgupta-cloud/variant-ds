/** Foundations / Spacing — dimension/* + control/chip on Button & Badge. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpacingPage } from "./SpacingPage";

const meta = {
  title: "Foundations/Spacing",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SpacingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
