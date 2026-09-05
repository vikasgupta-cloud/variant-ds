/**
 * Card variant map — Surface context + Role chrome. Component tokens: radius, padding.
 * Nested cards rely on data-context so surface/level-* resolve at each depth.
 */
import { cva, type VariantProps } from "class-variance-authority";

/** Design-review affordance — mainly meaningful for interactive cards. */
export type CardState = "default" | "hover" | "active" | "focused" | "disabled";

export const cardVariants = cva(
  [
    "flex w-full flex-col",
    "rounded-card border border-border-subtle shadow-sm",
    "p-card-padding type-body-md text-text-primary",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Sits on canvas/parent; establishes surface context for children.
        default: "bg-bg-surface",
        // Lifted panel; establishes surface-raised context.
        raised: "bg-bg-surface-raised",
        // Same chrome as default, with hover/active/focus for clickable cards.
        interactive: [
          "bg-bg-surface cursor-pointer",
          "hover:bg-surface-level-1 data-[state=hover]:bg-surface-level-1",
          "active:bg-surface-level-2 data-[state=active]:bg-surface-level-2",
          "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
          "focus-visible:outline-[length:var(--focus-ring-width)]",
          "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
          "data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
          "data-[state=focused]:outline-[length:var(--focus-ring-width)]",
          "data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
          "data-[state=disabled]:pointer-events-none data-[state=disabled]:opacity-60",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** data-context each variant establishes for nested Surface tokens. */
export const cardContext = {
  default: "surface",
  raised: "surface-raised",
  interactive: "surface",
} as const;

export type CardVariantProps = VariantProps<typeof cardVariants>;
