/**
 * Scaffold story — verifies Mode/Context toolbars change token-driven background.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";

function EmptyScaffold() {
  return (
    <div className="max-w-md space-y-4">
      <p className="text-text-primary text-base">
        Variant DS — Mode / Context toolbar check
      </p>
      <p className="text-text-secondary text-sm">
        Toggle <strong className="text-text-primary">Mode</strong> in the toolbar.
        The frame background uses{" "}
        <code className="text-text-tertiary">bg-bg-canvas</code> (or surface /
        surface-raised via Context) and should flip with light / dark.
      </p>
      <div className="rounded-md border border-border-default bg-bg-surface p-4">
        <p className="text-text-primary text-sm">Surface sample</p>
        <p className="text-text-tertiary text-sm">
          Nested surface fill + border for a quick token smoke test.
        </p>
      </div>
    </div>
  );
}

const meta = {
  title: "Scaffold/Empty",
  component: EmptyScaffold,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EmptyScaffold>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
