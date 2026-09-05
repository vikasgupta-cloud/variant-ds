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

/** Size + composition type grid. */
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
            (context-aware). Composition <code className="text-text-primary">type</code>{" "}
            covers Figma field chrome. Zero component tokens.
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
      <StorySection title="Composition types">
        <div className="flex max-w-lg flex-col gap-16">
          <Input type="default" label="default" placeholder="Plain field" />
          <Input
            type="icon-leading"
            label="icon-leading"
            prefixIcon={<SearchIcon />}
            placeholder="Search…"
          />
          <Input
            type="leading-text"
            label="leading-text"
            leadingText="https://"
            placeholder="example.com"
          />
          <Input
            type="trailing-button"
            label="trailing-button"
            placeholder="Invite email"
            trailingButton={
              <Button size="sm" hierarchy="secondary">
                Send
              </Button>
            }
          />
          <Input
            type="leading-dropdown"
            label="leading-dropdown"
            placeholder="Amount"
            leadingDropdown={
              <button
                type="button"
                className="inline-flex items-center gap-control-gap-sm text-text-primary"
              >
                USD <ChevronIcon />
              </button>
            }
          />
          <Input
            type="trailing-dropdown"
            label="trailing-dropdown"
            placeholder="Domain"
            trailingDropdown={
              <button
                type="button"
                className="inline-flex items-center gap-control-gap-sm text-text-primary"
              >
                .com <ChevronIcon />
              </button>
            }
          />
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

/** Content permutations: types, helpIcon, characterCount, icons, clearable. */
export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: function ContentStory() {
    const [clearableValue, setClearableValue] = useState("Clear me");
    const [counted, setCounted] = useState("Hello");

    return (
      <div className="flex flex-col gap-32 p-8">
        <StoryHeading title="Input — Content" />

        <StorySection title="Help icon beside label">
          <div className="flex max-w-md flex-col gap-16">
            <Input
              label="Campaign name"
              helpIcon="Shown in reports and the campaign list."
              placeholder="Summer launch"
            />
            <Input
              label="API key"
              helpIcon
              helperText="Rotate keys every 90 days."
              placeholder="sk_…"
            />
          </div>
        </StorySection>

        <StorySection title="Character count">
          <div className="flex max-w-md flex-col gap-16">
            <Input
              label="Headline"
              value={counted}
              onChange={(e) => setCounted(e.target.value)}
              characterCount={20}
              placeholder="Max 20"
            />
            <Input
              label="Over limit"
              defaultValue="This string is definitely too long"
              characterCount={12}
            />
          </div>
        </StorySection>

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
          </div>
        </StorySection>

        <StorySection title="Composition types">
          <div className="flex max-w-lg flex-col gap-16">
            <Input
              type="icon-leading"
              label="Search"
              prefixIcon={<SearchIcon />}
              placeholder="Search…"
            />
            <Input
              type="leading-text"
              label="Website"
              leadingText="https://"
              placeholder="example.com"
            />
            <Input
              type="trailing-button"
              label="Invite"
              placeholder="name@company.com"
              trailingButton={
                <Button size="sm" hierarchy="secondary">
                  Invite
                </Button>
              }
            />
            <Input
              type="leading-dropdown"
              label="Price"
              placeholder="0.00"
              leadingDropdown={
                <button
                  type="button"
                  className="inline-flex items-center gap-control-gap-sm"
                >
                  USD <ChevronIcon />
                </button>
              }
            />
            <Input
              type="trailing-dropdown"
              label="Handle"
              placeholder="acme"
              trailingDropdown={
                <button
                  type="button"
                  className="inline-flex items-center gap-control-gap-sm"
                >
                  .com <ChevronIcon />
                </button>
              }
            />
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
