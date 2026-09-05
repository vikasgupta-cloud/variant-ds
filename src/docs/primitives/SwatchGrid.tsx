/**
 * SwatchGrid — colour swatches at radius/sm, border/subtle, layout/stack gaps,
 * label body/sm + value numeric/sm.
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SwatchItem = {
  key: string;
  /** CSS background — must be a Role/Surface/primitive CSS var. */
  color: string;
  label: ReactNode;
  value?: ReactNode;
};

export function SwatchGrid({
  items,
  className,
}: {
  items: SwatchItem[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-layout-stack", className)}>
      {items.map((item) => (
        <div
          key={item.key}
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-layout-stack"
        >
          <span
            className="size-32 shrink-0 rounded-sm border border-border-subtle"
            style={{ background: item.color }}
            title={typeof item.label === "string" ? item.label : undefined}
          />
          <span className="min-w-0 type-body-sm text-text-primary">
            {item.label}
          </span>
          {item.value != null ? (
            <span className="shrink-0 font-mono type-numeric-sm text-text-tertiary">
              {item.value}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
