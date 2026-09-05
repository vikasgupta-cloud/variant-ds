/** Foundations / Typography — from typography/* composites in tokens.json. */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypographyPage } from "./TypographyPage";

const meta = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
