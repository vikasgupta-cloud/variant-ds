/**
 * Foundations / Spacing — dimension bars, Structure control/chip demos,
 * plus component padding × size reference table.
 */
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import {
  COMPONENT_SPACING_ROWS,
  type SpacingTokenRef,
} from "./componentSpacingCatalog";
import { findTokenRoot, tokensWhere, useFoundationsTick } from "./catalog";
import {
  Callout,
  DataTable,
  DataTableEmpty,
  DataTableStack,
  DocsPage,
  PageHeader,
  Prose,
  Section,
  Subsection,
} from "../primitives";

function dimensionPx(value: string | number | null | undefined): number {
  if (value == null) return 0;
  const n = Number(String(value).replace(/px$/i, ""));
  return Number.isFinite(n) ? n : 0;
}

function readCssVar(cssVar: string): string {
  const root = findTokenRoot();
  if (!root) return "—";
  const raw = getComputedStyle(root).getPropertyValue(`--${cssVar}`).trim();
  return raw || "—";
}

function tokenStack(ref: SpacingTokenRef | undefined) {
  if (!ref) return <DataTableEmpty />;
  return (
    <DataTableStack primary={ref.path} secondary={readCssVar(ref.cssVar)} />
  );
}

function sizeStacks(refs: SpacingTokenRef[] | undefined) {
  if (!refs?.length) return <DataTableEmpty />;
  return (
    <span className="flex flex-col gap-8">
      {refs.map((r) => (
        <DataTableStack
          key={r.cssVar}
          primary={r.path}
          secondary={readCssVar(r.cssVar)}
        />
      ))}
    </span>
  );
}

export function SpacingPage() {
  const { tick } = useFoundationsTick();
  void tick;

  const dimensions = tokensWhere(
    (t) => t.layer === "primitive" && t.path[0] === "dimension",
  ).sort(
    (a, b) =>
      dimensionPx(a.value as string) - dimensionPx(b.value as string),
  );

  const controlSizes = ["xs", "sm", "md", "lg"] as const;
  const chipSizes = ["sm", "md", "lg"] as const;

  const tableRows = COMPONENT_SPACING_ROWS.map((row, i) => ({
    ...row,
    id: `${row.component}-${row.part ?? "root"}-${row.size}-${i}`,
  }));

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="All dimension/* steps from tokens.json, Structure control/* and chip/* on Button and Badge, then every component’s padding-x / padding-y (or size tokens) in the reference table."
      />

      <Section
        title="dimension/*"
        description="The name is the value — nineteen steps. Bars use the token width."
      >
        <div className="flex flex-col gap-8">
          {dimensions.map((token) => {
            const px = dimensionPx(token.value as string);
            return (
              <div
                key={token.name}
                className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,3fr)] items-center gap-8"
              >
                <span className="type-body-md text-text-primary">
                  {token.name}
                </span>
                <span className="type-body-sm text-text-secondary">
                  {px}px
                </span>
                <div className="h-8 bg-bg-neutral-soft">
                  <div
                    className="h-full bg-bg-info-strong"
                    style={{
                      width: `var(${token.cssVar})`,
                      minWidth: px === 0 ? 0 : undefined,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="Structure — control/*"
        description="Padding and gap ramps on Button at each size."
      >
        <div className="flex flex-wrap items-end gap-layout-section">
          {controlSizes.map((size) => (
            <Subsection key={size} title={size}>
              <Button size={size}>Label</Button>
              <span className="type-body-sm text-text-secondary">
                {`control-padding-x-${size} / control-padding-y-${size}`}
              </span>
            </Subsection>
          ))}
        </div>
      </Section>

      <Section
        title="Structure — chip/*"
        description="Tighter padding ramp on Badge."
      >
        <div className="flex flex-wrap items-end gap-layout-section">
          {chipSizes.map((size) => (
            <Subsection key={size} title={size}>
              <Badge size={size}>Badge</Badge>
              <span className="type-body-sm text-text-secondary">
                {`chip-padding-x-${size} / chip-padding-y-${size}`}
              </span>
            </Subsection>
          ))}
        </div>
      </Section>

      <Section
        title="Component padding & size"
        description="Every shipped component: padding-x / padding-y when assigned, otherwise size tokens. Values resolve live from CSS variables."
      >
        <Callout role="info" title="How to read the table">
          <Prose>
            <span>
              Shared Structure families are <code>control/*</code> (Button,
              Input, Select, ButtonGroup, Tooltip) and <code>chip/*</code>{" "}
              (Badge, Tag, Tabs items). Uniform <code>padding</code> tokens
              appear in both X and Y columns. Size-only controls leave padding
              as — and list their size tokens instead.
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
              cell: (r) => r.part ?? <DataTableEmpty />,
            },
            {
              key: "size",
              header: "Size",
              width: "sm",
              cell: (r) => r.size,
            },
            {
              key: "padX",
              header: "Padding X",
              width: "md",
              cell: (r) => tokenStack(r.paddingX ?? r.padding),
            },
            {
              key: "padY",
              header: "Padding Y",
              width: "md",
              cell: (r) => tokenStack(r.paddingY ?? r.padding),
            },
            {
              key: "sizes",
              header: "Size / other",
              width: "lg",
              cell: (r) => sizeStacks(r.sizeTokens),
            },
          ]}
          rows={tableRows}
          getRowKey={(r) => r.id}
        />
      </Section>
    </DocsPage>
  );
}
