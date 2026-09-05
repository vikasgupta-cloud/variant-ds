/**
 * Tabs variant map — underline vs button chrome; sizes via control/chip + tab tokens.
 * Active underline uses selected/indicator. Button active uses bg-surface.
 */
import { cva, type VariantProps } from "class-variance-authority";

export type TabsVariant = "underline" | "button";
export type TabsSize = "sm" | "md" | "lg";

/** Design-review affordance on TabsTrigger — not for production. */
export type TabsTriggerState = "default" | "active" | "disabled";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

export const tabsListVariants = cva("flex items-center", {
  variants: {
    variant: {
      underline: "gap-tab-item-spacing border-b border-border-subtle",
      button: [
        "gap-tab-item-spacing rounded-tab-container",
        "bg-surface-level-1 p-tab-container-padding",
      ].join(" "),
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-medium whitespace-nowrap",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    focusRing,
    "disabled:pointer-events-none disabled:text-text-disabled",
    "data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled",
    "data-[state=disabled]:pointer-events-none data-[state=disabled]:text-text-disabled",
  ].join(" "),
  {
    variants: {
      variant: {
        underline: [
          "relative rounded-none text-text-secondary",
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0",
          "after:h-tab-indicator-weight after:bg-transparent",
          "hover:text-text-primary",
          "data-[state=active]:text-text-primary data-[state=active]:after:bg-selected-indicator",
        ].join(" "),
        button: [
          "rounded-tab text-text-secondary",
          "hover:text-text-primary hover:bg-surface-level-2",
          "data-[state=active]:bg-bg-surface data-[state=active]:text-text-primary",
          "data-[state=active]:shadow-sm",
        ].join(" "),
      },
      size: {
        sm: "gap-tab-content-gap-sm px-chip-padding-x-sm py-chip-padding-y-sm text-xs",
        md: "gap-tab-content-gap-md px-chip-padding-x-md py-chip-padding-y-md text-sm",
        lg: "gap-tab-content-gap-lg px-chip-padding-x-lg py-chip-padding-y-lg text-sm",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  },
);

export const tabsContentVariants = cva(
  "outline-none focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  {
    variants: {
      size: {
        sm: "mt-tab-content-gap-sm",
        md: "mt-tab-content-gap-md",
        lg: "mt-tab-content-gap-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const tabsTriggerIconSize = {
  sm: "size-icon-size-xs",
  md: "size-icon-size-sm",
  lg: "size-icon-size-sm",
} as const;

export type TabsListVariantProps = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>;
