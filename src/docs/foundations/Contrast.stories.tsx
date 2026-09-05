/** Foundations / Contrast — live table from docs/contrast-report.md. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContrastPage } from "./ContrastPage";

const meta = {
  title: "Foundations/Contrast",
  component: ContrastPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ContrastPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
