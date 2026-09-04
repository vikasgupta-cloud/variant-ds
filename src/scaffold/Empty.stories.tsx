// Purpose: empty scaffold story so Storybook has something to open (Task 1).
// No design-system components yet — replaced as real components land.
import type { Meta, StoryObj } from "@storybook/react-vite";

function EmptyScaffold() {
  return (
    <div className="p-8 text-base">
      <p className="font-sans">Variant DS — Storybook scaffold is running.</p>
      <p className="mt-2 opacity-70">
        Tailwind v4 is active (utility classes above). Tokens and components come
        next.
      </p>
    </div>
  );
}

const meta = {
  title: "Scaffold/Empty",
  component: EmptyScaffold,
} satisfies Meta<typeof EmptyScaffold>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
