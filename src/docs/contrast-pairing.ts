/**
 * Contrast pairing rules — which background a colour token is measured against (spec §5).
 *
 * Component → Structure → Surface → Role → Primitive. Pairings mirror real usage,
 * not “every colour vs canvas”.
 */

export type SurfaceContext = "canvas" | "surface" | "surface-raised";

export type ContrastCheck = {
  /** CSS custom property used as foreground in the WCAG ratio. */
  fgCssVar: string;
  /** CSS custom property used as background in the WCAG ratio. */
  bgCssVar: string;
  /** Minimum ratio required for a pass (ignored when exemptReason is set for verdict). */
  required: number;
  /**
   * When set, the browser/report verdict is `exempt` (ratio is still computed and shown).
   * Used for intentional hierarchy / disabled / decorative cases.
   */
  exemptReason?: string;
  /** Extra documentation shown alongside the check. */
  note?: string;
};

function contextBgVar(context: SurfaceContext): string {
  if (context === "surface-raised") return "--bg-surface-raised";
  if (context === "surface") return "--bg-surface";
  return "--bg-canvas";
}

/** Status / role families that have matching soft fills and borders. */
const ROLE_BORDER_FAMILIES = [
  "ai",
  "danger",
  "info",
  "success",
  "warning",
] as const;

const DISABLED_EXEMPT =
  "Disabled appearance — intentionally below body-text contrast so the control reads as inactive.";

const TERTIARY_EXEMPT =
  "Tertiary hierarchy — quieter than secondary by design; not held to 4.5:1 body-text.";

const NEUTRAL_STRONG_NOTE =
  "Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong.";

const DECORATIVE_SUBTLE_EXEMPT =
  "Decorative trim. The card's fill contrast and shadow carry the container boundary; the outline is not load-bearing.";

const DECORATIVE_BORDER_NOTE =
  "Decorative hairline (border/neutral) — not state-conveying chrome; threshold 1.5:1 instead of 3:1.";

/**
 * Full contrast check for a token name (CSS path with hyphens, e.g. `text-on-strong`).
 * Returns null when the token has no defined pairing (e.g. selected-*).
 */
export function contrastCheckForToken(
  tokenName: string,
  context: SurfaceContext = "canvas",
): ContrastCheck | null {
  const canvasOrContext = contextBgVar(context);

  // ——— Foregrounds that only live on specific fills (never on canvas) ———
  if (tokenName === "text-on-strong") {
    // Representative chromatic strong fill (warning and neutral use other on-* tokens).
    return {
      fgCssVar: "--text-on-strong",
      bgCssVar: "--bg-info-strong",
      required: 4.5,
      note: "On chromatic strong fills (info/success/danger/ai); not canvas, not warning, not neutral-strong.",
    };
  }
  if (tokenName === "text-on-strong-warning") {
    return {
      fgCssVar: "--text-on-strong-warning",
      bgCssVar: "--bg-warning-strong",
      required: 4.5,
    };
  }
  if (tokenName === "text-on-inverse" || tokenName === "icon-on-inverse") {
    return {
      fgCssVar: `--${tokenName}`,
      bgCssVar: "--bg-neutral-strong",
      required: 4.5,
      note: "On inverted neutral-strong (and similar inverse fills); not canvas. Neutral strong inverts, so this is the matching ink.",
    };
  }

  // ——— Known hierarchy / disabled exemptions (still measured on context bg) ———
  if (tokenName === "text-disabled" || tokenName === "icon-disabled") {
    return {
      fgCssVar: `--${tokenName}`,
      bgCssVar: canvasOrContext,
      required: 4.5,
      exemptReason: DISABLED_EXEMPT,
    };
  }
  if (tokenName === "text-tertiary" || tokenName === "icon-tertiary") {
    return {
      fgCssVar: `--${tokenName}`,
      bgCssVar: canvasOrContext,
      required: 4.5,
      exemptReason: TERTIARY_EXEMPT,
    };
  }

  // ——— Role borders wrap their soft banners ———
  for (const family of ROLE_BORDER_FAMILIES) {
    if (tokenName === `border-${family}`) {
      return {
        fgCssVar: `--border-${family}`,
        bgCssVar: `--bg-${family}-soft`,
        required: 3,
        note: `State border on bg/${family}/soft (banner / callout), not canvas.`,
      };
    }
  }

  // ——— Decorative hairlines ———
  if (tokenName === "border-subtle") {
    return {
      fgCssVar: "--border-subtle",
      bgCssVar: canvasOrContext,
      required: 3,
      exemptReason: DECORATIVE_SUBTLE_EXEMPT,
    };
  }
  if (tokenName === "border-neutral") {
    return {
      fgCssVar: "--border-neutral",
      bgCssVar: canvasOrContext,
      required: 1.5,
      note: DECORATIVE_BORDER_NOTE,
    };
  }

  // ——— Token is a background: which foreground sits on it? ———
  if (tokenName.startsWith("bg-")) {
    // Neutral strong inverts — pair with on-inverse, not on-strong.
    if (
      tokenName === "bg-neutral-strong" ||
      tokenName === "bg-neutral-strong-hover" ||
      tokenName === "bg-neutral-strong-active"
    ) {
      return {
        fgCssVar: "--text-on-inverse",
        bgCssVar: `--${tokenName}`,
        required: 4.5,
        note: NEUTRAL_STRONG_NOTE,
      };
    }
    if (tokenName.includes("warning") && tokenName.includes("strong")) {
      return {
        fgCssVar: "--text-on-strong-warning",
        bgCssVar: `--${tokenName}`,
        required: 4.5,
      };
    }
    if (tokenName.includes("strong") || tokenName.includes("tooltip")) {
      return {
        fgCssVar: "--text-on-strong",
        bgCssVar: `--${tokenName}`,
        required: 4.5,
      };
    }
    if (tokenName.includes("soft")) {
      const family = tokenName.match(/^bg-([a-z]+)-soft$/)?.[1];
      if (family && family !== "neutral") {
        return {
          fgCssVar: `--text-${family}`,
          bgCssVar: `--${tokenName}`,
          required: 4.5,
        };
      }
      return {
        fgCssVar: "--text-primary",
        bgCssVar: `--${tokenName}`,
        required: 4.5,
      };
    }
    // canvas / surface / disabled / etc. — body text on the fill
    return {
      fgCssVar: "--text-primary",
      bgCssVar: `--${tokenName}`,
      required: 4.5,
    };
  }

  // ——— Remaining text / icon / border / focus on ambient context ———
  if (
    tokenName.startsWith("text-") ||
    tokenName.startsWith("icon-") ||
    tokenName.startsWith("border-") ||
    tokenName.startsWith("focus-")
  ) {
    const required =
      tokenName.startsWith("border-") || tokenName.startsWith("focus-")
        ? 3
        : 4.5;
    return {
      fgCssVar: `--${tokenName}`,
      bgCssVar: canvasOrContext,
      required,
    };
  }

  if (tokenName.startsWith("surface-")) {
    const required =
      tokenName === "surface-border" || tokenName === "surface-control"
        ? 3
        : 3;
    return {
      fgCssVar: `--${tokenName}`,
      bgCssVar: canvasOrContext,
      required,
    };
  }

  // Primitives: against context so live edits are visible in the browser
  if (
    /^(neutral|cherry|amber|green|ocean|violet|brand|berry|yellow)-\d+$/.test(
      tokenName,
    ) ||
    /^yellow-/.test(tokenName)
  ) {
    return {
      fgCssVar: `--${tokenName}`,
      bgCssVar: canvasOrContext,
      required: 4.5,
    };
  }

  return null;
}

/** @deprecated Prefer contrastCheckForToken — kept for call sites that only need a bg var. */
export function contrastAgainstCssVar(
  tokenName: string,
  context: SurfaceContext,
): string | null {
  const check = contrastCheckForToken(tokenName, context);
  if (!check) return null;
  // When the token is the background, callers historically expected null here.
  if (check.bgCssVar === `--${tokenName}`) return null;
  return check.bgCssVar;
}

/** @deprecated Prefer contrastCheckForToken. */
export function contrastForegroundForBg(tokenName: string): string | null {
  const check = contrastCheckForToken(tokenName, "canvas");
  if (!check) return null;
  if (check.bgCssVar === `--${tokenName}`) return check.fgCssVar;
  return null;
}

/** Verdict for a measured ratio given its check definition. */
export function contrastVerdict(
  ratio: number | null,
  check: ContrastCheck,
): "pass" | "fail" | "exempt" | "unknown" {
  if (check.exemptReason) return "exempt";
  if (ratio === null || Number.isNaN(ratio)) return "unknown";
  return ratio >= check.required ? "pass" : "fail";
}
