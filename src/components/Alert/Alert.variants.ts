/**
 * Alert variant map — Role soft/strong fills. Component tokens: radius, padding, icon-gap.
 */
import { cva, type VariantProps } from "class-variance-authority";

export type AlertRole = "info" | "success" | "warning" | "danger" | "ai";

/** Design-review affordance — Alert has no interactive chrome of its own. */
export type AlertState = "default";

export const alertVariants = cva(
  [
    "flex w-full flex-wrap items-start justify-between",
    "gap-alert-icon-gap rounded-alert border p-alert-padding",
  ].join(" "),
  {
    variants: {
      role: {
        info: "",
        success: "",
        warning: "",
        danger: "",
        ai: "",
      },
      emphasis: {
        soft: "",
        strong: "",
      },
    },
    compoundVariants: [
      {
        role: "info",
        emphasis: "soft",
        class: "bg-bg-info-soft border-border-info text-text-info",
      },
      {
        role: "info",
        emphasis: "strong",
        class: "bg-bg-info-strong border-transparent text-text-on-strong",
      },
      {
        role: "success",
        emphasis: "soft",
        class: "bg-bg-success-soft border-border-success text-text-success",
      },
      {
        role: "success",
        emphasis: "strong",
        class: "bg-bg-success-strong border-transparent text-text-on-strong",
      },
      {
        role: "warning",
        emphasis: "soft",
        class: "bg-bg-warning-soft border-border-warning text-text-warning",
      },
      {
        role: "warning",
        emphasis: "strong",
        class:
          "bg-bg-warning-strong border-transparent text-text-on-strong-warning",
      },
      {
        role: "danger",
        emphasis: "soft",
        class: "bg-bg-danger-soft border-border-danger text-text-danger",
      },
      {
        role: "danger",
        emphasis: "strong",
        class: "bg-bg-danger-strong border-transparent text-text-on-strong",
      },
      {
        role: "ai",
        emphasis: "soft",
        class: "bg-bg-ai-soft border-border-ai text-text-ai",
      },
      {
        role: "ai",
        emphasis: "strong",
        class: "bg-bg-ai-strong border-transparent text-text-on-strong",
      },
    ],
    defaultVariants: {
      role: "info",
      emphasis: "soft",
    },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
