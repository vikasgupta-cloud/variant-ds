/**
 * Tooltip — five-story set: All variants · States · Content · Layout · Playground
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { StoryHeading, StorySection } from "../../stories/kit";

const meta = {
  title: "Components/Messaging/Tooltip/Examples",
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Tooltip — All variants"
        description="Inverse surface (bg/tooltip) with text/on-inverse. Trigger any focusable or asChild element."
      />
      <StorySection title="Sides">
        <div className="flex flex-wrap items-center gap-24 p-32">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side} side={side} content={`Side: ${side}`}>
              <Button hierarchy="secondary">{side}</Button>
            </Tooltip>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Tooltip — States" />
      <StorySection title="Default open (design review)">
        <Tooltip content="Always visible for review" defaultOpen>
          <Button hierarchy="secondary">Hover or focus</Button>
        </Tooltip>
      </StorySection>
    </div>
  ),
};

export const Content: Story = {
  name: "Content",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Tooltip — Content" />
      <StorySection title="Icon trigger · button · long copy">
        <div className="flex flex-wrap items-center gap-24">
          <Tooltip content="What is this field?">
            <button
              type="button"
              className="inline-flex rounded-control text-icon-secondary hover:text-icon-primary focus-visible:outline focus-visible:outline-border-focus focus-visible:outline-[length:var(--focus-ring-width)]"
              aria-label="Help"
            >
              <Icon name="question" size="sm" />
            </button>
          </Tooltip>
          <Tooltip content="Save your changes">
            <Button>Save</Button>
          </Tooltip>
          <Tooltip content="Tooltips wrap within max-width so longer help text stays readable without covering the whole canvas.">
            <Button hierarchy="ghost">Long help</Button>
          </Tooltip>
        </div>
      </StorySection>
    </div>
  ),
};

export const Layout: Story = {
  name: "Layout",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Tooltip — Layout" />
      <StorySection title="Beside a label">
        <div className="flex items-center gap-control-gap-sm">
          <span className="type-body-md-medium text-text-primary">Campaign name</span>
          <Tooltip content="Shown in reports and the campaign list.">
            <button
              type="button"
              className="inline-flex rounded-control text-icon-secondary hover:text-icon-primary focus-visible:outline focus-visible:outline-border-focus focus-visible:outline-[length:var(--focus-ring-width)]"
              aria-label="Help"
            >
              <Icon name="question" size="sm" />
            </button>
          </Tooltip>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    content: "Tooltip copy",
    side: "top",
  },
  render: (args: { content?: string; side?: "top" | "right" | "bottom" | "left" }) => (
    <div className="flex items-center justify-center p-32">
      <Tooltip content={args.content ?? "Tooltip"} side={args.side ?? "top"}>
        <Button hierarchy="secondary">Trigger</Button>
      </Tooltip>
    </div>
  ),
};
