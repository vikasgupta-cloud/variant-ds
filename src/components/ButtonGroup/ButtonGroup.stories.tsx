/**
 * ButtonGroup — five-story set: All variants · States · Content · Layout · Playground
 * Single / multiple select, 2–5 items, icon-only.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup, ButtonGroupItem } from "./ButtonGroup";
import type { ButtonGroupItemState } from "./ButtonGroup.variants";
import {
  PlaceholderIcon,
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const itemStates: ButtonGroupItemState[] = ["default", "hover", "disabled"];

const meta = {
  title: "Components/Forms and input/Button group/Examples",
  component: ButtonGroup,
  args: {
    size: "md",
    type: "single",
    iconOnly: false,
    defaultValue: "day",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    type: { control: "select", options: ["single", "multiple"] },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="ButtonGroup — All variants"
        description="Segment chrome uses segment-radius tokens. Selected fill is selected/bg (yellow wayfinding)."
      />
      <StorySection title="Sizes (single)">
        <div className="flex flex-col gap-16">
          {sizes.map((size) => (
            <ButtonGroup key={size} size={size} type="single" defaultValue="b">
              <ButtonGroupItem value="a">Day</ButtonGroupItem>
              <ButtonGroupItem value="b">Week</ButtonGroupItem>
              <ButtonGroupItem value="c">Month</ButtonGroupItem>
            </ButtonGroup>
          ))}
        </div>
      </StorySection>
      <StorySection title="Multiple select">
        <ButtonGroup type="multiple" defaultValue={["bold", "italic"]}>
          <ButtonGroupItem value="bold">Bold</ButtonGroupItem>
          <ButtonGroupItem value="italic">Italic</ButtonGroupItem>
          <ButtonGroupItem value="underline">Underline</ButtonGroupItem>
        </ButtonGroup>
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
        title="ButtonGroup — States"
        description="Item design-review states. Selected uses Radix data-state=on."
      />
      <StorySection title="Size × item state">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-8 text-text-tertiary">Size</th>
                {itemStates.map((state) => (
                  <th key={state} className="p-8 font-medium text-text-secondary">
                    {state}
                  </th>
                ))}
                <th className="p-8 font-medium text-text-secondary">selected</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-t border-border-subtle">
                  <td className="p-8 text-text-tertiary">{size}</td>
                  {itemStates.map((state) => (
                    <td key={state} className="p-8">
                      <ButtonGroup size={size} type="single" defaultValue="">
                        <ButtonGroupItem value="x" state={state}>
                          Item
                        </ButtonGroupItem>
                        <ButtonGroupItem value="y">Next</ButtonGroupItem>
                      </ButtonGroup>
                    </td>
                  ))}
                  <td className="p-8">
                    <ButtonGroup size={size} type="single" defaultValue="x">
                      <ButtonGroupItem value="x">On</ButtonGroupItem>
                      <ButtonGroupItem value="y">Off</ButtonGroupItem>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <StoryHeading title="ButtonGroup — Content" />
      <StorySection title="2–5 text items">
        <div className="flex flex-col gap-16">
          <ButtonGroup type="single" defaultValue="1">
            <ButtonGroupItem value="1">One</ButtonGroupItem>
            <ButtonGroupItem value="2">Two</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup type="single" defaultValue="2">
            <ButtonGroupItem value="1">One</ButtonGroupItem>
            <ButtonGroupItem value="2">Two</ButtonGroupItem>
            <ButtonGroupItem value="3">Three</ButtonGroupItem>
            <ButtonGroupItem value="4">Four</ButtonGroupItem>
            <ButtonGroupItem value="5">Five</ButtonGroupItem>
          </ButtonGroup>
        </div>
      </StorySection>
      <StorySection title="Icon-only">
        <ButtonGroup type="single" iconOnly defaultValue="list">
          <ButtonGroupItem value="list" icon={<PlaceholderIcon />}>
            List
          </ButtonGroupItem>
          <ButtonGroupItem value="grid" icon={<PlaceholderIcon />}>
            Grid
          </ButtonGroupItem>
          <ButtonGroupItem value="board" icon={<PlaceholderIcon />}>
            Board
          </ButtonGroupItem>
        </ButtonGroup>
      </StorySection>
      <StorySection title="Icon + label">
        <ButtonGroup type="single" defaultValue="a">
          <ButtonGroupItem value="a" icon={<PlaceholderIcon />}>
            List
          </ButtonGroupItem>
          <ButtonGroupItem value="b" icon={<PlaceholderIcon />}>
            Grid
          </ButtonGroupItem>
        </ButtonGroup>
      </StorySection>
    </div>
  ),
};

export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="ButtonGroup — Layout" />
      <StorySection title="Toolbar row">
        <div className="flex flex-wrap items-center gap-12 rounded-control border border-border-subtle bg-bg-surface p-16">
          <ButtonGroup type="single" defaultValue="day" size="sm">
            <ButtonGroupItem value="day">Day</ButtonGroupItem>
            <ButtonGroupItem value="week">Week</ButtonGroupItem>
            <ButtonGroupItem value="month">Month</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup type="multiple" size="sm" defaultValue={["b"]}>
            <ButtonGroupItem value="b" icon={<PlaceholderIcon />}>
              Bold
            </ButtonGroupItem>
            <ButtonGroupItem value="i" icon={<PlaceholderIcon />}>
              Italic
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="day">Day</ButtonGroupItem>
      <ButtonGroupItem value="week">Week</ButtonGroupItem>
      <ButtonGroupItem value="month">Month</ButtonGroupItem>
    </ButtonGroup>
  ),
};
