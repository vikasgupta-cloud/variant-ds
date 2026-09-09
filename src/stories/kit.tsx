/**
 * Shared Storybook helpers for the five-story component set:
 * All variants · States · Content · Layout · Playground
 *
 * Mode and Context come from the toolbar — never hardcode either here.
 * Pseudo-states for the States story use storybook-addon-pseudo-states
 * via `pseudoStateParams` + `data-pseudo` on the forced cells.
 */
import type { ReactNode } from "react";
import { Icon } from "../components/Icon";
import { ReleasePhaseBadge } from "../docs/ReleasePhaseBadge";
import type { ReleasePhase } from "../docs/release-phase";
import { cn } from "../lib/cn";

/** Target cells in a States grid so hover/active/focus-visible show side by side. */
export const pseudoStateParams = {
  hover: '[data-pseudo="hover"]',
  active: '[data-pseudo="active"]',
  focusVisible: '[data-pseudo="focus-visible"]',
} as const;

/**
 * Shared chrome for variant / state matrix tables in stories.
 * No fill — inherits the preview `data-context` background so Mode/Context
 * toolbar changes stay visible.
 */
export function StoryTable({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-control border border-border-subtle bg-transparent",
        className,
      )}
      tabIndex={0}
    >
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

export const storyThClass =
  "px-16 py-12 text-left type-body-sm-medium text-text-primary";
export const storyTdClass =
  "px-16 py-16 align-middle type-body-md text-text-primary";
export const storyTdLabelClass =
  "px-16 py-16 align-middle type-body-md text-text-primary whitespace-nowrap";

export function StoryHeading({
  title,
  description,
  phase = "beta",
}: {
  title: string;
  description?: ReactNode;
  /** Release phase badge — all shipped components are Beta for now. */
  phase?: ReleasePhase;
}) {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-8">
        <h1 className="type-heading-lg text-text-primary">{title}</h1>
        <ReleasePhaseBadge phase={phase} />
      </div>
      {description ? (
        <p className="max-w-2xl type-body-md text-text-secondary">{description}</p>
      ) : null}
    </header>
  );
}

export function StorySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="type-body-sm-semibold uppercase tracking-wide text-text-secondary">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Leading / demo icon for Button stories — Phosphor Plus via Icon wrapper. */
export function PlaceholderIcon() {
  return <Icon name="plus" className="size-full" />;
}

/** Search field prefix — Phosphor MagnifyingGlass via Icon wrapper. */
export function SearchIcon() {
  return <Icon name="magnifying-glass" className="size-full" />;
}

/** Dropdown / select chevron — Phosphor CaretDown via Icon wrapper. */
export function ChevronIcon() {
  return <Icon name="caret-down" className="size-full" />;
}
