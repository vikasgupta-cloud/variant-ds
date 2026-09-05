/**
 * Slider — five-story set. Single + range; design-review `state` for thumb visuals.
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";
import type { SliderState } from "./Slider.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const states: SliderState[] = ["default", "hover", "dragging", "disabled"];

const meta = {
  title: "Components/Forms and input/Slider/Examples",
  component: Slider,
  args: {
    defaultValue: 40,
    label: "Opacity",
    showValue: true,
    state: "default" as SliderState,
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces hover / dragging / disabled. Leave at default in production.",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Slider — All variants"
        description={
          <>
            Range fill uses{" "}
            <code className="text-text-primary">bg/neutral/strong</code>. Thumb
            uses surface +{" "}
            <code className="text-text-primary">slider/thumb-border</code>.
          </>
        }
      />
      <StorySection title="Single">
        <div className="max-w-md">
          <Slider defaultValue={40} label="Single" showValue />
        </div>
      </StorySection>
      <StorySection title="Range">
        <div className="max-w-md">
          <Slider
            defaultValue={[20, 80]}
            label="Range"
            showValue
          />
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
        title="Slider — States"
        description={
          <>
            The <code className="text-text-primary">state</code> prop forces
            thumb visuals for design review.
          </>
        }
      />
      <StorySection title="States">
        <div className="flex max-w-md flex-col gap-16">
          {states.map((state) => (
            <Slider
              key={state}
              label={state}
              showValue
              defaultValue={50}
              state={state}
            />
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: function ContentStory() {
    const [single, setSingle] = useState(30);
    const [range, setRange] = useState<[number, number]>([15, 70]);

    return (
      <div className="flex flex-col gap-32 p-8">
        <StoryHeading title="Slider — Content" />
        <StorySection title="Label / value / controlled">
          <div className="flex max-w-md flex-col gap-16">
            <Slider defaultValue={50} />
            <Slider defaultValue={50} label="With label" />
            <Slider defaultValue={50} showValue />
            <Slider
              value={single}
              onValueChange={(v) => setSingle(v as number)}
              label="Controlled single"
              showValue
            />
            <Slider
              value={range}
              onValueChange={(v) => setRange(v as [number, number])}
              label="Controlled range"
              showValue
            />
            <Slider
              defaultValue={5}
              min={0}
              max={10}
              step={1}
              label="Step 1 · 0–10"
              showValue
            />
          </div>
        </StorySection>
      </div>
    );
  },
};

export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Slider — Layout" />
      <StorySection title="Full width">
        <Slider defaultValue={60} label="Volume" showValue />
      </StorySection>
      <StorySection title="Constrained">
        <div className="w-48 rounded-control border border-border-subtle bg-bg-surface p-8">
          <Slider defaultValue={40} label="Narrow" showValue />
        </div>
      </StorySection>
      <StorySection title="Stacked filters">
        <div className="flex max-w-lg flex-col gap-16">
          <Slider defaultValue={[10, 90]} label="Price" showValue />
          <Slider defaultValue={3} min={1} max={5} step={1} label="Rating" showValue />
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    defaultValue: 40,
    label: "Opacity",
    showValue: true,
    state: "default",
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="max-w-md p-8">
      <Slider {...args} />
    </div>
  ),
};
