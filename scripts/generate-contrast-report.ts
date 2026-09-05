/**
 * Generates docs/contrast-report.md from role tokens using src/docs/contrast-pairing.ts.
 * Run: node --experimental-strip-types scripts/generate-contrast-report.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  contrastCheckForToken,
  contrastVerdict,
} from "../src/docs/contrast-pairing.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(
  readFileSync(join(root, "src/styles/tokens/tokens.json"), "utf8"),
);
const primitive = JSON.parse(
  readFileSync(join(root, "tokens/primitive.json"), "utf8"),
);

function hexToRgb(hex: string) {
  const cleaned = hex.trim().replace(/^#/, "");
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

function channelToLinear(c: number) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

function contrastRatio(fg: string, bg: string) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function resolveColorRef(value: string): string {
  if (value.startsWith("#")) return value.toLowerCase();
  const m = value.match(/^\{([a-z0-9-]+)\.([a-z0-9.-]+)\}$/i);
  if (!m) throw new Error(`Cannot resolve: ${value}`);
  const family = m[1]!;
  const step = m[2]!;
  const token = primitive[family]?.[step];
  if (!token) throw new Error(`Missing primitive ${family}.${step}`);
  const next = token.$value ?? token.value;
  if (typeof next === "string" && next.startsWith("{")) {
    return resolveColorRef(next);
  }
  return String(next).toLowerCase();
}

type RoleEntry = {
  name: string;
  cssVar: string;
  raw: string;
  hex: string;
};

function buildResolvedMap(mode: "light" | "dark"): Map<string, RoleEntry> {
  const map = new Map<string, RoleEntry>();
  for (const t of catalog.tokens.filter(
    (x: { layer: string }) => x.layer === "role",
  )) {
    const raw = String(t.valueByMode?.[mode] ?? t.value);
    map.set(t.name, {
      name: t.name,
      cssVar: t.cssVar,
      raw,
      hex: resolveColorRef(raw),
    });
  }
  return map;
}

function hexForCssVar(
  cssVar: string,
  resolved: Map<string, RoleEntry>,
): string | null {
  const name = cssVar.replace(/^--/, "");
  return resolved.get(name)?.hex ?? null;
}

const modes = ["light", "dark"] as const;
const roleTokens = catalog.tokens
  .filter((t: { layer: string }) => t.layer === "role")
  .sort((a: { name: string }, b: { name: string }) =>
    a.name.localeCompare(b.name),
  );

const lines: string[] = [];
lines.push("# Role token contrast report");
lines.push("");
lines.push(
  "Generated with `src/docs/contrast-pairing.ts` (same rules as the Token Browser), measured on **canvas** context unless a token has a dedicated fill pair.",
);
lines.push("");
lines.push("### Pairing rules");
lines.push("");
lines.push(
  "- `text-on-strong` → `bg-info-strong` (chromatic strong; not canvas / warning / neutral-strong)",
);
lines.push("- `text-on-strong-warning` → `bg-warning-strong`");
lines.push("- `text-on-inverse` / `icon-on-inverse` → `bg-neutral-strong` (invert fill)");
lines.push(
  "- `bg-neutral-strong` (+ hover/active) → `text-on-inverse` — neutral inverts, so it does **not** use `text-on-strong`",
);
lines.push("- `border-{role}` → `bg-{role}-soft` (banner chrome, not canvas)");
lines.push(
  "- `border-subtle` → decorative trim; verdict **exempt** (fill + shadow/sm carry the card boundary)",
);
lines.push(
  "- `text-disabled` / `icon-disabled` / `text-tertiary` / `icon-tertiary` → measured on canvas, verdict **exempt** with reason",
);
lines.push("");
lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`);
lines.push("");

const counts = { pass: 0, fail: 0, exempt: 0, na: 0 };

for (const mode of modes) {
  const resolved = buildResolvedMap(mode);
  lines.push(`## ${mode}`);
  lines.push("");
  lines.push(
    "| Token | Resolved value | Background | Ratio | Required | Pass/fail | Notes |",
  );
  lines.push("| --- | --- | --- | ---: | ---: | --- | --- |");

  for (const t of roleTokens) {
    const entry = resolved.get(t.name)!;
    const check = contrastCheckForToken(t.name, "canvas");

    if (!check) {
      counts.na++;
      lines.push(
        `| \`${t.name}\` | \`${entry.hex}\` (${entry.raw}) | — | — | — | n/a | No browser pairing |`,
      );
      continue;
    }

    const fgHex = hexForCssVar(check.fgCssVar, resolved);
    const bgHex = hexForCssVar(check.bgCssVar, resolved);
    if (!fgHex || !bgHex) {
      counts.na++;
      lines.push(
        `| \`${t.name}\` | \`${entry.hex}\` (${entry.raw}) | \`${check.bgCssVar}\` | — | ${check.required}:1 | n/a | Could not resolve pair |`,
      );
      continue;
    }

    const ratio = contrastRatio(fgHex, bgHex);
    const verdict = contrastVerdict(ratio, check);
    if (verdict === "pass") counts.pass++;
    else if (verdict === "fail") counts.fail++;
    else if (verdict === "exempt") counts.exempt++;
    else counts.na++;

    const bgName = check.bgCssVar.replace(/^--/, "");
    const background =
      check.bgCssVar === `--${t.name}`
        ? `fg \`${check.fgCssVar.replace(/^--/, "")}\` (${fgHex}) on this token`
        : `\`${bgName}\` (${bgHex})`;

    const notes = [check.note, check.exemptReason].filter(Boolean).join(" ");

    lines.push(
      `| \`${t.name}\` | \`${entry.hex}\` (${entry.raw}) | ${background} | ${ratio.toFixed(2)}:1 | ${check.required}:1 | ${verdict} | ${notes || "—"} |`,
    );
  }
  lines.push("");
}

lines.push("## Summary");
lines.push("");
lines.push("| Result | Count |");
lines.push("| --- | ---: |");
lines.push(`| pass | ${counts.pass} |`);
lines.push(`| fail | ${counts.fail} |`);
lines.push(`| exempt | ${counts.exempt} |`);
lines.push(`| n/a | ${counts.na} |`);
lines.push(
  `| total rows | ${counts.pass + counts.fail + counts.exempt + counts.na} |`,
);
lines.push("");

const out = join(root, "docs/contrast-report.md");
writeFileSync(out, lines.join("\n"));
console.log(`Wrote ${out}`);
console.log(counts);
