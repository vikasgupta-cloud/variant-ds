/**
 * Input variant map — Role + Structure + Surface field fills. Zero component tokens.
 * `data-state` mirrors pseudo-classes for the design-review state prop.
 * Composition `type` is handled in Input.tsx (group chrome), not cva colour maps.
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

/** Field composition axis — matches Figma Input type. */
export type InputType =
  | "default"
  | "icon-leading"
  | "leading-dropdown"
  | "trailing-dropdown"
  | "leading-text"
  | "trailing-button";

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
    // Read-only: real content on bg/disabled — stay fully legible (not text/disabled).
    "read-only:cursor-default read-only:bg-bg-disabled read-only:text-text-primary read-only:border-border-subtle",
    "data-[state=read-only]:cursor-default data-[state=read-only]:bg-bg-disabled data-[state=read-only]:text-text-primary data-[state=read-only]:border-border-subtle",
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

/** Shared chrome for leading/trailing composition add-ons. */
export const inputGroupVariants = cva(
  [
    "flex w-full min-w-0 items-stretch overflow-hidden rounded-control",
    "border border-border-default bg-surface-field",
    "transition-colors motion-reduce:transition-none",
    "focus-within:border-border-focus focus-within:outline-solid focus-within:outline focus-within:outline-border-focus",
    "focus-within:outline-[length:var(--focus-ring-width)] focus-within:outline-offset-[length:var(--focus-ring-offset)]",
    "hover:bg-surface-field-hover data-[state=hover]:bg-surface-field-hover",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const inputAddonVariants = cva(
  "inline-flex items-center justify-center text-text-secondary",
  {
    variants: {
      size: {
        sm: "px-control-padding-x-sm py-control-padding-y-sm type-body-md",
        md: "px-control-padding-x-md py-control-padding-y-md type-body-md",
        lg: "px-control-padding-x-lg py-control-padding-y-lg type-body-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const inputIconSize = {
  sm: "size-icon-size-sm",
  md: "size-icon-size-md",
  lg: "size-icon-size-lg",
} as const;

export type InputVariantProps = VariantProps<typeof inputVariants>;
