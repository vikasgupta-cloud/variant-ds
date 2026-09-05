/**
 * Patterns / Forms.
 */
import {
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function FormsPatternPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Patterns"
        title="Forms"
        description="Label, help, error, and layout patterns for product forms using Input, Select, and related controls."
      />

      <Section title="Structure">
        <DocsList
          items={[
            "One label per field — use the Input label prop, not a detached caption",
            "Helper text sits below the field; errors replace helper when invalid",
            "Group related fields with layout/stack or layout/stack-loose — not ad-hoc gaps",
            "Primary submit is a Button with hierarchy primary; destructive submits use destructive colour",
          ]}
        />
      </Section>

      <Section title="Validation">
        <Prose>
          <span>
            Prefer inline errors with <code>border/danger</code> and{" "}
            <code>text/danger</code>. Do not rely on colour alone — keep the
            message text.
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}
