/**
 * ContrastBadge — pass / tight / fail / exempt using Role fills + type tokens.
 */
import { contrastLevel } from "./contrast";
import type { ContrastCheck } from "./contrast-pairing";
import { contrastVerdict } from "./contrast-pairing";

type Verdict = "pass" | "fail" | "exempt" | "unknown" | "tight";

const styles: Record<Verdict, string> = {
  pass: "bg-bg-success-soft text-text-success border-border-success",
  tight: "bg-bg-warning-soft text-text-warning border-border-warning",
  fail: "bg-bg-danger-soft text-text-danger border-border-danger",
  exempt: "bg-bg-neutral-soft text-text-secondary border-border-subtle",
  unknown: "bg-bg-neutral-soft text-text-tertiary border-border-subtle",
};

const labels: Record<Verdict, string> = {
  pass: "pass",
  tight: "tight",
  fail: "fail",
  exempt: "exempt",
  unknown: "—",
};

export function ContrastBadge({
  ratio,
  against,
  check,
}: {
  ratio: number | null;
  against?: string;
  check?: ContrastCheck | null;
}) {
  const verdict: Verdict = check
    ? contrastVerdict(ratio, check)
    : contrastLevel(ratio);

  const text =
    ratio === null || Number.isNaN(ratio) ? "—" : `${ratio.toFixed(2)}:1`;

  const titleParts = [
    against ? `Against ${against}` : null,
    check?.note,
    check?.exemptReason,
    check ? `Required ≥${check.required}:1` : null,
  ].filter(Boolean);

  return (
    <span
      className={`inline-flex items-center gap-8 rounded-sm border px-chip-padding-x-sm py-chip-padding-y-sm type-body-sm ${styles[verdict]}`}
      title={titleParts.length ? titleParts.join(" · ") : undefined}
    >
      <span className="type-body-sm-caps">
        {labels[verdict]}
      </span>
      <span className="font-mono type-numeric-sm tabular-nums">{text}</span>
    </span>
  );
}
