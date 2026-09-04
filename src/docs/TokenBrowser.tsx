/**
 * TokenBrowser — Foundations/Tokens tables from compiled tokens.json (spec §5).
 * Live WCAG contrast vs the background each colour is used on; refreshes on mode / overrides.
 * Reads mode/context from the theme root DOM (no Storybook preview hooks — those are decorator-only).
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import catalog from "../styles/tokens/tokens.json";
import { ContrastBadge } from "./ContrastBadge";
import {
  contrastCheckForToken,
  type ContrastCheck,
  type SurfaceContext,
} from "./contrast-pairing";
import { contrastRatio, resolveCssColorVar } from "./contrast";
import type { CatalogToken, TokenCatalog, TokenLayer } from "./token-types";

const CONTRAST_REFRESH_EVENT = "variant-ds:refresh-contrast";

const data = catalog as TokenCatalog;

const LAYERS: TokenLayer[] = [
  "primitive",
  "role",
  "surface",
  "structure",
  "overlay",
  "component",
];

function findTokenRoot(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>("[data-token-root]") ??
    document.querySelector<HTMLElement>("[data-mode]") ??
    document.documentElement
  );
}

function readModeContext(root: HTMLElement | null): {
  mode: "light" | "dark";
  context: SurfaceContext;
} {
  const mode =
    (root?.closest("[data-mode]")?.getAttribute("data-mode") as
      | "light"
      | "dark"
      | null) ??
    (root?.getAttribute("data-mode") as "light" | "dark" | null) ??
    "light";
  const context =
    (root?.closest("[data-context]")?.getAttribute("data-context") as SurfaceContext | null) ??
    (root?.getAttribute("data-context") as SurfaceContext | null) ??
    "canvas";
  return { mode, context };
}

function Swatch({ color }: { color: string | null }) {
  if (!color) {
    return (
      <span className="inline-block size-6 rounded-sm border border-border-subtle bg-bg-neutral-soft" />
    );
  }
  return (
    <span
      className="inline-block size-6 rounded-sm border border-border-subtle"
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}

function formatSourceValue(
  token: CatalogToken,
  mode: string,
  context: string,
): string {
  if (token.valueByContext) {
    const key = `${mode}/${context}`;
    return String(token.valueByContext[key] ?? "—");
  }
  if (token.valueByMode) {
    return String(
      token.valueByMode[mode as "light" | "dark"] ??
        token.valueByMode.light ??
        "—",
    );
  }
  if (token.value !== null && token.value !== undefined) return String(token.value);
  return "—";
}

export function TokenBrowser() {
  const [tick, setTick] = useState(0);
  const [filter, setFilter] = useState("");
  const [layerFilter, setLayerFilter] = useState<TokenLayer | "all">("all");

  const bump = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    bump();
    const onRefresh = () => bump();
    window.addEventListener(CONTRAST_REFRESH_EVENT, onRefresh);

    const root = findTokenRoot();
    const mo =
      root &&
      new MutationObserver(() => bump());
    if (root && mo) {
      mo.observe(root, {
        attributes: true,
        attributeFilter: ["style", "data-mode", "data-context"],
      });
    }

    return () => {
      window.removeEventListener(CONTRAST_REFRESH_EVENT, onRefresh);
      mo?.disconnect();
    };
  }, [bump]);

  const root = findTokenRoot();
  const { mode, context } = readModeContext(root);

  const rows = useMemo(() => {
    void tick;
    const el = findTokenRoot();
    if (!el) return [];
    const { mode: m, context: c } = readModeContext(el);

    return data.tokens.map((token) => {
      const resolved =
        token.type === "color"
          ? resolveCssColorVar(token.cssVar, el)
          : getComputedStyle(el).getPropertyValue(token.cssVar).trim() || null;

      let ratio: number | null = null;
      let againstLabel: string | undefined;
      let check: ContrastCheck | null = null;

      if (token.type === "color" && resolved) {
        check = contrastCheckForToken(token.name, c);
        if (check) {
          const fg = resolveCssColorVar(check.fgCssVar, el);
          const bg = resolveCssColorVar(check.bgCssVar, el);
          ratio = fg && bg ? contrastRatio(fg, bg) : null;
          againstLabel = `${check.fgCssVar} on ${check.bgCssVar}`;
        }
      }

      return {
        token,
        resolved,
        ratio,
        againstLabel,
        check,
        source: formatSourceValue(token, m, c),
      };
    });
  }, [tick]);

  const filtered = rows.filter(({ token }) => {
    if (layerFilter !== "all" && token.layer !== layerFilter) return false;
    if (!filter.trim()) return true;
    const q = filter.trim().toLowerCase();
    return (
      token.name.includes(q) ||
      token.description.toLowerCase().includes(q) ||
      (token.alias?.includes(q) ?? false)
    );
  });

  const byLayer = LAYERS.map((layer) => ({
    layer,
    items: filtered.filter((r) => r.token.layer === layer),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 text-text-primary">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Tokens</h1>
        <p className="max-w-2xl text-sm text-text-secondary">
          Generated from compiled <code className="text-text-primary">tokens.json</code>.
          Colour contrast is live against the current Mode / Context toolbar — edit a
          primitive in the Tokens panel and these ratios update without a rebuild.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            aria-label="Filter tokens"
            placeholder="Filter tokens…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="min-w-64 rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-sm text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          />
          <select
            aria-label="Filter by layer"
            value={layerFilter}
            onChange={(e) =>
              setLayerFilter(e.target.value as TokenLayer | "all")
            }
            className="rounded-sm border border-border-default bg-bg-surface px-3 py-2 text-sm"
          >
            <option value="all">All layers</option>
            {LAYERS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <span className="text-xs text-text-tertiary">
            {filtered.length} tokens · mode={mode} · context={context}
          </span>
        </div>
      </header>

      {byLayer.map(({ layer, items }) => (
        <section key={layer} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
            {layer}
          </h2>
          <div className="overflow-x-auto rounded-sm border border-border-subtle">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-bg-neutral-soft text-xs uppercase tracking-wide text-text-tertiary">
                <tr>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Swatch</th>
                  <th className="px-3 py-2 font-medium">Resolved</th>
                  <th className="px-3 py-2 font-medium">Alias / source</th>
                  <th className="px-3 py-2 font-medium">Contrast</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {items.map(
                  ({ token, resolved, ratio, againstLabel, check, source }) => (
                    <tr
                      key={token.name}
                      className="border-t border-border-subtle align-top"
                    >
                      <td className="px-3 py-2 font-mono text-xs">
                        <div>{token.name}</div>
                        <div className="text-text-tertiary">{token.cssVar}</div>
                      </td>
                      <td className="px-3 py-2">
                        {token.type === "color" ? (
                          <Swatch color={resolved} />
                        ) : (
                          <span className="text-text-tertiary">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs tabular-nums">
                        {resolved ?? "—"}
                      </td>
                      <td className="px-3 py-2 font-mono text-xs text-text-secondary">
                        {token.alias ? (
                          <span>
                            → {token.alias}
                            <span className="mt-1 block text-text-tertiary">
                              {source}
                            </span>
                          </span>
                        ) : (
                          source
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {token.type === "color" ? (
                          <ContrastBadge
                            ratio={ratio}
                            check={check}
                            {...(againstLabel ? { against: againstLabel } : {})}
                          />
                        ) : (
                          <span className="text-text-tertiary">—</span>
                        )}
                      </td>
                      <td className="max-w-sm px-3 py-2 text-xs text-text-secondary">
                        {token.description}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
