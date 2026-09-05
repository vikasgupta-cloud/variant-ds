/**
 * Alert — five-story set. Actions always use ghost + secondary coloured by role.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import type { AlertRole } from "./Alert.variants";
import { StoryHeading, StorySection } from "../../stories/kit";

const roles: AlertRole[] = ["info", "success", "warning", "danger", "ai"];
const emphases = ["soft", "strong"] as const;

const meta = {
  title: "Components/Messaging/Alert/Examples",
  component: Alert,
  args: {
    role: "info",
    emphasis: "soft",
    title: "Heads up",
    children: "Something needs your attention.",
  },
  argTypes: {
    role: { control: "select", options: [...roles] },
    emphasis: { control: "select", options: [...emphases] },
    state: {
      control: "select",
      options: ["default"],
      description:
        "Design-review only — Alert has no forced interaction states.",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Alert — All variants"
        description="Role × emphasis. Action buttons inherit the Alert role as their colour — never a primary default button inside a coloured alert."
      />
      <StorySection title="Role × emphasis">
        <div className="flex max-w-2xl flex-col gap-16">
          {roles.map((role) =>
            emphases.map((emphasis) => (
              <Alert
                key={`${role}-${emphasis}`}
                role={role}
                emphasis={emphasis}
                title={`${role} / ${emphasis}`}
              >
                Supporting copy for this alert.
              </Alert>
            )),
          )}
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
        title="Alert — States"
        description="Alert has no interactive chrome of its own. Actions demonstrate the standardised ghost + secondary pair per role."
      />
      <StorySection title="With actions (per role)">
        <div className="flex max-w-2xl flex-col gap-16">
          {roles.map((role) => (
            <Alert
              key={role}
              role={role}
              title={`${role} alert`}
              actions={{ primaryLabel: "View details" }}
            >
              Dismiss is ghost; the primary action is secondary — both coloured by
              role.
            </Alert>
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
      <StoryHeading title="Alert — Content" />
      <StorySection title="Title only / body only / both / with actions">
        <div className="flex max-w-2xl flex-col gap-16">
          <Alert role="info" title="Title only" />
          <Alert role="success">Body only — no title.</Alert>
          <Alert role="warning" title="Title and body">
            Supporting detail goes here.
          </Alert>
          <Alert
            role="info"
            title="Dismissible only"
            dismissible
          >
            Ghost Dismiss with no primary action.
          </Alert>
          <Alert
            role="danger"
            title="With actions"
            actions={{ primaryLabel: "Undo" }}
          >
            Destructive actions stay secondary + destructive, not primary default.
          </Alert>
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
      <StoryHeading title="Alert — Layout" />
      <StorySection title="Full width in a panel">
        <div className="rounded-control border border-border-subtle bg-bg-surface p-16">
          <Alert
            role="ai"
            title="AI suggestion"
            actions={{ primaryLabel: "Apply" }}
          >
            Nested inside a surface context.
          </Alert>
        </div>
      </StorySection>
      <StorySection title="Narrow column">
        <div className="w-64">
          <Alert
            role="info"
            title="Narrow"
            actions={{ primaryLabel: "OK" }}
          >
            Actions wrap when space is tight.
          </Alert>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    role: "warning",
    emphasis: "soft",
    title: "Campaign paused",
    children: "Traffic stopped at 09:41. Resume when ready.",
    actions: { primaryLabel: "Resume" },
  },
};
