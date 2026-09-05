/**
 * Tabs — five-story set: All variants · States · Content · Layout · Playground
 * Content includes icons + Badge counts; Layout includes overflow scroll.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import type { TabsTriggerState } from "./Tabs.variants";
import {
  PlaceholderIcon,
  StoryHeading,
  StorySection,
} from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;
const variants = ["underline", "button"] as const;
const states: TabsTriggerState[] = ["default", "active", "disabled"];

const meta = {
  title: "Components/Navigation/Tabs/Examples",
  component: Tabs,
  args: {
    variant: "underline",
    size: "md",
    defaultValue: "one",
  },
  argTypes: {
    variant: { control: "select", options: [...variants] },
    size: { control: "select", options: [...sizes] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function DemoTabs({
  variant,
  size,
}: {
  variant: (typeof variants)[number];
  size: (typeof sizes)[number];
}) {
  return (
    <Tabs variant={variant} size={size} defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">Overview</TabsTrigger>
        <TabsTrigger value="two">Audience</TabsTrigger>
        <TabsTrigger value="three">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
        <p className="text-sm text-text-secondary">Overview panel.</p>
      </TabsContent>
      <TabsContent value="two">
        <p className="text-sm text-text-secondary">Audience panel.</p>
      </TabsContent>
      <TabsContent value="three">
        <p className="text-sm text-text-secondary">Settings panel.</p>
      </TabsContent>
    </Tabs>
  );
}

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Tabs — All variants"
        description="Underline uses selected/indicator. Button uses surface-level-1 container + bg-surface active."
      />
      {variants.map((variant) => (
        <StorySection key={variant} title={variant}>
          <div className="flex flex-col gap-24">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col gap-8">
                <span className="text-xs text-text-tertiary">size {size}</span>
                <DemoTabs variant={variant} size={size} />
              </div>
            ))}
          </div>
        </StorySection>
      ))}
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Tabs — States"
        description="Trigger state matrix for design review (active also from Radix data-state)."
      />
      {variants.map((variant) => (
        <StorySection key={variant} title={variant}>
          <div className="overflow-x-auto">
            <table className="border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="p-8 text-text-tertiary">Size</th>
                  {states.map((state) => (
                    <th
                      key={state}
                      className="p-8 font-medium text-text-secondary"
                    >
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
                        <Tabs
                          variant={variant}
                          size={size}
                          defaultValue={
                            state === "active" ? "forced" : "other"
                          }
                        >
                          <TabsList>
                            <TabsTrigger value="forced" state={state}>
                              Tab
                            </TabsTrigger>
                            {state !== "active" ? (
                              <TabsTrigger value="other" className="sr-only">
                                Hidden
                              </TabsTrigger>
                            ) : null}
                          </TabsList>
                        </Tabs>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StorySection>
      ))}
    </div>
  ),
};

export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Tabs — Content" />
      <StorySection title="Icons + badge counts">
        <Tabs variant="underline" size="md" defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" icon={<PlaceholderIcon />}>
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              icon={<PlaceholderIcon />}
              badge={<Badge size="sm" count={12} role="info" />}
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              badge={<Badge size="sm" count={3} role="warning" />}
            >
              Draft
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <p className="text-sm text-text-secondary">All items.</p>
          </TabsContent>
          <TabsContent value="active">
            <p className="text-sm text-text-secondary">Active items.</p>
          </TabsContent>
          <TabsContent value="draft">
            <p className="text-sm text-text-secondary">Draft items.</p>
          </TabsContent>
        </Tabs>
      </StorySection>
      <StorySection title="Button variant with badges">
        <Tabs variant="button" size="md" defaultValue="a">
          <TabsList>
            <TabsTrigger value="a" badge={<Badge size="sm" count={2} />}>
              Inbox
            </TabsTrigger>
            <TabsTrigger value="b">Sent</TabsTrigger>
            <TabsTrigger value="c" icon={<PlaceholderIcon />}>
              Archive
            </TabsTrigger>
          </TabsList>
          <TabsContent value="a">
            <p className="text-sm text-text-secondary">Inbox.</p>
          </TabsContent>
          <TabsContent value="b">
            <p className="text-sm text-text-secondary">Sent.</p>
          </TabsContent>
          <TabsContent value="c">
            <p className="text-sm text-text-secondary">Archive.</p>
          </TabsContent>
        </Tabs>
      </StorySection>
    </div>
  ),
};

export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Tabs — Layout" />
      <StorySection title="Overflow scroll">
        <div className="max-w-xs overflow-x-auto">
          <Tabs variant="underline" size="md" defaultValue="t1">
            <TabsList className="w-max min-w-full">
              {Array.from({ length: 10 }, (_, i) => (
                <TabsTrigger key={i} value={`t${i + 1}`}>
                  Tab {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="t1">
              <p className="text-sm text-text-secondary">
                Horizontal scroll when tabs exceed the container.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </StorySection>
      <StorySection title="In a surface card">
        <div className="max-w-lg rounded-control border border-border-subtle bg-bg-surface p-16">
          <DemoTabs variant="button" size="md" />
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  render: (args) => (
    <Tabs {...args} defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">
        <p className="text-sm text-text-secondary">Panel one.</p>
      </TabsContent>
      <TabsContent value="two">
        <p className="text-sm text-text-secondary">Panel two.</p>
      </TabsContent>
      <TabsContent value="three">
        <p className="text-sm text-text-secondary">Panel three.</p>
      </TabsContent>
    </Tabs>
  ),
};
