/**
 * SpecimenRow — typography docs: label column + rendered sample.
 */
import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";

export function SpecimenRow({
  label,
  meta,
  sample,
  sampleStyle,
  className,
}: {
  label: ReactNode;
  meta?: ReactNode;
  sample: ReactNode;
  /** Apply typography CSS vars — values must be var(--display-… / --body-… / etc.). */
  sampleStyle?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-layout-stack border-b border-border-subtle pb-layout-section",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline gap-layout-stack">
        <span className="font-mono type-body-sm-semibold text-text-primary">
          {label}
        </span>
        {meta ? (
          <span className="font-mono type-numeric-sm text-text-tertiary">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="text-text-primary" style={sampleStyle}>
        {sample}
      </div>
    </div>
  );
}
