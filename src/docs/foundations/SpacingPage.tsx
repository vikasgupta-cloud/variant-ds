/**
 * Foundations / Spacing — dimension bars + control/chip on Button & Badge.
 */
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { tokensWhere, useFoundationsTick } from "./catalog";
import {
  DocsPage,
  PageHeader,
  Section,
  Subsection,
} from "../primitives";

function dimensionPx(value: string | number | null | undefined): number {
  if (value == null) return 0;
  const n = Number(String(value).replace(/px$/i, ""));
  return Number.isFinite(n) ? n : 0;
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

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="All dimension/* steps from tokens.json, then Structure control/* and chip/* on real Button and Badge instances."
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
                <span className="font-mono type-numeric-sm text-text-primary">
                  {token.name}
                </span>
                <span className="font-mono type-numeric-sm text-text-secondary">
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
              <span className="font-mono type-numeric-sm text-text-tertiary">
                control-padding-x-{size} / control-padding-y-{size}
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
              <span className="font-mono type-numeric-sm text-text-tertiary">
                chip-padding-x-{size} / chip-padding-y-{size}
              </span>
            </Subsection>
          ))}
        </div>
      </Section>
    </DocsPage>
  );
}
