/**
 * Get started / Changelog.
 */
import {
  Callout,
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function ChangelogPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Get started"
        title="Changelog"
        description="Release notes for Variant. Breaking changes call out token renames and component API shifts."
      />

      <Section title="Unreleased">
        <DocsList
          items={[
            "Storybook IA aligned to the design-system docs site",
            "Typography composites + body/sm-caps; layout/measure-* reading widths",
            "Docs primitives library; Phosphor Icon wrapper",
            "Foundations pages driven from compiled tokens.json",
          ]}
        />
        <Callout role="info" title="Rebrand">
          <Prose>
            <span>
              The hosted Storybook should stay password-protected until the
              rebrand is public.
            </span>
          </Prose>
        </Callout>
      </Section>
    </DocsPage>
  );
}
