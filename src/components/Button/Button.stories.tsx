/**
 * Button — five-story set: All variants · States · Content · Layout · Playground
 * Matrix is hierarchy × colour (allowed pairs only). Mode/Context from toolbar.
 * `state` forces visual treatment for design review (Figma State dropdown parity).
 */
import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "./Button";
import {
  BUTTON_COLOR_BY_HIERARCHY,
  isColorAllowedForHierarchy,
  type ButtonHierarchy,
  type ButtonState,
} from "./Button.variants";
import { Input } from "../Input";
import {
  ChevronIcon,
  PlaceholderIcon,
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const hierarchies = Object.keys(
  BUTTON_COLOR_BY_HIERARCHY,
) as ButtonHierarchy[];
const sizes = ["xs", "sm", "md", "lg"] as const;
const icons = ["none", "leading", "trailing", "only"] as const;
const states: ButtonState[] = [
  "default",
  "hover",
  "active",
  "focused",
  "disabled",
];

type Pair = { hierarchy: ButtonHierarchy; color: string; label: string };

const allowedPairs: Pair[] = hierarchies.flatMap((hierarchy) =>
  BUTTON_COLOR_BY_HIERARCHY[hierarchy].map((color) => ({
    hierarchy,
    color,
    label: `${hierarchy} / ${color}`,
  })),
);

const meta = {
  title: "Components/Forms and input/Button/Examples",
  component: Button,
  args: {
    children: "Button",
    hierarchy: "primary",
    color: "default",
    size: "md",
    icon: "none",
    state: "default",
  },
  argTypes: {
    hierarchy: { control: "select", options: [...hierarchies] },
    color: {
      control: "select",
      options: [...BUTTON_COLOR_BY_HIERARCHY.primary],
    },
    size: { control: "select", options: [...sizes] },
    icon: { control: "select", options: [...icons] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state to match Figma. Leave at default in production.",
    },
    iconNode: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hierarchy × colour matrix at md; size strip for primary/default. */
export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Button — All variants"
        description={
          <>
            Hierarchy and colour are independent axes. Primary is restricted to
            default / destructive / ai — status colours describe states, not
            actions. Primary fill uses{" "}
            <code className="text-text-primary">bg/neutral/strong</code>, not
            brand yellow.
          </>
        }
      />
      <StorySection title="Hierarchy × colour">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-4 text-xs font-medium text-text-tertiary">
                  Hierarchy
                </th>
                {(
                  [
                    "default",
                    "destructive",
                    "warning",
                    "success",
                    "info",
                    "ai",
                  ] as const
                ).map((c) => (
                  <th
                    key={c}
                    className="p-4 text-xs font-medium text-text-tertiary"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hierarchies.map((hierarchy) => (
                <tr key={hierarchy} className="border-t border-border-subtle">
                  <td className="p-4 font-mono text-xs text-text-secondary">
                    {hierarchy}
                  </td>
                  {(
                    [
                      "default",
                      "destructive",
                      "warning",
                      "success",
                      "info",
                      "ai",
                    ] as const
                  ).map((color) => (
                    <td key={color} className="p-4">
                      {isColorAllowedForHierarchy(hierarchy, color) ? (
                        <Button
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matrix cell is runtime-validated
                          {...({ hierarchy, color } as any)}
                          size="md"
                        >
                          Label
                        </Button>
                      ) : (
                        <span className="text-xs text-text-disabled">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StorySection>

      <StorySection title="Sizes (primary / default)">
        <div className="flex flex-wrap items-center gap-8">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

/** Every allowed pair × forced state via the state prop (no hover required). */
export const States: Story = {
  name: "States",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Button — States"
        description={
          <>
            The <code className="text-text-primary">state</code> prop forces
            visual treatment for design review (Figma State dropdown parity).
            It is not for production — real apps leave it at{" "}
            <code className="text-text-primary">default</code> and let CSS handle
            interaction. Loading is shown separately.
          </>
        }
      />
      <StorySection title="Pairs × states (md)">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-4 text-xs font-medium text-text-tertiary">
                  Pair
                </th>
                {states.map((s) => (
                  <th
                    key={s}
                    className="p-4 text-xs font-medium text-text-tertiary"
                  >
                    {s}
                  </th>
                ))}
                <th className="p-4 text-xs font-medium text-text-tertiary">
                  loading
                </th>
              </tr>
            </thead>
            <tbody>
              {allowedPairs.map(({ hierarchy, color, label }) => (
                <tr key={label} className="border-t border-border-subtle">
                  <td className="p-4 font-mono text-xs text-text-secondary">
                    {label}
                  </td>
                  {states.map((state) => (
                    <td key={state} className="p-4">
                      <Button
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        {...({ hierarchy, color } as any)}
                        size="md"
                        state={state}
                      >
                        Label
                      </Button>
                    </td>
                  ))}
                  <td className="p-4">
                    <Button
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      {...({ hierarchy, color } as any)}
                      size="md"
                      loading
                    >
                      Label
                    </Button>
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

/** Content permutations: icon axis, loading with/without label. */
export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Button — Content" />

      <StorySection title="Icon placements (md)">
        <div className="flex flex-wrap items-center gap-8">
          <Button icon="leading" iconNode={<PlaceholderIcon />}>
            Leading
          </Button>
          <Button icon="trailing" iconNode={<ChevronIcon />}>
            Trailing
          </Button>
          <Button icon="none">Label only</Button>
          <Button
            icon="only"
            iconNode={<PlaceholderIcon />}
            aria-label="Add"
          />
          <Button className="max-w-40 truncate" title="A very long label that should truncate">
            A very long label that should truncate
          </Button>
        </div>
      </StorySection>

      <StorySection title="Icon only — every size">
        <div className="flex flex-wrap items-center gap-8">
          {sizes.map((size) => (
            <Button
              key={size}
              size={size}
              icon="only"
              aria-label={`Add (${size})`}
              iconNode={<PlaceholderIcon />}
            />
          ))}
        </div>
      </StorySection>

      <StorySection title="Icon axis × sizes">
        <div className="overflow-x-auto">
          <table className="border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="p-4 text-xs font-medium text-text-tertiary">
                  Icon
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
                  ["leading", <PlaceholderIcon key="l" />],
                  ["trailing", <ChevronIcon key="t" />],
                  ["only", <PlaceholderIcon key="o" />],
                ] as const
              ).map(([icon, node]) => (
                <tr key={icon} className="border-t border-border-subtle">
                  <td className="p-4 font-mono text-xs text-text-secondary">
                    {icon}
                  </td>
                  {sizes.map((size) => (
                    <td key={size} className="p-4">
                      <Button
                        size={size}
                        icon={icon}
                        iconNode={node}
                        {...(icon === "only"
                          ? { "aria-label": `Action (${size})` }
                          : {})}
                      >
                        Label
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StorySection>

      <StorySection title="Loading — with and without label">
        <div className="flex flex-wrap items-center gap-8">
          <Button loading>Saving</Button>
          <Button loading hierarchy="secondary">
            Saving
          </Button>
          <Button loading icon="only" aria-label="Loading" />
          {sizes.map((size) => (
            <Button key={size} size={size} loading>
              {size}
            </Button>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

/** Layout contexts: full width, inline row, constrained, form row. */
export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Button — Layout" />

      <StorySection title="Full width">
        <Button fullWidth>Full width primary</Button>
        <div className="mt-8">
          <Button fullWidth hierarchy="secondary">
            Full width secondary
          </Button>
        </div>
      </StorySection>

      <StorySection title="Inline in a row">
        <div className="flex flex-wrap items-center gap-8">
          <Button hierarchy="ghost">Cancel</Button>
          <Button hierarchy="secondary">Draft</Button>
          <Button>Publish</Button>
        </div>
      </StorySection>

      <StorySection title="Inside a constrained container">
        <div className="w-48 rounded-control border border-border-subtle bg-bg-surface p-8">
          <div className="flex flex-col gap-8">
            <Button fullWidth size="sm">
              Confirm
            </Button>
            <Button fullWidth size="sm" hierarchy="ghost">
              Cancel
            </Button>
          </div>
        </div>
      </StorySection>

      <StorySection title="Form row alongside other controls">
        <div className="flex max-w-xl flex-wrap items-end gap-8">
          <div className="min-w-0 flex-1">
            <Input
              label="Campaign name"
              placeholder="Summer launch"
            />
          </div>
          <Button>Save</Button>
          <Button hierarchy="secondary">Cancel</Button>
        </div>
      </StorySection>

      <StorySection title="Link hierarchy">
        <div className="flex flex-wrap items-center gap-16">
          <Button hierarchy="link">Default link</Button>
          <Button hierarchy="link" color="destructive">
            Destructive link
          </Button>
          <Button hierarchy="link" color="ai">
            AI link
          </Button>
        </div>
      </StorySection>
    </div>
  ),
};

type PlaygroundArgs = {
  children?: string;
  hierarchy: ButtonHierarchy;
  color: string;
  size: "xs" | "sm" | "md" | "lg";
  icon: "none" | "leading" | "trailing" | "only";
  state: ButtonState;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
};

/** Single interactive instance — hierarchy, color, size, icon, state. */
export const Playground: StoryObj<PlaygroundArgs> = {
  name: "Playground",
  args: {
    children: "Button",
    hierarchy: "primary",
    color: "default",
    size: "md",
    icon: "none",
    state: "default",
    fullWidth: false,
    loading: false,
    disabled: false,
    showIcon: false,
  },
  argTypes: {
    showIcon: { control: "boolean", name: "iconNode" },
    children: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    hierarchy: { control: "select", options: [...hierarchies] },
    size: { control: "select", options: [...sizes] },
    icon: { control: "select", options: [...icons] },
    state: { control: "select", options: [...states] },
    color: {
      control: "select",
      options: [...BUTTON_COLOR_BY_HIERARCHY.primary],
    },
  },
  decorators: [
    (Story, context) => {
      const hierarchy = (context.args.hierarchy ??
        "primary") as ButtonHierarchy;
      Object.assign(context.argTypes, {
        color: {
          control: { type: "select" },
          options: [...BUTTON_COLOR_BY_HIERARCHY[hierarchy]],
        },
      });
      return <Story />;
    },
  ],
  render: function PlaygroundStory(args) {
    const { showIcon, hierarchy = "primary", color, ...rest } = args;
    const [, updateArgs] = useArgs<PlaygroundArgs>();

    const allowed = BUTTON_COLOR_BY_HIERARCHY[hierarchy];
    const resolvedColor =
      color && (allowed as readonly string[]).includes(color)
        ? color
        : allowed[0];

    useEffect(() => {
      if (color !== resolvedColor) {
        updateArgs({ color: resolvedColor });
      }
    }, [hierarchy, color, resolvedColor, updateArgs]);

    return (
      <Button
        {...rest}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- pair validated against BUTTON_COLOR_BY_HIERARCHY
        {...({ hierarchy, color: resolvedColor } as any)}
        {...(showIcon || rest.icon !== "none"
          ? { iconNode: <PlaceholderIcon /> }
          : {})}
        {...(rest.icon === "only"
          ? { "aria-label": String(rest.children ?? "Button") }
          : {})}
      />
    );
  },
};

