/**
 * Tooltip variant map — Role fills only (bg/tooltip + text/on-inverse).
 */
import { cva, type VariantProps } from "class-variance-authority";

export const tooltipContentVariants = cva(
  [
    "z-[calc(var(--z-modal)+10)]",
    "max-w-64 rounded-control px-control-padding-x-sm py-control-padding-y-sm",
    "bg-bg-tooltip text-text-on-inverse type-body-sm",
    "shadow-sm",
  ].join(" "),
);

export type TooltipContentVariantProps = VariantProps<
  typeof tooltipContentVariants
>;
