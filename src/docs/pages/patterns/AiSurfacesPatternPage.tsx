/**
 * Patterns / AI surfaces.
 */
import {
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function AiSurfacesPatternPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Patterns"
        title="AI surfaces"
        description="Patterns for AI-assisted UI using the AI colour role (berry) — never brand yellow."
      />

      <Section title="Colour">
        <DocsList
          items={[
            "Soft AI fills for banners and callouts; strong AI for high-emphasis chips",
            "Buttons use hierarchy × colour ai (primary or secondary) — not a separate variant name",
            "Selected / wayfinding yellow stays reserved for selection, not AI chrome",
          ]}
        />
      </Section>

      <Section title="Copy">
        <Prose>
          <span>
            Label AI-generated content as assisted or generated when the user
            might mistake it for human-authored product data.
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}
