/**
 * Foundations / Elevation — shadow/sm and shadow/md via docs primitives + Card.
 */
import { Card } from "../../components/Card";
import { tokensWhere, useFoundationsTick } from "./catalog";
import {
  Callout,
  DocsPage,
  PageHeader,
  Prose,
  Section,
  Subsection,
} from "../primitives";

export function ElevationPage() {
  const { tick, mode } = useFoundationsTick();
  void tick;

  const shadows = tokensWhere(
    (t) => t.layer === "structure" && t.path[0] === "shadow",
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Elevation"
        description="Shadow tokens from the Structure layer. Dark mode leans on lighter surfaces rather than heavier shadows."
      />

      <Callout role="warning" title="Prefer surface lift in dark">
        <Prose>
          <span>
            Prefer raising the surface level in dark mode instead of stacking
            more shadow. Shadows stay subtle (<code>shadow/sm</code>,{" "}
            <code>shadow/md</code>) so fill contrast carries the boundary. Active
            Mode: <strong>{mode}</strong>.
          </span>
        </Prose>
      </Callout>

      <Section title="shadow/* on cards">
        <div className="grid gap-layout-section sm:grid-cols-2">
          {shadows.map((token) => (
            <Subsection key={token.name} title={token.name}>
              <Card
                className="shadow-none"
                style={{ boxShadow: `var(${token.cssVar})` }}
                header={
                  <span className="type-body-md-semibold">{token.name}</span>
                }
              >
                <Prose>
                  <span>{token.description}</span>
                </Prose>
              </Card>
            </Subsection>
          ))}
        </div>
      </Section>

      <Section
        title="Light vs dark"
        description="Same shadow tokens side by side; dark column sets data-mode=dark."
      >
        <div className="grid gap-layout-section sm:grid-cols-2">
          {(["light", "dark"] as const).map((colMode) => (
            <div
              key={colMode}
              data-mode={colMode}
              data-context="canvas"
              className="flex flex-col gap-layout-section rounded-card bg-bg-canvas p-card-padding text-text-primary"
            >
              <span className="type-body-sm-caps text-text-tertiary">
                {colMode}
              </span>
              {shadows.map((token) => (
                <Card
                  key={token.name}
                  className="shadow-none"
                  style={{ boxShadow: `var(${token.cssVar})` }}
                  header={
                    <span className="type-body-md-semibold">{token.name}</span>
                  }
                >
                  <Prose>
                    <span>On canvas · prefer surface lift in dark</span>
                  </Prose>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </DocsPage>
  );
}
