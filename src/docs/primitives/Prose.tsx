/**
 * Prose — body/md, text/secondary, max-width layout/measure-prose,
 * layout/stack-loose between paragraphs.
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-measure-prose type-body-md text-text-secondary",
        "flex flex-col gap-layout-stack-loose",
        "[&_strong]:type-body-md-semibold [&_strong]:text-text-primary",
        "[&_code]:font-mono [&_code]:type-numeric-sm [&_code]:text-text-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
