/**
 * Select — form value picker. Five-story set. `state` forces open/item visuals for design review.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./index";
import type { DropdownState } from "./Dropdown.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const states: DropdownState[] = [
  "default",
  "closed",
  "open",
  "item-hover",
  "item-selected",
  "item-disabled",
];

const meta = {
  title: "Components/Forms and input/Select/Examples",
  args: {
    state: "default" as DropdownState,
  },
  argTypes: {
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces open/item visuals. Leave at default in production.",
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Select — All variants"
        description={
          <>
            Form control for choosing a single value. Panels use surface-raised;
            items highlight with surface levels.
          </>
        }
      />
      <StorySection title="Default">
        <div className="max-w-xs">
          <Select label="Workspace" defaultValue="prod">
            <SelectTrigger aria-label="Workspace">
              <SelectValue placeholder="Choose…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prod">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="dev">Development</SelectItem>
            </SelectContent>
          </Select>
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
        title="Select — States"
        description={
          <>
            The <code className="text-text-primary">state</code> prop forces
            closed / open / item visuals for design review. Not for production.
          </>
        }
      />
      <StorySection title="Select × states">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                {states.map((s) => (
                  <th
                    key={s}
                    className="p-4 text-xs font-medium text-text-tertiary"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border-subtle align-top">
                {states.map((state) => (
                  <td key={state} className="min-w-48 p-4">
                    <Select
                      label={state}
                      state={state}
                      {...(state === "item-selected"
                        ? { defaultValue: "b" }
                        : {})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Alpha</SelectItem>
                        <SelectItem value="b">Beta</SelectItem>
                        <SelectItem value="c" disabled>
                          Gamma
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                ))}
              </tr>
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
      <StoryHeading title="Select — Content" />
      <StorySection title="Grouped + descriptions">
        <div className="max-w-xs">
          <Select label="Region" defaultValue="eu-west">
            <SelectTrigger>
              <SelectValue placeholder="Choose region…" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="eu-west" description="Frankfurt — primary EU">
                  EU West
                </SelectItem>
                <SelectItem value="eu-north" description="Stockholm">
                  EU North
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="us-east" description="N. Virginia">
                  US East
                </SelectItem>
                <SelectItem value="us-west" disabled description="Unavailable">
                  US West
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
      <StoryHeading title="Select — Layout" />
      <StorySection title="Form row">
        <div className="max-w-xs">
          <Select label="Audience" defaultValue="all">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All users</SelectItem>
              <SelectItem value="power">Power users</SelectItem>
              <SelectItem value="new">New users</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </StorySection>
      <StorySection title="Constrained panel">
        <div className="w-64 rounded-control border border-border-subtle bg-bg-surface p-8">
          <Select label="Sort">
            <SelectTrigger>
              <SelectValue placeholder="Sort by…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: StoryObj<{
  state: DropdownState;
  label: string;
}> = {
  name: "Playground",
  args: {
    state: "default",
    label: "Workspace",
  },
  argTypes: {
    state: { control: "select", options: [...states] },
    label: { control: "text" },
  },
  render: function PlaygroundStory(args) {
    const { state = "default", label } = args;
    return (
      <div className="flex flex-col gap-16 p-8">
        <div className="max-w-xs">
          <Select
            {...(label ? { label: String(label) } : {})}
            state={state}
            defaultValue="prod"
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="prod">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="dev" disabled>
                Development
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
};
