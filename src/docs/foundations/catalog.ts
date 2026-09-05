/**
 * Shared helpers for Foundations pages — always read from compiled tokens.json.
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import catalog from "../../styles/tokens/tokens.json";
import type { CatalogToken, TokenCatalog, TypographyValue } from "../token-types";

const CONTRAST_REFRESH_EVENT = "variant-ds:refresh-contrast";

export const tokenCatalog = catalog as TokenCatalog;

export function findTokenRoot(): HTMLElement | null {
  return (
    document.querySelector<HTMLElement>("[data-token-root]") ??
    document.querySelector<HTMLElement>("[data-mode]") ??
    document.documentElement
  );
}

export function readMode(root: HTMLElement | null): "light" | "dark" {
  return (
    (root?.closest("[data-mode]")?.getAttribute("data-mode") as
      | "light"
      | "dark"
      | null) ??
    (root?.getAttribute("data-mode") as "light" | "dark" | null) ??
    "light"
  );
}

/** Re-render Foundations pages when Mode / token overrides change. */
export function useFoundationsTick() {
  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    bump();
    const root = findTokenRoot();
    const obs = root
      ? new MutationObserver(bump)
      : null;
    if (root && obs) {
      obs.observe(root, {
        attributes: true,
        attributeFilter: ["data-mode", "data-context", "style", "class"],
      });
    }
    window.addEventListener(CONTRAST_REFRESH_EVENT, bump);
    return () => {
      obs?.disconnect();
      window.removeEventListener(CONTRAST_REFRESH_EVENT, bump);
    };
  }, [bump]);

  const root = findTokenRoot();
  const mode = readMode(root);
  return { tick, mode, root };
}

export function tokensByLayer(layer: CatalogToken["layer"]): CatalogToken[] {
  return tokenCatalog.tokens.filter((t) => t.layer === layer);
}

export function tokensWhere(
  pred: (t: CatalogToken) => boolean,
): CatalogToken[] {
  return tokenCatalog.tokens.filter(pred);
}

export function resolveCssVar(
  cssVar: string,
  root: HTMLElement | null,
): string | null {
  if (!root) return null;
  const raw = getComputedStyle(root).getPropertyValue(cssVar).trim();
  return raw || null;
}

/** Resolve a colour CSS var through the cascade to a computable colour. */
export function resolveColor(
  cssVar: string,
  root: HTMLElement | null,
): string | null {
  if (!root) return null;
  const probe = document.createElement("span");
  probe.style.color = `var(${cssVar})`;
  probe.style.display = "none";
  root.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  if (!color || color === "rgba(0, 0, 0, 0)") return null;
  return color;
}

export function toHex(cssColor: string | null): string | null {
  if (!cssColor) return null;
  if (cssColor.startsWith("#")) return cssColor.toLowerCase();
  const m = cssColor.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i,
  );
  if (!m) return cssColor;
  const hex = (n: string) => Number(n).toString(16).padStart(2, "0");
  return `#${hex(m[1]!)}${hex(m[2]!)}${hex(m[3]!)}`;
}

export function aliasChain(
  token: CatalogToken,
  mode: "light" | "dark",
  byName: Map<string, CatalogToken>,
): string[] {
  const chain: string[] = [token.name];
  let ref: string | null =
    (mode === "dark"
      ? token.valueByMode?.dark
      : token.valueByMode?.light) != null
      ? String(
          mode === "dark"
            ? token.valueByMode?.dark
            : token.valueByMode?.light,
        )
      : token.alias
        ? `{${token.alias.replace(/-/g, ".")}}`
        : token.value != null && typeof token.value === "string"
          ? token.value
          : null;

  const seen = new Set(chain);
  while (ref) {
    const m = String(ref).match(/^\{([a-z0-9.-]+)\}$/i);
    if (!m) {
      if (String(ref).startsWith("#")) chain.push(String(ref).toLowerCase());
      break;
    }
    const name = m[1]!.replace(/\./g, "-");
    if (seen.has(name)) break;
    seen.add(name);
    chain.push(name);
    const next = byName.get(name);
    if (!next) break;
    if (typeof next.value === "string" && next.value.startsWith("{")) {
      ref = next.value;
    } else if (typeof next.value === "string" && next.value.startsWith("#")) {
      chain.push(next.value.toLowerCase());
      break;
    } else if (next.alias) {
      ref = `{${next.alias.replace(/-/g, ".")}}`;
    } else {
      break;
    }
  }
  return chain;
}

export function useTokenIndex() {
  return useMemo(() => {
    const byName = new Map<string, CatalogToken>();
    for (const t of tokenCatalog.tokens) byName.set(t.name, t);
    return byName;
  }, []);
}

export function isTypographyValue(v: unknown): v is TypographyValue {
  return (
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    "fontFamily" in v &&
    "fontSize" in v
  );
}
