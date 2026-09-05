/** Foundations / Elevation — shadow/sm and shadow/md. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ElevationPage } from "./ElevationPage";

const meta = {
  title: "Foundations/Elevation",
  component: ElevationPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ElevationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
