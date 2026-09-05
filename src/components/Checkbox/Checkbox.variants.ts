/**
 * Checkbox variant map — Role + Surface field + selected tokens.
 * Checked/indeterminate: selected/bg · selected/edge · icon/on-selected.
 * Unchecked hover: border/strong. Focus ring matches Button.
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
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    focusRing,
    "hover:data-[state=unchecked]:border-border-strong",
    "data-[state=checked]:border-selected-edge data-[state=checked]:bg-selected-bg data-[state=checked]:text-icon-on-selected",
    "data-[state=indeterminate]:border-selected-edge data-[state=indeterminate]:bg-selected-bg data-[state=indeterminate]:text-icon-on-selected",
    "disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-bg-disabled disabled:text-text-disabled",
    "data-[disabled]:cursor-not-allowed data-[disabled]:border-border-subtle data-[disabled]:bg-bg-disabled data-[disabled]:text-text-disabled",
    "data-[state=disabled]:cursor-not-allowed data-[state=disabled]:border-border-subtle data-[state=disabled]:bg-bg-disabled data-[state=disabled]:text-text-disabled",
    // Read-only: value marks stay text/primary on bg/disabled (legible).
    "data-[readonly]:cursor-default data-[readonly]:pointer-events-none data-[readonly]:border-border-subtle data-[readonly]:bg-bg-disabled data-[readonly]:text-text-primary",
    "data-[readonly]:data-[state=checked]:border-border-subtle data-[readonly]:data-[state=checked]:bg-bg-disabled data-[readonly]:data-[state=checked]:text-text-primary",
    "data-[readonly]:data-[state=indeterminate]:border-border-subtle data-[readonly]:data-[state=indeterminate]:bg-bg-disabled data-[readonly]:data-[state=indeterminate]:text-text-primary",
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

export const checkboxGroupVariants = cva("flex", {
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

export type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;
export type CheckboxGroupVariantProps = VariantProps<typeof checkboxGroupVariants>;
export type CheckboxGroupOrientation = NonNullable<
  CheckboxGroupVariantProps["orientation"]
>;
