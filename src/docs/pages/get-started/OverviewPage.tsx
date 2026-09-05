/**
 * Get started / Overview — product orientation for Variant DS.
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

export function OverviewPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Get started"
        title="Overview"
        description="Variant is VWO’s design system — tokens, components, and documentation that keep product UI consistent across modes, contexts, and teams."
      />

      <Section title="Who it is for">
        <DocsList
          items={[
            "Designers verifying light/dark, canvas/surface nesting, and interaction states",
            "Engineers consuming React components and CSS custom properties as the source of truth",
            "Anyone extending the system without inventing one-off colours or spacing",
          ]}
        />
      </Section>

      <Section title="Token layers">
        <Prose>
          <span>
            References flow one way only. Components never reach past Role or
            Structure into primitives.
          </span>
        </Prose>
        <CodeBlock>{`Component → Structure → Surface → Role → Primitive`}</CodeBlock>
      </Section>

      <Section title="What ships today">
        <DocsList
          items={[
            "Compiled tokens (CSS + JSON) with live Mode / Context in Storybook",
            "Core components: Button, Input, forms, messaging, navigation, layout",
            "Foundations pages for colour, type, spacing, motion, contrast, icons",
          ]}
        />
        <Callout role="info" title="Release phase">
          <Prose>
            <span>
              Shipped components are marked <strong>Beta</strong> until the
              rebrand and accessibility audit complete.
            </span>
          </Prose>
        </Callout>
      </Section>
    </DocsPage>
  );
}
