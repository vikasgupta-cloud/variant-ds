/** Foundations / Radius — radius/* swatches + real components. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadiusPage } from "./RadiusPage";

const meta = {
  title: "Foundations/Radius",
  component: RadiusPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RadiusPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
