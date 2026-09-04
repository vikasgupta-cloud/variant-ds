/**
 * Foundations / Tokens — auto tables from compiled tokens.json (spec §5).
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenBrowser } from "./TokenBrowser";

const meta = {
  title: "Foundations/Tokens",
  component: TokenBrowser,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TokenBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Browser: Story = {};
