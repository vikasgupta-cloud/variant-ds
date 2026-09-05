/**
 * Get started / For designers.
 */
import {
  DocsList,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../../primitives";

export function ForDesignersPage() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Get started"
        title="For designers"
        description="Use Storybook and Figma as mirrors of the same token system — not parallel libraries."
      />

      <Section title="Verify in Storybook">
        <DocsList
          items={[
            "Toggle Mode (light / dark) and Context (canvas / surface / surface-raised)",
            "Use each component’s Examples stories for the five-story matrix",
            "Check Foundations · Contrast after any colour change",
            "Release-phase badges in the sidebar show Stable / Beta / Caution / Deprecated",
          ]}
        />
      </Section>

      <Section title="Figma">
        <Prose>
          <span>
            The Figma library and Code Connect mappings live under Tools · Figma
            library. Variables should track the same Role and Structure paths as
            code — if Figma drifts, fix the tokens, not the component one-offs.
          </span>
        </Prose>
      </Section>

      <Section title="Contributing from design">
        <DocsList
          items={[
            "Propose new Role or Structure tokens before new component tokens",
            "Document contrast requirements on every colour token",
            "Yellow is for selection and wayfinding — not primary buttons",
          ]}
        />
      </Section>
    </DocsPage>
  );
}
