/**
 * Modal — five-story set. Scrim + z/modal; panel contains Card to stress Surface nesting.
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { Card } from "../Card";
import { Input } from "../Input";
import { StoryHeading, StorySection } from "../../stories/kit";

const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "Components/Messaging/Modal/Examples",
  component: Modal,
  args: {
    title: "Confirm publish",
    description: "This will make the campaign live immediately.",
    size: "md",
    state: "default",
  },
  argTypes: {
    size: { control: "select", options: [...sizes] },
    state: {
      control: "select",
      options: ["default"],
      description:
        "Design-review only. Modal visibility is controlled via open / trigger.",
    },
    trigger: { control: false },
    footer: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading
        title="Modal — All variants"
        description={
          <>
            Sizes map to <code className="text-text-primary">modal/max-width-*</code>.
            Scrim uses <code className="text-text-primary">overlay/scrim</code> @{" "}
            <code className="text-text-primary">overlay/scrim-opacity</code> with{" "}
            <code className="text-text-primary">z/modal</code>.
          </>
        }
      />
      <StorySection title="Sizes">
        <div className="flex flex-wrap gap-8">
          {sizes.map((size) => (
            <Modal
              key={size}
              size={size}
              title={`Size ${size}`}
              description={`max-width token for ${size}.`}
              trigger={<Button hierarchy="secondary">Open {size}</Button>}
              footer={
                <>
                  <Button hierarchy="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Confirm</Button>
                </>
              }
            >
              <p className="text-sm text-text-secondary">
                Panel is surface-raised. Close with the × or Cancel.
              </p>
            </Modal>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const States: Story = {
  name: "States",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: function StatesStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-32 p-8">
        <StoryHeading
          title="Modal — States"
          description="Closed vs open. Open is controlled — not a design-review state prop."
        />
        <StorySection title="Controlled open">
          <div className="flex flex-wrap items-center gap-8">
            <Button hierarchy="secondary" onClick={() => setOpen(true)}>
              Open modal
            </Button>
            <span className="font-mono text-xs text-text-tertiary">
              open={String(open)}
            </span>
          </div>
          <Modal
            open={open}
            onOpenChange={setOpen}
            title="Controlled"
            description="Parent owns open state."
            footer={
              <>
                <Button hierarchy="ghost" size="sm" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Done
                </Button>
              </>
            }
          >
            <p className="text-sm text-text-secondary">Body content.</p>
          </Modal>
        </StorySection>
      </div>
    );
  },
};

export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Modal — Content" />
      <StorySection title="Footer actions / scrolling body / destructive">
        <div className="flex flex-wrap gap-8">
          <Modal
            title="With footer"
            trigger={<Button hierarchy="secondary">Footer actions</Button>}
            footer={
              <>
                <Button hierarchy="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </>
            }
          >
            <p className="text-sm text-text-secondary">Standard confirm pattern.</p>
          </Modal>

          <Modal
            title="Scrolling body"
            size="sm"
            trigger={<Button hierarchy="secondary">Scrolling body</Button>}
            footer={
              <Button size="sm">Close</Button>
            }
          >
            <div className="flex flex-col gap-layout-stack">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} className="text-sm text-text-secondary">
                  Line {i + 1} — long content scrolls inside the panel.
                </p>
              ))}
            </div>
          </Modal>

          <Modal
            title="Delete campaign?"
            description="This cannot be undone."
            trigger={
              <Button hierarchy="primary" color="destructive">
                Destructive confirm
              </Button>
            }
            footer={
              <>
                <Button hierarchy="ghost" size="sm">
                  Cancel
                </Button>
                <Button hierarchy="primary" color="destructive" size="sm">
                  Delete
                </Button>
              </>
            }
          >
            <p className="text-sm text-text-secondary">
              Primary destructive stays in the footer — not inside an Alert.
            </p>
          </Modal>
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
        title="Modal — Layout"
        description="Modal containing a Card — Surface nesting under the scrim."
      />
      <StorySection title="Modal with nested Card">
        <Modal
          title="Review changes"
          description="Card inside the dialog uses surface context on a raised panel."
          trigger={<Button>Open nested card</Button>}
          footer={
            <>
              <Button hierarchy="ghost" size="sm">
                Cancel
              </Button>
              <Button size="sm">Apply</Button>
            </>
          }
        >
          <Card
            header={<h3 className="text-sm font-semibold">Diff summary</h3>}
            footer={
              <Button hierarchy="link" size="sm">
                View full diff
              </Button>
            }
          >
            <p className="text-sm text-text-secondary">
              Modal panel is surface-raised; this Card sets surface so nested
              chrome resolves correctly.
            </p>
          </Card>
        </Modal>
      </StorySection>
      <StorySection title="Form in modal">
        <Modal
          title="Rename audience"
          trigger={<Button hierarchy="secondary">Form modal</Button>}
          footer={
            <>
              <Button hierarchy="secondary" size="sm">
                Cancel
              </Button>
              <Button size="sm">Rename</Button>
            </>
          }
        >
          <Input label="Audience name" placeholder="Power users" />
        </Modal>
      </StorySection>
    </div>
  ),
};

export const Playground: Story = {
  name: "Playground",
  args: {
    title: "Playground modal",
    description: "Use controls to change size and copy.",
    size: "md",
    state: "default",
  },
  render: (args) => (
    <Modal
      {...args}
      trigger={<Button>Open playground</Button>}
      footer={
        <>
          <Button hierarchy="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </>
      }
    >
      <p className="text-sm text-text-secondary">
        Scrim + z/modal · surface-raised panel.
      </p>
    </Modal>
  ),
};
