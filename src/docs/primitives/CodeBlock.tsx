/**
 * CodeBlock — surface/level-1, radius/sm, border/subtle, layout/card padding, numeric/sm.
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-sm border border-border-subtle bg-surface-level-1",
        "p-layout-card font-mono type-numeric-sm text-text-primary",
        className,
      )}
    >
      {children}
    </pre>
  );
}
