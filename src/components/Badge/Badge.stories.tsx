/**
 * Badge — five-story set: All variants · States · Content · Layout · Playground
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import type { BadgeRole, BadgeState } from "./Badge.variants";
import {
  PlaceholderIcon,
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const roles: BadgeRole[] = [
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
  "ai",
];
const emphases = ["soft", "strong"] as const;
const sizes = ["sm", "md", "lg"] as const;
const states: BadgeState[] = ["default", "disabled"];

const meta = {
  title: "Components/Labels/Badge/Examples",
  component: Badge,
  args: {
    role: "neutral",
    emphasis: "soft",
    size: "md",
    children: "Badge",
    state: "default",
  },
  argTypes: {
    role: { control: "select", options: [...roles] },
    emphasis: { control: "select", options: [...emphases] },
    size: { control: "select", options: [...sizes] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state. Leave at default in production.",
    },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Badge — All variants"
        description="Role × emphasis × size. Soft uses role fill + text + border; strong uses on-strong (warning → on-strong-warning; neutral → on-inverse)."
      />
      <StorySection title="Role × emphasis">
        <div className="flex flex-wrap gap-8">
          {roles.map((role) =>
            emphases.map((emphasis) => (
              <Badge key={`${role}-${emphasis}`} role={role} emphasis={emphasis}>
                {role} / {emphasis}
              </Badge>
            )),
          )}
        </div>
      </StorySection>
      <StorySection title="Sizes">
        <div className="flex flex-wrap items-center gap-8">
          {sizes.map((size) => (
            <Badge key={size} size={size} role="info">
              size {size}
            </Badge>
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
        title="Badge — States"
        description="Badge is non-interactive. Disabled is available for design review."
      />
      <StorySection title="Default / disabled">
        <div className="flex flex-wrap gap-8">
          <Badge role="info">Default</Badge>
          <Badge role="info" state="disabled">
            Disabled
          </Badge>
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
      <StoryHeading title="Badge — Content" />
      <StorySection title="Label / dot / icon / count">
        <div className="flex flex-wrap items-center gap-8">
          <Badge role="neutral">Label</Badge>
          <Badge role="success" dot>
            With dot
          </Badge>
          <Badge role="ai" icon={<PlaceholderIcon />}>
            With icon
          </Badge>
          <Badge role="danger" count={3} />
          <Badge role="info" count={12}>
            Inbox
          </Badge>
          <Badge role="warning" emphasis="strong" count="99+" />
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
      <StoryHeading title="Badge — Layout" />
      <StorySection title="Inline with text">
        <p className="text-sm text-text-primary">
          Campaign status{" "}
          <Badge role="success" size="sm">
            Live
          </Badge>{" "}
          and AI assist{" "}
          <Badge role="ai" size="sm" emphasis="strong">
            On
          </Badge>
        </p>
      </StorySection>
      <StorySection title="Stacked list">
        <ul className="flex max-w-xs flex-col gap-8">
          {roles.map((role) => (
            <li
              key={role}
              className="flex items-center justify-between gap-16 text-sm text-text-primary"
            >
              <span className="capitalize">{role}</span>
              <Badge role={role} size="sm">
                {role}
              </Badge>
            </li>
          ))}
        </ul>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    role: "warning",
    emphasis: "soft",
    size: "md",
    children: "Paused",
    dot: true,
  },
};
