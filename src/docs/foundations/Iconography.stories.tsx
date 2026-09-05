/** Foundations / Iconography — Phosphor regular via Icon wrapper. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconographyPage } from "./IconographyPage";

const meta = {
  title: "Foundations/Iconography",
  component: IconographyPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof IconographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
