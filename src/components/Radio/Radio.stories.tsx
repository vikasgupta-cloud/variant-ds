/**
 * Radio — five-story set: All variants · States · Content · Layout · Playground
 * Includes RadioGroup orientation demos.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioItem } from "./Radio";
import type { RadioState } from "./Radio.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const states: RadioState[] = [
  "default",
  "unselected",
  "selected",
  "disabled",
  "focused",
  "error",
];

const meta = {
  title: "Components/Forms and input/Radio/Examples",
  component: RadioItem,
  args: {
    size: "md",
    label: "Option",
    value: "a",
    state: "default",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state on the item. Leave at default in production.",
    },
  },
  decorators: [
    (Story) => (
      <RadioGroup defaultValue="a">
        <Story />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof RadioItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Radio — All variants"
        description="Sizes use radio-size / radio-dot-size tokens. Selected fill is selected/bg with selected/edge."
      />
      <StorySection title="Sizes">
        <div className="flex flex-col gap-16">
          {sizes.map((size) => (
            <RadioGroup key={size} size={size} defaultValue="a">
              <RadioItem value="a" label={`Size ${size} — A`} />
              <RadioItem value="b" label={`Size ${size} — B`} />
            </RadioGroup>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Radio — States"
        description="Size × state matrix. Forced via the item state prop for design review."
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
                      <RadioGroup size={size}>
                        <RadioItem
                          value={`${size}-${state}`}
                          state={state}
                          aria-label={state}
                        />
                      </RadioGroup>
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
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Radio — Content" />
      <StorySection title="Labels, descriptions, error">
        <RadioGroup defaultValue="standard" className="max-w-sm">
          <RadioItem
            value="standard"
            label="Standard"
            description="Default delivery window."
          />
          <RadioItem
            value="express"
            label="Express"
            description="Arrives one day sooner."
          />
          <RadioItem
            value="pickup"
            label="Pickup"
            description="Unavailable in your region."
            disabled
          />
          <RadioItem
            value="invalid"
            label="Needs attention"
            description="Select a valid option."
            state="error"
          />
        </RadioGroup>
      </StorySection>
      <StorySection title="Group orientations">
        <div className="flex flex-col gap-24">
          <RadioGroup orientation="vertical" defaultValue="one">
            <RadioItem value="one" label="One" />
            <RadioItem value="two" label="Two" />
          </RadioGroup>
          <RadioGroup orientation="horizontal" defaultValue="day">
            <RadioItem value="day" label="Day" />
            <RadioItem value="week" label="Week" />
            <RadioItem value="month" label="Month" />
          </RadioGroup>
        </div>
      </StorySection>
    </div>
  ),
};

export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  decorators: [],
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Radio — Layout" />
      <StorySection title="Vertical group">
        <RadioGroup orientation="vertical" defaultValue="one">
          <RadioItem value="one" label="One" />
          <RadioItem value="two" label="Two" />
          <RadioItem value="three" label="Three" />
        </RadioGroup>
      </StorySection>
      <StorySection title="Horizontal group">
        <RadioGroup orientation="horizontal" defaultValue="day">
          <RadioItem value="day" label="Day" />
          <RadioItem value="week" label="Week" />
          <RadioItem value="month" label="Month" />
        </RadioGroup>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  decorators: [],
  render: (args) => (
    <RadioGroup
      defaultValue={String(args.value ?? "a")}
      {...(args.size ? { size: args.size } : {})}
    >
      <RadioItem
        value="a"
        label={args.label ?? "Option A"}
        {...(args.state ? { state: args.state } : {})}
        {...(args.size ? { size: args.size } : {})}
      />
      <RadioItem
        value="b"
        label="Option B"
        {...(args.size ? { size: args.size } : {})}
      />
      <RadioItem
        value="c"
        label="Option C"
        disabled
        {...(args.size ? { size: args.size } : {})}
      />
    </RadioGroup>
  ),
};
