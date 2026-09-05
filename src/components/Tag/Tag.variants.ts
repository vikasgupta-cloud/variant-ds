/**
 * Tag variant map — Surface level fills + chip structure tokens. Removable via Button ghost.
 * Axes: size. State is a design-review affordance (rest → default).
 */
import { cva, type VariantProps } from "class-variance-authority";

export type TagSize = "sm" | "md" | "lg";

/** Design-review affordance — map Figma “rest” → default. */
export type TagState = "default" | "hover" | "disabled";

export const tagVariants = cva(
  [
    "inline-flex items-center",
    "rounded-tag border border-transparent",
    "bg-surface-level-1 text-text-primary font-medium",
    "transition-colors motion-reduce:transition-none",
    "hover:bg-surface-level-2 data-[state=hover]:bg-surface-level-2",
    "data-[state=disabled]:pointer-events-none data-[state=disabled]:bg-bg-disabled",
    "data-[state=disabled]:text-text-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "gap-chip-gap-sm px-chip-padding-x-sm py-chip-padding-y-sm text-xs",
        md: "gap-chip-gap-md px-chip-padding-x-md py-chip-padding-y-md text-sm",
        lg: "gap-chip-gap-lg px-chip-padding-x-lg py-chip-padding-y-lg text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const tagIconSize = {
  sm: "size-icon-size-xs",
  md: "size-icon-size-sm",
  lg: "size-icon-size-sm",
} as const;

export type TagVariantProps = VariantProps<typeof tagVariants>;
