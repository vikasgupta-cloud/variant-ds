/**
 * Section — major docs block. Title heading/lg + optional description + children.
 * Margin-top dimension/64 between siblings (first has none).
 * Subsection — layout/section (32) between nested blocks.
 */
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Section({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mt-64 flex flex-col gap-layout-section first:mt-0",
        className,
      )}
    >
      <div className="flex flex-col gap-layout-stack">
        <h2 className="type-heading-lg text-text-primary">{title}</h2>
        {description ? (
          <div className="max-w-measure-prose type-body-md text-text-secondary">
            {description}
          </div>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Subsection({
  title,
  description,
  children,
  className,
}: {
  title?: string;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-layout-section flex flex-col gap-layout-stack first:mt-0",
        className,
      )}
    >
      {title ? (
        <h3 className="type-heading-sm text-text-primary">{title}</h3>
      ) : null}
      {description ? (
        <div className="max-w-measure-prose type-body-md text-text-secondary">
          {description}
        </div>
      ) : null}
      {children}
    </div>
  );
}
