/** Foundations / Colour — from compiled tokens.json. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColourPage } from "./ColourPage";

const meta = {
  title: "Foundations/Colour",
  component: ColourPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ColourPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
