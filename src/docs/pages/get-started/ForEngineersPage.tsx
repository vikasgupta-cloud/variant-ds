/**
 * Get started / For engineers.
 */
import {
  CodeBlock,
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function ForEngineersPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Get started"
        title="For engineers"
        description="Consume components and tokens from the library. Extend the system through the token pipeline — not ad-hoc CSS."
      />

      <Section title="Importing components">
        <CodeBlock>{`import { Button } from "@wingify/variant-ds/Button";
import { Icon } from "@wingify/variant-ds/Icon";`}</CodeBlock>
        <Prose>
          <span>
            Prefer the public Icon wrapper over importing Phosphor directly.
            Icons use regular weight only and inherit <code>currentColor</code>.
          </span>
        </Prose>
      </Section>

      <Section title="Hard rules">
        <DocsList
          items={[
            "No hex outside tokens/",
            "No raw px in component files — use dimension/* or Structure",
            "Component files must not reference primitives directly",
            "Style Dictionary runs with outputReferences: true — aliases stay as var()",
            "Button and Input own zero component tokens",
          ]}
        />
      </Section>

      <Section title="Local workflow">
        <CodeBlock>{`pnpm tokens:build
pnpm specs:build
pnpm exec storybook dev -p 6006`}</CodeBlock>
      </Section>
    </DocsPage>
  );
}
