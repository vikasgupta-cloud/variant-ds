/**
 * Progress — five-story set. Neutral / success / danger; determinate + indeterminate.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";
import type { ProgressVariant } from "./Progress.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const variants: ProgressVariant[] = ["neutral", "success", "danger"];
const values = [0, 25, 50, 75, 100] as const;

const meta = {
  title: "Components/Loading/Progress bar/Examples",
  component: Progress,
  args: {
    variant: "neutral" as ProgressVariant,
    value: 40,
    label: "Upload",
    showValue: true,
    state: "default" as const,
  },
  argTypes: {
    variant: { control: "select", options: [...variants] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    state: {
      control: "select",
      options: ["default"],
      description: "Design-review only — Progress has no forced interaction states.",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Progress — All variants"
        description={
          <>
            Indicator uses{" "}
            <code className="text-text-primary">bg/*-strong</code>. Track uses{" "}
            <code className="text-text-primary">progress/track-bg</code>.
          </>
        }
      />
      <StorySection title="Variant × value">
        <div className="flex max-w-md flex-col gap-16">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-8">
              <span className="font-mono text-xs text-text-tertiary">
                {variant}
              </span>
              {values.map((value) => (
                <Progress
                  key={value}
                  variant={variant}
                  value={value}
                  label={`${value}%`}
                  showValue
                />
              ))}
            </div>
          ))}
        </div>
      </StorySection>
      <StorySection title="Indeterminate">
        <div className="flex max-w-md flex-col gap-16">
          {variants.map((variant) => (
            <Progress
              key={variant}
              variant={variant}
              value={null}
              label={`${variant} loading`}
            />
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Progress — States"
        description="Determinate vs indeterminate. No hover/active design-review states."
      />
      <StorySection title="Modes">
        <div className="flex max-w-md flex-col gap-16">
          <Progress value={60} label="Determinate" showValue />
          <Progress value={null} label="Indeterminate" />
        </div>
      </StorySection>
    </div>
  ),
};

export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Progress — Content" />
      <StorySection title="Label / value permutations">
        <div className="flex max-w-md flex-col gap-16">
          <Progress value={35} />
          <Progress value={35} label="With label" />
          <Progress value={35} showValue />
          <Progress value={35} label="With label + value" showValue />
          <Progress value={null} label="Indeterminate (no value)" />
        </div>
      </StorySection>
    </div>
  ),
};

export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Progress — Layout" />
      <StorySection title="Full width">
        <Progress value={70} label="Campaign sync" showValue variant="success" />
      </StorySection>
      <StorySection title="Constrained">
        <div className="w-48 rounded-control border border-border-subtle bg-bg-surface p-8">
          <Progress value={45} label="Narrow" showValue />
        </div>
      </StorySection>
      <StorySection title="Inline stack">
        <div className="flex max-w-lg flex-col gap-8">
          <Progress value={90} variant="success" label="Passed" showValue />
          <Progress value={40} variant="neutral" label="Running" showValue />
          <Progress value={15} variant="danger" label="Failed steps" showValue />
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "neutral",
    value: 40,
    label: "Upload",
    showValue: true,
    state: "default",
  },
  render: (args) => (
    <div className="max-w-md p-8">
      <Progress {...args} />
    </div>
  ),
};
