/**
 * Patterns / Empty states.
 */
import {
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function EmptyStatesPatternPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Patterns"
        title="Empty states"
        description="First-use and no-results messaging when a view has nothing to show."
      />

      <Section title="When to use">
        <DocsList
          items={[
            "First visit before the user creates content",
            "Filters or search return zero results",
            "Permissions leave a surface intentionally blank",
          ]}
        />
      </Section>

      <Section title="Content">
        <Prose>
          <span>
            One short title (heading/sm or body/lg-semibold), one supporting
            sentence (body/md), and at most one primary action. Avoid decorative
            illustration stacks that compete with the product chrome.
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}
