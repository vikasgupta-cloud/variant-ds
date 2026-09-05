/**
 * Foundations / Contrast — live table from docs/contrast-report.md via docs primitives.
 */
import { useMemo } from "react";
import reportMd from "../../../docs/contrast-report.md?raw";
import { ContrastBadge } from "../ContrastBadge";
import { contrastRatio, resolveCssColorVar } from "../contrast";
import {
  contrastCheckForToken,
  contrastVerdict,
} from "../contrast-pairing";
import { toHex, useFoundationsTick } from "./catalog";
import {
  DataTable,
  DocsPage,
  PageHeader,
  Section,
} from "../primitives";

type ReportRow = {
  token: string;
  notes: string;
};

function parseReportSection(md: string, mode: "light" | "dark"): ReportRow[] {
  const heading = `## ${mode}`;
  const start = md.indexOf(heading);
  if (start < 0) return [];
  const rest = md.slice(start + heading.length);
  const next = rest.search(/\n## /);
  const section = next >= 0 ? rest.slice(0, next) : rest;
  const rows: ReportRow[] = [];
  for (const line of section.split("\n")) {
    if (!line.startsWith("| `")) continue;
    const cells = line
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cells.length < 6) continue;
    const first = cells[0] ?? "";
    if (first === "Token") continue;
    rows.push({
      token: first.replace(/`/g, ""),
      notes: cells[6] ?? cells[5] ?? "",
    });
  }
  return rows;
}

export function ContrastPage() {
  const { tick, mode, root } = useFoundationsTick();
  void tick;

  const rows = useMemo(() => parseReportSection(reportMd, mode), [mode]);

  const measured = rows.map((row) => {
    const check = contrastCheckForToken(row.token, "canvas");
    if (!check) {
      return {
        ...row,
        ratio: null as number | null,
        fg: null as string | null,
        bg: null as string | null,
        check: null,
        verdict: "n/a" as const,
      };
    }
    const fg = root ? resolveCssColorVar(check.fgCssVar, root) : null;
    const bg = root ? resolveCssColorVar(check.bgCssVar, root) : null;
    const ratio = fg && bg ? contrastRatio(fg, bg) : null;
    return {
      ...row,
      ratio,
      fg: toHex(fg),
      bg: toHex(bg),
      check,
      verdict: contrastVerdict(ratio, check),
    };
  });

  const summary = measured.reduce(
    (acc, row) => {
      const key = row.verdict === "unknown" ? "n/a" : row.verdict;
      acc[key] = (acc[key] ?? 0) + 1;
      acc.total = (acc.total ?? 0) + 1;
      return acc;
    },
    {
      pass: 0,
      tight: 0,
      fail: 0,
      exempt: 0,
      "n/a": 0,
      total: 0,
    } as Record<string, number>,
  );

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Contrast"
        description="Role token contrast from docs/contrast-report.md — ratios recomputed live against the active Mode."
      />

      <Section title="Summary">
        <div className="flex flex-wrap gap-8">
          {(
            [
              ["pass", summary.pass],
              ["tight", summary.tight],
              ["fail", summary.fail],
              ["exempt", summary.exempt],
              ["n/a", summary["n/a"]],
              ["total", summary.total],
            ] as const
          ).map(([label, count]) => (
            <div
              key={label}
              className="rounded-card border border-border-subtle bg-bg-surface px-card-padding py-8 text-center"
            >
              <div className="type-heading-md tabular-nums text-text-primary">
                {count}
              </div>
              <div className="type-body-sm-caps text-text-tertiary">
                {label}
                {label === "total" ? ` · ${mode}` : ""}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={`Live report · ${mode}`}>
        <DataTable
          columns={[
            {
              key: "token",
              header: "Token",
              mono: true,
              cell: (r) => r.token,
            },
            {
              key: "fg",
              header: "Foreground",
              cell: (r) =>
                r.check ? (
                  <span className="inline-flex items-center gap-8 font-mono type-numeric-sm">
                    <span
                      className="inline-block size-16 rounded-sm border border-border-subtle"
                      style={{ background: `var(${r.check.fgCssVar})` }}
                    />
                    {r.fg ?? r.check.fgCssVar}
                  </span>
                ) : (
                  "—"
                ),
            },
            {
              key: "bg",
              header: "Background",
              cell: (r) =>
                r.check ? (
                  <span className="inline-flex items-center gap-8 font-mono type-numeric-sm">
                    <span
                      className="inline-block size-16 rounded-sm border border-border-subtle"
                      style={{ background: `var(${r.check.bgCssVar})` }}
                    />
                    {r.bg ?? r.check.bgCssVar}
                  </span>
                ) : (
                  "—"
                ),
            },
            {
              key: "verdict",
              header: "Verdict",
              cell: (r) =>
                r.check ? (
                  <ContrastBadge ratio={r.ratio} check={r.check} />
                ) : (
                  <span className="type-body-sm-caps text-text-tertiary">
                    n/a
                  </span>
                ),
            },
            {
              key: "notes",
              header: "Notes",
              cell: (r) => (
                <span className="type-body-sm text-text-secondary">
                  {r.check?.exemptReason ??
                    r.check?.note ??
                    (r.notes === "—" ? "" : r.notes)}
                </span>
              ),
            },
          ]}
          rows={measured}
          getRowKey={(r) => r.token}
        />
      </Section>
    </DocsPage>
  );
}
