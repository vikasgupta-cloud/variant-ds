/**
 * Tools / Contributing.
 */
import {
  CodeBlock,
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function ContributingPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Tools"
        title="Contributing"
        description="How to propose tokens, components, and docs changes without breaking layer discipline."
      />

      <Section title="Before you add a component token">
        <DocsList
          items={[
            "Check Role and Structure for an existing mapping",
            "Button and Input must remain zero-component-token",
            "Every token needs a description; colour tokens state contrast requirements",
          ]}
        />
      </Section>

      <Section title="Local checks">
        <CodeBlock>{`pnpm tokens:build
pnpm exec tsc --noEmit
pnpm test
pnpm build`}</CodeBlock>
        <Prose>
          <span>
            Render new work in light and dark across canvas, surface, and
            surface-raised. <code>addon-a11y</code> violations fail the build.
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}
