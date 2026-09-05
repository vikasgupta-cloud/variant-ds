/**
 * Tag — five-story set: All variants · States · Content · Layout · Playground
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";
import type { TagState } from "./Tag.variants";
import {
  PlaceholderIcon,
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const states: TagState[] = ["default", "hover", "disabled"];

const meta = {
  title: "Components/Labels/Tag/Examples",
  component: Tag,
  args: {
    size: "md",
    children: "Tag",
    state: "default",
    removable: false,
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — Figma “rest” maps to default. Leave at default in production.",
    },
    icon: { control: false },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Tag — All variants"
        description="Sizes use chip padding / gap tokens. Fill is surface/level-1; hover lifts to level-2."
      />
      <StorySection title="Sizes">
        <div className="flex flex-wrap items-center gap-8">
          {sizes.map((size) => (
            <Tag key={size} size={size}>
              size {size}
            </Tag>
          ))}
        </div>
      </StorySection>
      <StorySection title="Removable">
        <div className="flex flex-wrap items-center gap-8">
          {sizes.map((size) => (
            <Tag key={size} size={size} removable>
              removable {size}
            </Tag>
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
        title="Tag — States"
        description="Forced via the state prop for design review (rest → default)."
      />
      <StorySection title="Default / hover / disabled">
        <div className="flex flex-wrap gap-8">
          {states.map((state) => (
            <Tag key={state} state={state} removable>
              {state}
            </Tag>
          ))}
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
      <StoryHeading title="Tag — Content" />
      <StorySection title="Label / icon / removable">
        <div className="flex flex-wrap items-center gap-8">
          <Tag>Label only</Tag>
          <Tag icon={<PlaceholderIcon />}>With icon</Tag>
          <Tag removable>Removable</Tag>
          <Tag icon={<PlaceholderIcon />} removable>
            Icon + remove
          </Tag>
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
      <StoryHeading title="Tag — Layout" />
      <StorySection title="Filter chip row">
        <div className="flex flex-wrap gap-8">
          {["Audience", "Device", "Geo", "Schedule"].map((label) => (
            <Tag key={label} removable>
              {label}
            </Tag>
          ))}
        </div>
      </StorySection>
      <StorySection title="Narrow wrap">
        <div className="w-48">
          <div className="flex flex-wrap gap-8">
            <Tag size="sm">Alpha</Tag>
            <Tag size="sm">Beta</Tag>
            <Tag size="sm" removable>
              Gamma
            </Tag>
            <Tag size="sm">Delta</Tag>
          </div>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    size: "md",
    children: "Campaign",
    removable: true,
    icon: <PlaceholderIcon />,
  },
};
