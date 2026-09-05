/**
 * TokenBrowser — Foundations/Tokens tables from compiled tokens.json via docs primitives.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import catalog from "../styles/tokens/tokens.json";
import { Input } from "../components/Input";
import { ContrastBadge } from "./ContrastBadge";
import {
  contrastCheckForToken,
  type ContrastCheck,
  type SurfaceContext,
} from "./contrast-pairing";
import { contrastRatio, resolveCssColorVar } from "./contrast";
import type { CatalogToken, TokenCatalog, TokenLayer } from "./token-types";
import {
  DataTable,
  Section,
} from "./primitives";

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
  if (token.value !== null && token.value !== undefined) {
    return typeof token.value === "object"
      ? JSON.stringify(token.value)
      : String(token.value);
  }
  return "—";
}

type BrowserRow = {
  token: CatalogToken;
  resolved: string | null;
  ratio: number | null;
  againstLabel?: string;
  check: ContrastCheck | null;
  source: string;
};

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
    const mo = root && new MutationObserver(() => bump());
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
    if (!el) return [] as BrowserRow[];
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
    <div className="flex flex-col gap-layout-section text-text-primary">
      <div className="flex flex-wrap items-end gap-8">
        <div className="min-w-64 flex-1">
          <Input
            type="search"
            label="Filter tokens"
            placeholder="Filter tokens…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <label className="flex flex-col gap-8 type-body-sm-medium text-text-secondary">
          Layer
          <select
            aria-label="Filter by layer"
            value={layerFilter}
            onChange={(e) =>
              setLayerFilter(e.target.value as TokenLayer | "all")
            }
            className="rounded-sm border border-border-default bg-bg-surface px-control-padding-x-md py-control-padding-y-sm type-body-md text-text-primary"
          >
            <option value="all">All layers</option>
            {LAYERS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <span className="type-body-sm text-text-tertiary">
          {filtered.length} tokens · mode={mode} · context={context}
        </span>
      </div>

      {byLayer.map(({ layer, items }) => (
        <Section key={layer} title={layer}>
          <DataTable
            columns={[
              {
                key: "name",
                header: "Name",
                mono: true,
                cell: (r) => (
                  <span>
                    <span className="block">{r.token.name}</span>
                    <span className="block text-text-tertiary">
                      {r.token.cssVar}
                    </span>
                  </span>
                ),
              },
              {
                key: "swatch",
                header: "Swatch",
                cell: (r) =>
                  r.token.type === "color" && r.resolved ? (
                    <span
                      className="inline-block size-24 rounded-sm border border-border-subtle"
                      style={{ backgroundColor: r.resolved }}
                    />
                  ) : (
                    <span className="text-text-tertiary">—</span>
                  ),
              },
              {
                key: "resolved",
                header: "Resolved",
                mono: true,
                cell: (r) => r.resolved ?? "—",
              },
              {
                key: "alias",
                header: "Alias / source",
                mono: true,
                cell: (r) =>
                  r.token.alias ? (
                    <span>
                      → {r.token.alias}
                      <span className="mt-8 block text-text-tertiary">
                        {r.source}
                      </span>
                    </span>
                  ) : (
                    r.source
                  ),
              },
              {
                key: "contrast",
                header: "Contrast",
                cell: (r) =>
                  r.token.type === "color" ? (
                    <ContrastBadge
                      ratio={r.ratio}
                      check={r.check}
                      {...(r.againstLabel
                        ? { against: r.againstLabel }
                        : {})}
                    />
                  ) : (
                    <span className="text-text-tertiary">—</span>
                  ),
              },
              {
                key: "desc",
                header: "Description",
                cell: (r) => (
                  <span className="type-body-sm text-text-secondary">
                    {r.token.description}
                  </span>
                ),
              },
            ]}
            rows={items}
            getRowKey={(r) => r.token.name}
          />
        </Section>
      ))}
    </div>
  );
}
