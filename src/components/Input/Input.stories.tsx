/**
 * Input — five-story set: All variants · States · Content · Layout · Playground
 * Mode/Context from toolbar. `state` forces visuals for design review.
 */
import { useState, type ChangeEvent, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import type { InputState } from "./Input.variants";
import { Button } from "../Button";
import {
  ChevronIcon,
  PlaceholderIcon,
  SearchIcon,
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const states: InputState[] = [
  "default",
  "hover",
  "focused",
  "disabled",
  "read-only",
  "error",
];

const meta = {
  title: "Components/Forms and input/Input/Examples",
  component: Input,
  args: {
    label: "Email",
    placeholder: "you@company.com",
    size: "md",
    state: "default",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state to match Figma. Leave at default in production.",
    },
    prefixIcon: { control: false },
    suffixIcon: { control: false },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Size grid (Input has no visual variants beyond size). */
export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Input — All variants"
        description={
          <>
            Field fill uses <code className="text-text-primary">surface/field</code>{" "}
            (context-aware). Zero component tokens.
          </>
        }
      />
      <StorySection title="Sizes">
        <div className="flex max-w-md flex-col gap-16">
          {sizes.map((size) => (
            <Input
              key={size}
              size={size}
              label={`Size ${size}`}
              placeholder="Placeholder"
            />
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

/** Size × state grid via the state prop (Figma State dropdown parity). */
export const States: Story = {
  name: "States",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Input — States"
        description={
          <>
            The <code className="text-text-primary">state</code> prop forces
            visual treatment for design review. It is not for production — real
            apps leave it at <code className="text-text-primary">default</code>{" "}
            and let CSS handle interaction. Input has no loading state.
          </>
        }
      />
      <StorySection title="Sizes × states">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-4 text-xs font-medium text-text-tertiary">
                  Size
                </th>
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
              {sizes.map((size) => (
                <tr
                  key={size}
                  className="border-t border-border-subtle align-top"
                >
                  <td className="p-4 font-mono text-xs text-text-secondary">
                    {size}
                  </td>
                  {states.map((state) => (
                    <td key={state} className="min-w-40 p-4">
                      <Input
                        size={size}
                        label={state}
                        placeholder="Placeholder"
                        state={state}
                        {...(state === "disabled" || state === "read-only"
                          ? { defaultValue: state }
                          : {})}
                        {...(state === "error"
                          ? {
                              defaultValue: "Invalid",
                              errorMessage: "Fix this field.",
                            }
                          : {})}
                      />
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

/** Content permutations: icons, clearable, helper, error, long label. */
export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: function ContentStory() {
    const [clearableValue, setClearableValue] = useState("Clear me");

    return (
      <div className="flex flex-col gap-32 p-8">
        <StoryHeading title="Input — Content" />

        <StorySection title="Label and helper">
          <div className="flex max-w-md flex-col gap-16">
            <Input label="With label" placeholder="…" />
            <Input
              label="With helper"
              helperText="We’ll never share this."
              placeholder="…"
            />
            <Input
              label="With error"
              defaultValue="bad@"
              errorMessage="Enter a valid email."
            />
            <Input
              label="A very long label that wraps or truncates depending on layout constraints"
              placeholder="…"
            />
          </div>
        </StorySection>

        <StorySection title="Prefix / suffix icons">
          <div className="flex max-w-md flex-col gap-16">
            <Input
              label="Leading icon"
              prefixIcon={<SearchIcon />}
              placeholder="Search…"
            />
            <Input
              label="Trailing icon"
              suffixIcon={<ChevronIcon />}
              placeholder="Select…"
            />
            <Input
              label="Both icons"
              prefixIcon={<PlaceholderIcon />}
              suffixIcon={<ChevronIcon />}
              placeholder="…"
            />
            <Input label="Label only" placeholder="No icons" />
          </div>
        </StorySection>

        <StorySection title="Clearable">
          <div className="max-w-md">
            <Input
              label="Clearable"
              value={clearableValue}
              onChange={(e) => setClearableValue(e.target.value)}
              clearable
              onClear={() => setClearableValue("")}
            />
          </div>
        </StorySection>

        <StorySection title="Icons × sizes">
          <div className="overflow-x-auto">
            <table className="border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="p-4 text-xs font-medium text-text-tertiary">
                    Placement
                  </th>
                  {sizes.map((s) => (
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
                {(
                  [
                    ["prefix", { prefixIcon: <SearchIcon /> }],
                    ["suffix", { suffixIcon: <ChevronIcon /> }],
                    [
                      "both",
                      {
                        prefixIcon: <SearchIcon />,
                        suffixIcon: <ChevronIcon />,
                      },
                    ],
                  ] as const
                ).map(([label, icons]) => (
                  <tr
                    key={label}
                    className="border-t border-border-subtle align-top"
                  >
                    <td className="p-4 font-mono text-xs text-text-secondary">
                      {label}
                    </td>
                    {sizes.map((size) => (
                      <td key={size} className="min-w-40 p-4">
                        <Input
                          size={size}
                          label={label}
                          placeholder="…"
                          {...icons}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StorySection>
      </div>
    );
  },
};

/** Layout contexts: full width, inline row, constrained, form row. */
export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Input — Layout" />

      <StorySection title="Full width">
        <Input label="Full width field" placeholder="Stretches to parent" />
      </StorySection>

      <StorySection title="Inline in a row">
        <div className="flex flex-wrap items-end gap-8">
          <div className="w-48">
            <Input label="First" placeholder="…" />
          </div>
          <div className="w-48">
            <Input label="Second" placeholder="…" />
          </div>
          <div className="w-48">
            <Input label="Third" placeholder="…" />
          </div>
        </div>
      </StorySection>

      <StorySection title="Inside a constrained container">
        <div className="w-64 rounded-control border border-border-subtle bg-bg-surface p-8">
          <Input size="sm" label="Narrow panel" placeholder="…" />
        </div>
      </StorySection>

      <StorySection title="Form row alongside other components">
        <div className="flex max-w-xl flex-wrap items-end gap-8">
          <div className="min-w-0 flex-1">
            <Input label="Audience name" placeholder="Power users" />
          </div>
          <Button>Add</Button>
          <Button hierarchy="secondary">Cancel</Button>
        </div>
      </StorySection>
    </div>
  ),
};

type PlaygroundArgs = ComponentProps<typeof Input> & {
  showPrefixIcon?: boolean;
  showSuffixIcon?: boolean;
};

/** Single interactive instance — all props as controls, including state. */
export const Playground = {
  name: "Playground",
  args: {
    label: "Email",
    placeholder: "you@company.com",
    size: "md",
    state: "default" as const,
    helperText: "",
    errorMessage: "",
    disabled: false,
    readOnly: false,
    clearable: false,
    showPrefixIcon: false,
    showSuffixIcon: false,
  },
  argTypes: {
    showPrefixIcon: { control: "boolean", name: "prefixIcon" },
    showSuffixIcon: { control: "boolean", name: "suffixIcon" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    clearable: { control: "boolean" },
    state: { control: "select", options: [...states] },
  },
  render: function PlaygroundStory(args: PlaygroundArgs) {
    const {
      showPrefixIcon,
      showSuffixIcon,
      clearable,
      helperText,
      errorMessage,
      ...rest
    } = args;
    const [value, setValue] = useState("");

    return (
      <div className="max-w-md">
        <Input
          {...rest}
          {...(helperText ? { helperText } : {})}
          {...(errorMessage ? { errorMessage } : {})}
          {...(clearable
            ? {
                value,
                clearable: true,
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value),
                onClear: () => setValue(""),
              }
            : {})}
          {...(showPrefixIcon ? { prefixIcon: <SearchIcon /> } : {})}
          {...(showSuffixIcon ? { suffixIcon: <ChevronIcon /> } : {})}
        />
      </div>
    );
  },
} satisfies StoryObj<PlaygroundArgs>;
