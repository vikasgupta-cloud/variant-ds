/**
 * DocsPage — page shell. Max-width layout/measure-page, padding dimension/48,
 * data-context="canvas".
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function DocsPage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-context="canvas"
      className={cn(
        "mx-auto w-full max-w-measure-page bg-bg-canvas p-48 text-text-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
