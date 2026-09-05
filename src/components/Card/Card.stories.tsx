/**
 * Card — five-story set. Nested cards prove Surface context at depth three.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const variants = ["default", "raised", "interactive"] as const;
const states = ["default", "hover", "active", "focused", "disabled"] as const;

const meta = {
  title: "Components/Layout/Card/Examples",
  component: Card,
  args: {
    variant: "default",
    children: "Card body content.",
    state: "default",
  },
  argTypes: {
    variant: { control: "select", options: [...variants] },
    state: {
      control: "select",
      options: [...states],
      description:
        "Design-review only — forces a visual state. Leave at default in production.",
    },
    header: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Card — All variants"
        description={
          <>
            Default and interactive establish{" "}
            <code className="text-text-primary">data-context=&quot;surface&quot;</code>
            ; raised uses <code className="text-text-primary">surface-raised</code>.
            Chrome is <code className="text-text-primary">border/subtle</code> +{" "}
            <code className="text-text-primary">shadow/sm</code>.
          </>
        }
      />
      <StorySection title="Variants">
        <div className="grid max-w-4xl gap-16 md:grid-cols-3">
          {variants.map((variant) => (
            <Card
              key={variant}
              variant={variant}
              header={
                <h3 className="text-sm font-semibold capitalize">{variant}</h3>
              }
            >
              <p className="text-sm text-text-secondary">
                Body on {variant === "raised" ? "surface-raised" : "surface"}{" "}
                context.
              </p>
            </Card>
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
        title="Card — States"
        description={
          <>
            Forced via the <code className="text-text-primary">state</code> prop
            on interactive cards. Design-review only — not for production.
          </>
        }
      />
      <StorySection title="Interactive × states">
        <div className="flex max-w-4xl flex-wrap gap-16">
          {states.map((state) => (
            <Card
              key={state}
              variant="interactive"
              state={state}
              className="max-w-56"
              header={
                <h3 className="font-mono text-xs font-semibold">{state}</h3>
              }
            >
              <p className="text-sm text-text-secondary">Forced visual state.</p>
            </Card>
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
      <StoryHeading title="Card — Content" />
      <StorySection title="Header / body / footer">
        <div className="max-w-md">
          <Card
            header={
              <h3 className="text-sm font-semibold">Campaign summary</h3>
            }
            footer={
              <>
                <Button hierarchy="ghost" size="sm">
                  Dismiss
                </Button>
                <Button size="sm">Open</Button>
              </>
            }
          >
            <p className="text-sm text-text-secondary">
              12,480 visitors · 3.2% conversion this week.
            </p>
          </Card>
        </div>
      </StorySection>
      <StorySection title="With form controls">
        <div className="max-w-md">
          <Card
            header={<h3 className="text-sm font-semibold">New segment</h3>}
            footer={
              <>
                <Button hierarchy="secondary" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Create</Button>
              </>
            }
          >
            <Input label="Name" placeholder="Power users" />
          </Card>
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
      <StoryHeading
        title="Card — Layout"
        description="Nested cards at three depths. Each Card sets data-context so Surface levels stay distinct."
      />
      <StorySection title="Card inside a card (depth three)">
        <Card
          header={<h3 className="text-sm font-semibold">Outer — default (surface)</h3>}
        >
          <p className="mb-layout-stack text-sm text-text-secondary">
            Parent context is surface. Nested cards bump context at each level.
          </p>
          <Card
            variant="raised"
            header={
              <h3 className="text-sm font-semibold">Middle — raised (surface-raised)</h3>
            }
          >
            <p className="mb-layout-stack text-sm text-text-secondary">
              Third card sits inside raised and uses default (surface) again.
            </p>
            <Card
              header={
                <h3 className="text-sm font-semibold">Inner — default (surface)</h3>
              }
            >
              <p className="text-sm text-text-secondary">
                Depth three: canvas → surface → surface-raised → surface.
                Level tokens inside each Card resolve from the nearest context.
              </p>
              <div className="mt-layout-stack rounded-card bg-surface-level-1 p-layout-stack-loose">
                <p className="text-xs text-text-tertiary">
                  surface/level-1 well — proves context at this depth.
                </p>
              </div>
            </Card>
          </Card>
        </Card>
      </StorySection>
      <StorySection title="Grid of cards">
        <div className="grid max-w-3xl gap-16 sm:grid-cols-2">
          <Card header={<h3 className="text-sm font-semibold">A</h3>}>
            <p className="text-sm text-text-secondary">First column.</p>
          </Card>
          <Card header={<h3 className="text-sm font-semibold">B</h3>}>
            <p className="text-sm text-text-secondary">Second column.</p>
          </Card>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "default",
    state: "default",
    header: "Card title",
    children: "Editable body content for the playground.",
    footer: undefined,
  },
  render: (args) => (
    <div className="max-w-md">
      <Card
        {...args}
        header={
          args.header ? (
            <h3 className="text-sm font-semibold">{String(args.header)}</h3>
          ) : undefined
        }
      />
    </div>
  ),
};
