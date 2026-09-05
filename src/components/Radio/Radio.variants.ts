/**
 * Radio variant map — Role + Surface field fills. Component tokens: size, radius, dot size.
 * Selected indicator uses bg/neutral/strong. Focus ring matches Button.
 */
import { cva, type VariantProps } from "class-variance-authority";

export type RadioSize = "sm" | "md" | "lg";

/** Design-review affordance on RadioItem — not for production. */
export type RadioState =
  | "default"
  | "unselected"
  | "selected"
  | "disabled"
  | "focused";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  "data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
  "data-[state=focused]:outline-[length:var(--focus-ring-width)]",
  "data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

export const radioItemVariants = cva(
  [
    "shrink-0 appearance-none",
    "inline-flex items-center justify-center",
    "rounded-radio border border-border-default bg-surface-field",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    focusRing,
    "data-[state=checked]:border-border-default",
    "disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-bg-disabled",
    "data-[disabled]:cursor-not-allowed data-[disabled]:border-border-subtle data-[disabled]:bg-bg-disabled",
    "data-[state=disabled]:cursor-not-allowed data-[state=disabled]:border-border-subtle data-[state=disabled]:bg-bg-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-radio-size-sm",
        md: "size-radio-size-md",
        lg: "size-radio-size-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const radioDotSize = {
  sm: "size-radio-dot-size-sm",
  md: "size-radio-dot-size-md",
  lg: "size-radio-dot-size-lg",
} as const;

export const radioGroupVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-col gap-control-label-gap",
      horizontal: "flex-row flex-wrap items-center gap-layout-stack",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type RadioItemVariantProps = VariantProps<typeof radioItemVariants>;
export type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;
