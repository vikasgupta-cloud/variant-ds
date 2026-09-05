/**
 * Dropdown menu — action menus. Five-story set. `state` forces open/item visuals for design review.
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
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
  title: "Components/Navigation/Dropdown menu/Examples",
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
        title="Dropdown menu — All variants"
        description="Action menus triggered from a Button. Use Select for form values."
      />
      <StorySection title="Button trigger">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button hierarchy="secondary">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        title="Dropdown menu — States"
        description={
          <>
            The <code className="text-text-primary">state</code> prop forces
            closed / open / item visuals for design review. Not for production.
          </>
        }
      />
      <StorySection title="Menu × states">
        <div className="flex flex-wrap gap-16">
          {states.map((state) => (
            <div key={state} className="flex flex-col gap-8">
              <span className="font-mono text-xs text-text-tertiary">{state}</span>
              <DropdownMenu state={state}>
                <DropdownMenuTrigger asChild>
                  <Button hierarchy="secondary" size="sm">
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Open</DropdownMenuItem>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem disabled>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </StorySection>
    </div>
  ),
};

export const Content: Story = {
  name: "Content",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: function ContentStory() {
    const [checks, setChecks] = useState({
      email: true,
      push: false,
      sms: false,
    });

    return (
      <div className="flex flex-col gap-32 p-8">
        <StoryHeading title="Dropdown menu — Content" />

        <StorySection title="Icons · descriptions · headers · dividers">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button hierarchy="secondary">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Campaign</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  icon={<Icon name="pencil-simple" size="sm" />}
                  description="Rename or edit details"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Icon name="copy" size="sm" />}>
                  Duplicate
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                icon={<Icon name="trash" size="sm" />}
                description="Cannot be undone"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </StorySection>

        <StorySection title="Checkbox multi-select">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button hierarchy="secondary">Notifications</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Channels</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem
                  checked={checks.email}
                  onCheckedChange={(v) =>
                    setChecks((c) => ({ ...c, email: Boolean(v) }))
                  }
                  icon={<Icon name="info" size="sm" />}
                  description="Digest and alerts"
                >
                  Email
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={checks.push}
                  onCheckedChange={(v) =>
                    setChecks((c) => ({ ...c, push: Boolean(v) }))
                  }
                >
                  Push
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={checks.sms}
                  onCheckedChange={(v) =>
                    setChecks((c) => ({ ...c, sms: Boolean(v) }))
                  }
                  disabled
                  description="Requires phone"
                >
                  SMS
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </StorySection>

        <StorySection title="Tabs inside the menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button hierarchy="secondary">Browse</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-0">
              <Tabs defaultValue="recent" variant="underline" size="sm">
                <div className="border-b border-border-subtle px-dropdown-item-padding-x pt-dropdown-menu-padding-y">
                  <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="starred">Starred</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="recent" className="py-dropdown-menu-padding-y">
                  <DropdownMenuItem icon={<Icon name="magnifying-glass" size="sm" />}>
                    Summer launch
                  </DropdownMenuItem>
                  <DropdownMenuItem>Q4 nurture</DropdownMenuItem>
                </TabsContent>
                <TabsContent value="starred" className="py-dropdown-menu-padding-y">
                  <DropdownMenuItem icon={<Icon name="check-circle" size="sm" />}>
                    Evergreen
                  </DropdownMenuItem>
                </TabsContent>
              </Tabs>
            </DropdownMenuContent>
          </DropdownMenu>
        </StorySection>
      </div>
    );
  },
};

export const Layout: Story = {
  name: "Layout",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-32 p-8">
      <StoryHeading title="Dropdown menu — Layout" />
      <StorySection title="Toolbar actions">
        <div className="flex flex-wrap items-center gap-8">
          <Button>Primary</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button hierarchy="secondary">More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </StorySection>
    </div>
  ),
};

export const Playground: StoryObj<{ state: DropdownState }> = {
  name: "Playground",
  args: { state: "default" },
  argTypes: {
    state: { control: "select", options: [...states] },
  },
  render: function PlaygroundStory(args) {
    const { state = "default" } = args;
    return (
      <div className="p-8">
        <DropdownMenu state={state}>
          <DropdownMenuTrigger asChild>
            <Button hierarchy="secondary">Menu playground</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem disabled>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
