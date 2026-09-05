/**
 * Foundations / Radius — six steps + applied components via docs primitives.
 */
import { Alert } from "../../components/Alert";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Tag } from "../../components/Tag";
import { tokensWhere, useFoundationsTick } from "./catalog";
import {
  DocsPage,
  PageHeader,
  Prose,
  Section,
  Subsection,
} from "../primitives";

const RADIUS_ORDER = ["none", "xs", "sm", "md", "lg", "full"] as const;

export function RadiusPage() {
  const { tick } = useFoundationsTick();
  void tick;

  const radii = tokensWhere(
    (t) => t.layer === "primitive" && t.path[0] === "radius",
  ).sort(
    (a, b) =>
      RADIUS_ORDER.indexOf(a.path[1] as (typeof RADIUS_ORDER)[number]) -
      RADIUS_ORDER.indexOf(b.path[1] as (typeof RADIUS_ORDER)[number]),
  );

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        description="Six radius/* steps from tokens.json — swatches first, then each step on a real component."
      />

      <Section title="radius/* swatches">
        <div className="flex flex-wrap gap-layout-section">
          {radii.map((token) => (
            <div
              key={token.name}
              className="flex w-128 flex-col items-center gap-8"
            >
              <div
                className="size-80 border border-border-default bg-bg-surface"
                style={{ borderRadius: `var(${token.cssVar})` }}
              />
              <span className="font-mono type-numeric-sm text-text-primary">
                {token.name}
              </span>
              <span className="font-mono type-numeric-sm text-text-tertiary">
                {String(token.value)}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Applied to components"
        description="Each step mapped to a component that consumes it via Structure or Component tokens."
      >
        <div className="grid gap-layout-section sm:grid-cols-2">
          <Subsection title="radius/xs → Button">
            <Button>Control radius</Button>
          </Subsection>
          <Subsection title="radius/sm → Alert">
            <Alert role="info" title="Alert">
              Small radius on messaging chrome.
            </Alert>
          </Subsection>
          <Subsection title="radius/md → Card">
            <Card header={<span className="type-body-md-semibold">Card</span>}>
              <Prose>
                <span>Medium radius.</span>
              </Prose>
            </Card>
          </Subsection>
          <Subsection title="radius/full → Badge">
            <Badge>Pill</Badge>
          </Subsection>
          <Subsection title="radius/xs → Tag">
            <Tag>Tag</Tag>
          </Subsection>
          <Subsection title="radius/lg — reference">
            <div
              className="border border-border-default bg-bg-surface p-card-padding type-body-md text-text-secondary"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              radius/lg applied for reference (no lg component yet)
            </div>
          </Subsection>
        </div>
      </Section>
    </DocsPage>
  );
}
