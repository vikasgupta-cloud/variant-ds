/**
 * ButtonGroup variant map — segmented control via segment radius tokens.
 * Selected = selected/bg + selected/text (brand yellow wayfinding — intentional).
 */
import { cva, type VariantProps } from "class-variance-authority";

export type ButtonGroupSize = "sm" | "md" | "lg";

/** Design-review affordance on items — not for production. */
export type ButtonGroupItemState = "default" | "hover" | "disabled";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  "focus-visible:z-10",
].join(" ");

export const buttonGroupRootVariants = cva(
  [
    "inline-flex items-stretch overflow-hidden",
    "rounded-segment-outer border border-border-subtle",
    "bg-bg-surface",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const buttonGroupItemVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-segment-inner font-medium",
    "border-0 border-r border-border-subtle last:border-r-0",
    "bg-bg-surface text-text-primary",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    focusRing,
    "hover:bg-surface-level-1 data-[state=hover]:bg-surface-level-1",
    "data-[state=on]:bg-selected-bg data-[state=on]:text-selected-text",
    "data-[state=on]:hover:bg-selected-bg-hover",
    "disabled:pointer-events-none disabled:bg-bg-disabled disabled:text-text-disabled",
    "data-[disabled]:pointer-events-none data-[disabled]:bg-bg-disabled data-[disabled]:text-text-disabled",
    "data-[state=disabled]:pointer-events-none data-[state=disabled]:bg-bg-disabled data-[state=disabled]:text-text-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "gap-control-gap-sm px-control-padding-x-sm py-control-padding-y-sm text-sm",
        md: "gap-control-gap-md px-control-padding-x-md py-control-padding-y-md text-sm",
        lg: "gap-control-gap-lg px-control-padding-x-lg py-control-padding-y-lg text-base",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: "sm",
        class: "px-control-icon-padding-sm py-control-icon-padding-sm",
      },
      {
        iconOnly: true,
        size: "md",
        class: "px-control-icon-padding-md py-control-icon-padding-md",
      },
      {
        iconOnly: true,
        size: "lg",
        class: "px-control-icon-padding-lg py-control-icon-padding-lg",
      },
    ],
    defaultVariants: {
      size: "md",
      iconOnly: false,
    },
  },
);

export const buttonGroupIconSize = {
  sm: "size-icon-size-sm",
  md: "size-icon-size-md",
  lg: "size-icon-size-lg",
} as const;

export type ButtonGroupRootVariantProps = VariantProps<
  typeof buttonGroupRootVariants
>;
export type ButtonGroupItemVariantProps = VariantProps<
  typeof buttonGroupItemVariants
>;
