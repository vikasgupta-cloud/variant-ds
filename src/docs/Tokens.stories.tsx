/**
 * Foundations / Tokens — TokenBrowser inside docs shell.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TokenBrowser } from "./TokenBrowser";
import { TokenDownloads } from "./DownloadSpec";
import { DocsPage, PageHeader, Section } from "./primitives";

function TokensPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Tokens"
        description="Browse the compiled token catalog. Downloads include CSS, JSON, and Figma-shaped packages."
      />
      <Section title="Downloads">
        <TokenDownloads />
      </Section>
      <Section title="Browser">
        <TokenBrowser />
      </Section>
    </DocsPage>
  );
}

const meta = {
  title: "Foundations/Tokens",
  component: TokensPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TokensPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Browser: Story = {};
