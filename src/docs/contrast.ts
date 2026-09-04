/**
 * WCAG contrast helpers for TokenBrowser / ContrastBadge / token editor.
 * Mirrors the build-time surface contrast gate maths.
 */

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(cleaned)) {
    return null;
  }
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned.slice(0, 6);
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function channelToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  return (
    0.2126 * channelToLinear(rgb.r) +
    0.7152 * channelToLinear(rgb.g) +
    0.0722 * channelToLinear(rgb.b)
  );
}

/** WCAG 2.x contrast ratio (1–21). Returns null if either colour is invalid. */
export function contrastRatio(fg: string, bg: string): number | null {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  if (l1 === null || l2 === null) return null;
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastLevel = "pass" | "tight" | "fail" | "unknown";

/** pass ≥4.5, tight ≥3, fail <3 — matches common UI chrome + text thresholds. */
export function contrastLevel(ratio: number | null): ContrastLevel {
  if (ratio === null || Number.isNaN(ratio)) return "unknown";
  if (ratio >= 4.5) return "pass";
  if (ratio >= 3) return "tight";
  return "fail";
}

/** Parse rgb(a)/hex from getComputedStyle into #rrggbb. */
export function cssColorToHex(css: string): string | null {
  const value = css.trim();
  if (value.startsWith("#")) {
    const rgb = hexToRgb(value);
    if (!rgb) return null;
    return (
      "#" +
      [rgb.r, rgb.g, rgb.b]
        .map((n) => n.toString(16).padStart(2, "0"))
        .join("")
    );
  }
  const m = value.match(
    /^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/i,
  );
  if (!m) return null;
  const [r, g, b] = [m[1], m[2], m[3]].map((n) =>
    Math.round(Number(n)).toString(16).padStart(2, "0"),
  );
  return `#${r}${g}${b}`;
}

export function readCssVar(
  name: string,
  el: Element | null = typeof document !== "undefined" ? document.documentElement : null,
): string | null {
  if (!el) return null;
  const raw = getComputedStyle(el).getPropertyValue(name).trim();
  if (!raw) return null;
  if (raw.startsWith("#") || raw.startsWith("rgb")) return cssColorToHex(raw) ?? raw;
  return raw;
}

/** Resolve a colour custom property to hex via a probe element under `root`. */
export function resolveCssColorVar(cssVar: string, root: Element): string | null {
  const probe = document.createElement("span");
  probe.style.color = `var(${cssVar})`;
  probe.style.display = "none";
  root.appendChild(probe);
  const hex = cssColorToHex(getComputedStyle(probe).color);
  probe.remove();
  return hex;
}
