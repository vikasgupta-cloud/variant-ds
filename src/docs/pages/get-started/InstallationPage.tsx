/**
 * Get started / Installation.
 */
import {
  Callout,
  CodeBlock,
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function InstallationPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Get started"
        title="Installation"
        description="Install the package, import theme CSS, and render components against the token pipeline."
      />

      <Section title="Package">
        <CodeBlock>{`pnpm add @wingify/variant-ds`}</CodeBlock>
        <Prose>
          <span>
            The package is ESM-only. Peer dependencies: React 19 and the Radix
            primitives already listed in this repo’s <code>package.json</code>.
          </span>
        </Prose>
      </Section>

      <Section title="Theme CSS">
        <Prose>
          <span>
            Import the theme entry once at the app root. It pulls generated
            token layers and maps them into Tailwind <code>@theme</code>.
          </span>
        </Prose>
        <CodeBlock>{`import "@wingify/variant-ds/styles/theme.css";`}</CodeBlock>
      </Section>

      <Section title="Mode and context">
        <DocsList
          items={[
            <>
              Set <code>data-mode=&quot;light&quot;</code> or{" "}
              <code>data-mode=&quot;dark&quot;</code> on a root element
            </>,
            <>
              Nest surfaces with <code>data-context=&quot;canvas&quot;</code>,{" "}
              <code>surface</code>, or <code>surface-raised</code>
            </>,
            "Prefer Role and Structure utilities — never primitive hex or raw px in product UI",
          ]}
        />
        <Callout role="warning" title="Build tokens before Storybook">
          <Prose>
            <span>
              Run <code>pnpm tokens:build</code> (or <code>pnpm dev</code>) so{" "}
              <code>src/styles/tokens/</code> stays in sync with{" "}
              <code>tokens/*.json</code>.
            </span>
          </Prose>
        </Callout>
      </Section>
    </DocsPage>
  );
}
