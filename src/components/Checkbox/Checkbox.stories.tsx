/**
 * Checkbox — five-story set: All variants · States · Content · Layout · Playground
 * States story includes size × states matrix.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxGroup } from "./Checkbox";
import type { CheckboxState } from "./Checkbox.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const states: CheckboxState[] = [
  "default",
  "unchecked",
  "checked",
  "indeterminate",
  "disabled",
  "focused",
  "error",
];

const meta = {
  title: "Components/Forms and input/Checkbox/Examples",
  component: Checkbox,
  args: {
    size: "md",
    label: "Accept terms",
    state: "default",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state. Leave at default in production.",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Checkbox — All variants"
        description="Sizes use checkbox-size tokens. Checked fill is selected/bg with selected/edge."
      />
      <StorySection title="Sizes">
        <div className="flex flex-col gap-16">
          {sizes.map((size) => (
            <Checkbox
              key={size}
              size={size}
              defaultChecked
              label={`Size ${size}`}
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
        title="Checkbox — States"
        description="Size × state matrix. Forced via the state prop for design review."
      />
      <StorySection title="Size × states">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-8 text-text-tertiary">Size</th>
                {states.map((state) => (
                  <th key={state} className="p-8 font-medium text-text-secondary">
                    {state}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size} className="border-t border-border-subtle">
                  <td className="p-8 text-text-tertiary">{size}</td>
                  {states.map((state) => (
                    <td key={state} className="p-8">
                      <Checkbox size={size} state={state} aria-label={state} />
                    </td>
                  ))}
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
      <StoryHeading title="Checkbox — Content" />
      <StorySection title="Control only / label / description / indeterminate / error">
        <div className="flex flex-col gap-16">
          <Checkbox aria-label="Standalone" defaultChecked />
          <Checkbox label="With label" />
          <Checkbox
            label="With description"
            description="Helper copy sits under the label."
            defaultChecked
          />
          <Checkbox
            label="Indeterminate"
            checked="indeterminate"
            description="Partial selection in a group."
          />
          <Checkbox
            label="Error"
            state="error"
            description="Required before continuing."
          />
        </div>
      </StorySection>
      <StorySection title="CheckboxGroup orientations">
        <div className="flex flex-col gap-24">
          <CheckboxGroup orientation="vertical" className="max-w-sm">
            <Checkbox label="Email" description="Campaign digests" defaultChecked />
            <Checkbox label="Push" description="Real-time alerts" />
            <Checkbox label="SMS" disabled />
          </CheckboxGroup>
          <CheckboxGroup orientation="horizontal">
            <Checkbox label="Day" defaultChecked />
            <Checkbox label="Week" />
            <Checkbox label="Month" />
          </CheckboxGroup>
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
      <StoryHeading title="Checkbox — Layout" />
      <StorySection title="Grouped in a panel">
        <div className="max-w-sm rounded-control border border-border-subtle bg-bg-surface p-16">
          <CheckboxGroup orientation="vertical">
            <Checkbox label="Email" description="Campaign digests" defaultChecked />
            <Checkbox label="Push" description="Real-time alerts" />
            <Checkbox label="SMS" description="Critical only" disabled />
          </CheckboxGroup>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    size: "md",
    label: "Subscribe to updates",
    description: "You can change this later in settings.",
    defaultChecked: true,
  },
};
