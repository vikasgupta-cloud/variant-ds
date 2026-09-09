/**
 * Foundations / Radius — six steps, applied demos, plus component radius table.
 */
import { Alert } from "../../components/Alert";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Tag } from "../../components/Tag";
import {
  COMPONENT_RADIUS_ROWS,
} from "./componentRadiusCatalog";
import { findTokenRoot, tokensWhere, useFoundationsTick } from "./catalog";
import {
  Callout,
  DataTable,
  DataTableStack,
  DocsPage,
  PageHeader,
  Prose,
  Section,
  Subsection,
} from "../primitives";

const RADIUS_ORDER = ["none", "xs", "sm", "md", "lg", "full"] as const;

function readCssVar(cssVar: string): string {
  const root = findTokenRoot();
  if (!root) return "—";
  const raw = getComputedStyle(root).getPropertyValue(`--${cssVar}`).trim();
  return raw || "—";
}

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

  const tableRows = COMPONENT_RADIUS_ROWS.map((row, i) => ({
    ...row,
    id: `${row.component}-${row.part ?? "root"}-${i}`,
    primitiveResolved: readCssVar(row.primitive.replace(/\//g, "-")),
  }));

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        description="Six radius/* steps from tokens.json — swatches, applied examples, then every component’s corner token in the reference table."
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
              <span className="type-body-md text-text-primary">
                {token.name}
              </span>
              <span className="type-body-sm text-text-secondary">
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

      <Section
        title="Component radius"
        description="Every shipped component’s corner token and the primitive radius/* step it aliases. Values resolve live from CSS variables."
      >
        <Callout role="info" title="How to read the table">
          <Prose>
            <span>
              Shared controls use <code>control/radius</code> (→{" "}
              <code>radius/xs</code>). Badge / Radio / Toggle / Progress use{" "}
              <code>radius/full</code>. Card uses <code>radius/md</code>.{" "}
              <code>radius/lg</code> has no component binding yet.
            </span>
          </Prose>
        </Callout>

        <DataTable
          columns={[
            {
              key: "component",
              header: "Component",
              width: "md",
              cell: (r) => r.component,
            },
            {
              key: "part",
              header: "Part",
              width: "sm",
              cell: (r) => r.part ?? "—",
            },
            {
              key: "radius",
              header: "Radius token",
              width: "md",
              cell: (r) => (
                <DataTableStack
                  primary={r.radius.path}
                  secondary={readCssVar(r.radius.cssVar)}
                />
              ),
            },
            {
              key: "primitive",
              header: "Primitive",
              width: "md",
              cell: (r) => (
                <DataTableStack
                  primary={r.primitive}
                  secondary={r.primitiveResolved}
                />
              ),
            },
          ]}
          rows={tableRows}
          getRowKey={(r) => r.id}
        />
      </Section>
    </DocsPage>
  );
}
