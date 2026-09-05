/**
 * Checkbox variant map — Role + Surface field fills. Component tokens: size, radius.
 * Checked fill is bg/neutral/strong (same decision as primary Button). Focus ring matches Button.
 */
import { cva, type VariantProps } from "class-variance-authority";

export type CheckboxSize = "sm" | "md" | "lg";

/** Design-review affordance — not for production. Default lets CSS / Radix handle interaction. */
export type CheckboxState =
  | "default"
  | "unchecked"
  | "checked"
  | "indeterminate"
  | "disabled"
  | "focused"
  | "error";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  "data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
  "data-[state=focused]:outline-[length:var(--focus-ring-width)]",
  "data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

export const checkboxVariants = cva(
  [
    "shrink-0 appearance-none",
    "inline-flex items-center justify-center",
    "rounded-checkbox border border-border-default bg-surface-field",
    "text-text-on-inverse",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    focusRing,
    "data-[state=checked]:border-transparent data-[state=checked]:bg-bg-neutral-strong",
    "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-bg-neutral-strong",
    "disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-bg-disabled disabled:text-text-disabled",
    "data-[disabled]:cursor-not-allowed data-[disabled]:border-border-subtle data-[disabled]:bg-bg-disabled data-[disabled]:text-text-disabled",
    "data-[state=disabled]:cursor-not-allowed data-[state=disabled]:border-border-subtle data-[state=disabled]:bg-bg-disabled data-[state=disabled]:text-text-disabled",
    "aria-[invalid=true]:border-border-danger",
    "data-[state=error]:border-border-danger",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-checkbox-size-sm",
        md: "size-checkbox-size-md",
        lg: "size-checkbox-size-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const checkboxIndicatorSize = {
  sm: "size-icon-size-xs",
  md: "size-icon-size-sm",
  lg: "size-icon-size-md",
} as const;

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
