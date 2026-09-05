/**
 * Input variant map — Role + Structure + Surface field fills. Zero component tokens.
 * `data-state` mirrors pseudo-classes for the design-review state prop.
 */
import { cva, type VariantProps } from "class-variance-authority";

/** Design-review affordance — not for production. Default lets CSS handle interaction. */
export type InputState =
  | "default"
  | "hover"
  | "focused"
  | "disabled"
  | "read-only"
  | "error";

export const inputVariants = cva(
  [
    "w-full min-w-0 rounded-control",
    "border border-border-default bg-surface-field text-text-primary",
    "placeholder:text-text-tertiary",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    "hover:bg-surface-field-hover data-[state=hover]:bg-surface-field-hover",
    "focus-visible:border-border-focus focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
    "focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
    "data-[state=focused]:border-border-focus data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
    "data-[state=focused]:outline-[length:var(--focus-ring-width)] data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
    "disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-text-disabled disabled:border-border-subtle",
    "data-[state=disabled]:cursor-not-allowed data-[state=disabled]:bg-bg-disabled data-[state=disabled]:text-text-disabled data-[state=disabled]:border-border-subtle",
    "read-only:bg-surface-level-1 read-only:text-text-secondary",
    "data-[state=read-only]:bg-surface-level-1 data-[state=read-only]:text-text-secondary",
    "aria-[invalid=true]:border-border-danger",
    "data-[state=error]:border-border-danger",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-control-padding-x-sm py-control-padding-y-sm type-body-md gap-control-gap-sm",
        md: "px-control-padding-x-md py-control-padding-y-md type-body-md gap-control-gap-md",
        lg: "px-control-padding-x-lg py-control-padding-y-lg type-body-lg gap-control-gap-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const inputIconSize = {
  sm: "size-icon-size-sm",
  md: "size-icon-size-md",
  lg: "size-icon-size-lg",
} as const;

export type InputVariantProps = VariantProps<typeof inputVariants>;
