/**
 * Toggle — five-story set: All variants · States · Content · Layout · Playground
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle";
import type { ToggleState } from "./Toggle.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const states: ToggleState[] = ["default", "off", "on", "disabled", "focused"];

const meta = {
  title: "Components/Forms and input/Toggle/Examples",
  component: Toggle,
  args: {
    size: "md",
    label: "Enable feature",
    state: "default",
    labelPosition: "end",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    labelPosition: { control: "select", options: ["start", "end"] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state. Leave at default in production.",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Toggle — All variants"
        description="Sizes use toggle-track / knob tokens. On fill is bg/neutral/strong."
      />
      <StorySection title="Sizes">
        <div className="flex flex-col gap-16">
          {sizes.map((size) => (
            <Toggle
              key={size}
              size={size}
              defaultChecked
              label={`Size ${size}`}
            />
          ))}
        </div>
      </StorySection>
      <StorySection title="Off / On">
        <div className="flex flex-col gap-16">
          <Toggle label="Off" />
          <Toggle label="On" defaultChecked />
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
        title="Toggle — States"
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
                      <Toggle size={size} state={state} aria-label={state} />
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
      <StoryHeading title="Toggle — Content" />
      <StorySection title="Control only / label / description / position">
        <div className="flex flex-col gap-16">
          <Toggle aria-label="Standalone" defaultChecked />
          <Toggle label="With label" />
          <Toggle
            label="With description"
            description="Helper copy sits under the label."
            defaultChecked
          />
          <Toggle
            label="Label at start"
            labelPosition="start"
            description="labelPosition=&quot;start&quot;"
            defaultChecked
          />
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
      <StoryHeading title="Toggle — Layout" />
      <StorySection title="Settings list">
        <div className="flex max-w-sm flex-col gap-12 rounded-control border border-border-subtle bg-bg-surface p-16">
          <Toggle
            label="Email digests"
            description="Weekly campaign summary"
            defaultChecked
          />
          <Toggle label="Push alerts" description="Real-time notifications" />
          <Toggle
            label="SMS"
            description="Critical only"
            disabled
            defaultChecked
          />
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    size: "md",
    label: "Airplane mode",
    description: "Disable radios and networking.",
    defaultChecked: false,
    labelPosition: "end",
  },
};
