/**
 * Patterns / Destructive actions.
 */
import {
  Callout,
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function DestructiveActionsPatternPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Patterns"
        title="Destructive actions"
        description="Confirming delete and other irreversible changes without burying risk behind an unlabeled icon."
      />

      <Section title="Hierarchy">
        <DocsList
          items={[
            "Use Button colour destructive on secondary or ghost hierarchies for in-page actions",
            "Confirm in a Modal with a clear consequence sentence",
            "Dismiss / Cancel stays ghost; the confirming action is secondary + destructive (never primary black)",
          ]}
        />
      </Section>

      <Callout role="warning" title="Contrast">
        <Prose>
          <span>
            Soft danger fills pair with <code>text/danger</code>. Strong danger
            fills use <code>text/on-strong</code>.
          </span>
        </Prose>
      </Callout>
    </DocsPage>
  );
}
