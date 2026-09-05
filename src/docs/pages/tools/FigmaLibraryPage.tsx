/**
 * Tools / Figma library.
 */
import {
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function FigmaLibraryPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Tools"
        title="Figma library"
        description="Link the shared Figma library and Code Connect so design and code share the same component and variable names."
      />

      <Section title="Expectations">
        <DocsList
          items={[
            "Variables map to Role / Structure / Component token paths",
            "Component variants match the cva axes in code (hierarchy × colour, size, state)",
            "Do not invent Figma-only colours that skip the token pipeline",
          ]}
        />
      </Section>

      <Section title="Status">
        <Prose>
          <span>
            Library URL and Code Connect publish steps will land here when the
            Figma file is linked for the rebrand. Until then, treat Storybook as
            the live reference.
          </span>
        </Prose>
      </Section>
    </DocsPage>
  );
}
