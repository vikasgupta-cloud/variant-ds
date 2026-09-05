/**
 * Badge variant map — Role soft/strong fills. Component tokens: radius, chip padding, dot/count sizes.
 * Axes: role × emphasis × size. Neutral strong uses text/on-inverse (matches Button primary).
 */
import { cva, type VariantProps } from "class-variance-authority";

export type BadgeRole =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "ai";

export type BadgeEmphasis = "soft" | "strong";
export type BadgeSize = "sm" | "md" | "lg";

/** Design-review affordance — Badge has no interactive chrome. */
export type BadgeState = "default" | "disabled";

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-badge border font-medium whitespace-nowrap",
    "transition-colors motion-reduce:transition-none",
    "data-[state=disabled]:pointer-events-none data-[state=disabled]:opacity-60",
  ].join(" "),
  {
    variants: {
      role: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: "",
        ai: "",
      },
      emphasis: {
        soft: "",
        strong: "border-transparent",
      },
      size: {
        sm: "gap-chip-gap-sm px-chip-padding-x-sm py-chip-padding-y-sm text-xs",
        md: "gap-chip-gap-md px-chip-padding-x-md py-chip-padding-y-md text-sm",
        lg: "gap-chip-gap-lg px-chip-padding-x-lg py-chip-padding-y-lg text-sm",
      },
    },
    compoundVariants: [
      {
        role: "neutral",
        emphasis: "soft",
        class: "bg-bg-neutral-soft border-border-neutral text-text-neutral",
      },
      {
        role: "neutral",
        emphasis: "strong",
        class: "bg-bg-neutral-strong text-text-on-inverse",
      },
      {
        role: "info",
        emphasis: "soft",
        class: "bg-bg-info-soft border-border-info text-text-info",
      },
      {
        role: "info",
        emphasis: "strong",
        class: "bg-bg-info-strong text-text-on-strong",
      },
      {
        role: "success",
        emphasis: "soft",
        class: "bg-bg-success-soft border-border-success text-text-success",
      },
      {
        role: "success",
        emphasis: "strong",
        class: "bg-bg-success-strong text-text-on-strong",
      },
      {
        role: "warning",
        emphasis: "soft",
        class: "bg-bg-warning-soft border-border-warning text-text-warning",
      },
      {
        role: "warning",
        emphasis: "strong",
        class: "bg-bg-warning-strong text-text-on-strong-warning",
      },
      {
        role: "danger",
        emphasis: "soft",
        class: "bg-bg-danger-soft border-border-danger text-text-danger",
      },
      {
        role: "danger",
        emphasis: "strong",
        class: "bg-bg-danger-strong text-text-on-strong",
      },
      {
        role: "ai",
        emphasis: "soft",
        class: "bg-bg-ai-soft border-border-ai text-text-ai",
      },
      {
        role: "ai",
        emphasis: "strong",
        class: "bg-bg-ai-strong text-text-on-strong",
      },
    ],
    defaultVariants: {
      role: "neutral",
      emphasis: "soft",
      size: "md",
    },
  },
);

export const badgeDotSize = {
  sm: "size-badge-dot-size-sm",
  md: "size-badge-dot-size-md",
  lg: "size-badge-dot-size-md",
} as const;

export const badgeCountSize = {
  sm: "size-badge-count-size-sm min-w-badge-count-size-sm",
  md: "size-badge-count-size-md min-w-badge-count-size-md",
  lg: "size-badge-count-size-lg min-w-badge-count-size-lg",
} as const;

export const badgeIconSize = {
  sm: "size-icon-size-xs",
  md: "size-icon-size-sm",
  lg: "size-icon-size-sm",
} as const;

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
