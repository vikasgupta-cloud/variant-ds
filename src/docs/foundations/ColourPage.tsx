/**
 * Foundations / Colour — primitives, roles, surface grid via docs primitives.
 */
import {
  aliasChain,
  resolveColor,
  toHex,
  tokensByLayer,
  tokensWhere,
  useFoundationsTick,
  useTokenIndex,
} from "./catalog";
import {
  Callout,
  DataTable,
  DocsPage,
  PageHeader,
  Prose,
  Section,
  Subsection,
  SwatchGrid,
} from "../primitives";

const COLOR_FAMILIES = [
  "neutral",
  "cherry",
  "amber",
  "green",
  "ocean",
  "berry",
  "yellow",
] as const;

const ROLE_GROUPS = ["bg", "text", "icon", "border"] as const;
const SURFACE_FAMILIES = ["level-1", "level-2", "level-3", "border"] as const;
const CONTEXTS = ["canvas", "surface", "surface-raised"] as const;

function stepSort(a: string, b: string): number {
  const na = Number(a);
  const nb = Number(b);
  if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
  return a.localeCompare(b);
}

export function ColourPage() {
  const { tick, mode, root } = useFoundationsTick();
  const byName = useTokenIndex();
  void tick;

  const primitives = tokensWhere(
    (t) =>
      t.layer === "primitive" &&
      t.type === "color" &&
      COLOR_FAMILIES.includes(t.path[0] as (typeof COLOR_FAMILIES)[number]),
  );

  const byFamily = new Map<string, typeof primitives>();
  for (const t of primitives) {
    const fam = t.path[0] ?? "unknown";
    const list = byFamily.get(fam) ?? [];
    list.push(t);
    byFamily.set(fam, list);
  }
  for (const list of byFamily.values()) {
    list.sort((a, b) => stepSort(a.path[1] ?? "", b.path[1] ?? ""));
  }

  const roles = tokensByLayer("role").filter((t) =>
    ROLE_GROUPS.some((g) => t.path[0] === g),
  );

  const surface = tokensByLayer("surface").filter((t) =>
    SURFACE_FAMILIES.includes(t.path[1] as (typeof SURFACE_FAMILIES)[number]),
  );

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Colour"
        description="Primitive ramps, role vocabulary, and surface levels — from compiled tokens.json. Toggle Mode in the toolbar; resolved values update live."
      />

      <Section
        title="Primitive ramps"
        description="Every colour primitive as swatch rows: step, hex, and token name."
      >
        {COLOR_FAMILIES.map((family) => {
          const steps = byFamily.get(family) ?? [];
          if (!steps.length) return null;
          return (
            <Subsection key={family} title={family}>
              <SwatchGrid
                items={steps.map((token) => {
                  const hex =
                    toHex(resolveColor(token.cssVar, root)) ??
                    (typeof token.value === "string" ? token.value : "—");
                  return {
                    key: token.name,
                    color: `var(${token.cssVar})`,
                    label: (
                      <span className="font-mono type-numeric-sm">
                        {token.path[1]} · {token.name}
                      </span>
                    ),
                    value: hex,
                  };
                })}
              />
            </Subsection>
          );
        })}
      </Section>

      <Section
        title="Role tokens"
        description={`Grouped by property. Active Mode: ${mode}. Alias chain shows the reference path into primitives.`}
      >
        {ROLE_GROUPS.map((group) => {
          const rows = roles
            .filter((t) => t.path[0] === group)
            .sort((a, b) => a.name.localeCompare(b.name));
          return (
            <Subsection key={group} title={`${group}/`}>
              <DataTable
                columns={[
                  {
                    key: "token",
                    header: "Token",
                    cell: (token) => (
                      <span className="inline-flex items-center gap-8">
                        <span
                          className="inline-block size-16 shrink-0 rounded-sm border border-border-subtle"
                          style={{ background: `var(${token.cssVar})` }}
                        />
                        <span className="font-mono type-numeric-sm">
                          {token.name}
                        </span>
                      </span>
                    ),
                  },
                  {
                    key: "resolved",
                    header: "Resolved",
                    mono: true,
                    cell: (token) =>
                      toHex(resolveColor(token.cssVar, root)) ?? "—",
                  },
                  {
                    key: "alias",
                    header: "Alias chain",
                    mono: true,
                    cell: (token) =>
                      aliasChain(token, mode, byName).join(" → "),
                  },
                  {
                    key: "desc",
                    header: "Description",
                    cell: (token) => (
                      <span className="type-body-sm text-text-secondary">
                        {token.description}
                      </span>
                    ),
                  },
                ]}
                rows={rows}
                getRowKey={(t) => t.name}
              />
            </Subsection>
          );
        })}
      </Section>

      <Section
        title="Surface layer"
        description="Four families × three contexts. Each cell sets its own data-context so surface tokens resolve correctly."
      >
        <Callout role="info" title="Context">
          <Prose>
            <span>
              Surface values change with Mode and the nearest{" "}
              <code>data-context</code>. The grid below renders each context
              column under that attribute.
            </span>
          </Prose>
        </Callout>
        <DataTable
          columns={[
            {
              key: "family",
              header: "Family",
              mono: true,
              cell: (r) => r.family,
            },
            ...CONTEXTS.map((context) => ({
              key: context,
              header: context,
              cell: (r: {
                family: string;
                cells: Record<string, { alias: string; cssVar: string }>;
              }) => {
                const cell = r.cells[context];
                return (
                  <div
                    data-context={context}
                    className="flex flex-col gap-8 rounded-sm border border-border-subtle bg-bg-canvas p-8"
                  >
                    <span
                      className="block h-48 rounded-sm border border-border-subtle"
                      style={{ background: `var(${cell?.cssVar})` }}
                    />
                    <span className="font-mono type-numeric-sm text-text-tertiary">
                      {cell?.alias ?? "—"}
                    </span>
                  </div>
                );
              },
            })),
          ]}
          rows={SURFACE_FAMILIES.map((family) => {
            const token = surface.find((t) => t.path[1] === family);
            const cells = Object.fromEntries(
              CONTEXTS.map((context) => {
                const key = `${mode}/${context}`;
                return [
                  context,
                  {
                    alias:
                      token?.valueByContext?.[key] != null
                        ? String(token.valueByContext[key])
                        : "—",
                    cssVar: `--surface-${family}`,
                  },
                ];
              }),
            );
            return { family: `surface/${family}`, cells };
          })}
          getRowKey={(r) => r.family}
        />
      </Section>
    </DocsPage>
  );
}
