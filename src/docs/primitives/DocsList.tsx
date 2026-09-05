/**
 * DocsList — styled list for docs (replaces raw ul/ol + list-disc).
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function DocsList({
  items,
  ordered = false,
  className,
}: {
  items: ReactNode[];
  ordered?: boolean;
  className?: string;
}) {
  const Comp = ordered ? "ol" : "ul";
  return (
    <Comp
      className={cn(
        "max-w-measure-prose list-outside type-body-md text-text-secondary",
        ordered ? "list-decimal" : "list-disc",
        "flex flex-col gap-layout-stack pl-layout-section",
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Comp>
  );
}
