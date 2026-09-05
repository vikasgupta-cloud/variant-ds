/**
 * Button variant map — design decisions live here (spec §3).
 * Axes: hierarchy × color × size × icon. Zero component tokens.
 * Primary = bg/neutral/strong (not brand yellow). Colour axis: default | destructive | warning | success | info.
 */
import { cva, type VariantProps } from "class-variance-authority";

/** Allowed color values per hierarchy — source of truth for types + Storybook. */
export const BUTTON_COLOR_BY_HIERARCHY = {
  primary: ["default", "destructive", "success"] as const,
  secondary: ["default", "destructive", "warning", "success", "info"] as const,
  tertiary: ["default", "destructive"] as const,
  ghost: ["default", "destructive", "warning", "success", "info"] as const,
  link: ["default", "destructive", "warning", "success", "info"] as const,
} as const;

export type ButtonHierarchy = keyof typeof BUTTON_COLOR_BY_HIERARCHY;
export type ButtonColorFor<H extends ButtonHierarchy> =
  (typeof BUTTON_COLOR_BY_HIERARCHY)[H][number];
export type ButtonColor = ButtonColorFor<ButtonHierarchy>;
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonIcon = "none" | "leading" | "trailing" | "only";
/** Design-review affordance — not for production. Default lets CSS handle interaction. */
export type ButtonState = "default" | "hover" | "active" | "focused" | "disabled";

export type ButtonHierarchyColorProps =
  | { hierarchy?: "primary"; color?: ButtonColorFor<"primary"> }
  | { hierarchy: "secondary"; color?: ButtonColorFor<"secondary"> }
  | { hierarchy: "tertiary"; color?: ButtonColorFor<"tertiary"> }
  | { hierarchy: "ghost"; color?: ButtonColorFor<"ghost"> }
  | { hierarchy: "link"; color?: ButtonColorFor<"link"> };

const focusForced = [
  "data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
  "data-[state=focused]:outline-[length:var(--focus-ring-width)]",
  "data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

const disabledForced = [
  "data-[state=disabled]:pointer-events-none data-[state=disabled]:bg-bg-disabled",
  "data-[state=disabled]:text-text-disabled data-[state=disabled]:border-transparent",
].join(" ");

/** Soft fill hover/active — full static class strings so Tailwind can detect them. */
const softHoverActive = {
  danger: [
    "hover:bg-bg-danger-soft-hover data-[state=hover]:bg-bg-danger-soft-hover",
    "active:bg-bg-danger-soft-active data-[state=active]:bg-bg-danger-soft-active",
  ].join(" "),
  warning: [
    "hover:bg-bg-warning-soft-hover data-[state=hover]:bg-bg-warning-soft-hover",
    "active:bg-bg-warning-soft-active data-[state=active]:bg-bg-warning-soft-active",
  ].join(" "),
  success: [
    "hover:bg-bg-success-soft-hover data-[state=hover]:bg-bg-success-soft-hover",
    "active:bg-bg-success-soft-active data-[state=active]:bg-bg-success-soft-active",
  ].join(" "),
  info: [
    "hover:bg-bg-info-soft-hover data-[state=hover]:bg-bg-info-soft-hover",
    "active:bg-bg-info-soft-active data-[state=active]:bg-bg-info-soft-active",
  ].join(" "),
} as const;

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-control",
    "border",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
    "focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
    "disabled:pointer-events-none disabled:bg-bg-disabled disabled:text-text-disabled disabled:border-transparent",
    "aria-disabled:pointer-events-none aria-disabled:bg-bg-disabled aria-disabled:text-text-disabled",
    focusForced,
    disabledForced,
  ].join(" "),
  {
    variants: {
      hierarchy: {
        primary: "border-transparent",
        secondary: "bg-bg-surface",
        tertiary: "border-transparent bg-surface-level-1",
        ghost: "border-transparent bg-transparent",
        link: [
          "border-transparent bg-transparent p-0",
          "underline-offset-2",
          "hover:underline data-[state=hover]:underline",
        ].join(" "),
      },
      color: {
        default: "",
        destructive: "",
        warning: "",
        success: "",
        info: "",
      },
      size: {
        xs: "gap-control-gap-xs type-body-sm-medium",
        sm: "gap-control-gap-sm type-body-md-medium",
        md: "gap-control-gap-md type-body-md-medium",
        lg: "gap-control-gap-lg type-body-lg-medium",
      },
      icon: {
        none: "",
        leading: "",
        trailing: "",
        only: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // ── primary ──────────────────────────────────────────────
      {
        hierarchy: "primary",
        color: "default",
        class: [
          "bg-bg-neutral-strong text-text-on-inverse",
          "hover:bg-bg-neutral-strong-hover data-[state=hover]:bg-bg-neutral-strong-hover",
          "active:bg-bg-neutral-strong-active data-[state=active]:bg-bg-neutral-strong-active",
        ].join(" "),
      },
      {
        hierarchy: "primary",
        color: "destructive",
        class: [
          "bg-bg-danger-strong text-text-on-strong",
          "hover:bg-bg-danger-strong-hover data-[state=hover]:bg-bg-danger-strong-hover",
          "active:bg-bg-danger-strong-active data-[state=active]:bg-bg-danger-strong-active",
        ].join(" "),
      },
      {
        hierarchy: "primary",
        color: "success",
        class: [
          "bg-bg-success-strong text-text-on-strong",
          "hover:bg-bg-success-strong-hover data-[state=hover]:bg-bg-success-strong-hover",
          "active:bg-bg-success-strong-active data-[state=active]:bg-bg-success-strong-active",
        ].join(" "),
      },

      // ── secondary ────────────────────────────────────────────
      {
        hierarchy: "secondary",
        color: "default",
        class: [
          "border-surface-border text-text-primary",
          "hover:bg-surface-level-1 data-[state=hover]:bg-surface-level-1",
          "active:bg-surface-level-2 data-[state=active]:bg-surface-level-2",
        ].join(" "),
      },
      {
        hierarchy: "secondary",
        color: "destructive",
        class: ["border-border-danger text-text-danger", softHoverActive.danger].join(
          " ",
        ),
      },
      {
        hierarchy: "secondary",
        color: "warning",
        class: [
          "border-border-warning text-text-warning",
          softHoverActive.warning,
        ].join(" "),
      },
      {
        hierarchy: "secondary",
        color: "success",
        class: [
          "border-border-success text-text-success",
          softHoverActive.success,
        ].join(" "),
      },
      {
        hierarchy: "secondary",
        color: "info",
        class: ["border-border-info text-text-info", softHoverActive.info].join(
          " ",
        ),
      },

      // ── tertiary ─────────────────────────────────────────────
      {
        hierarchy: "tertiary",
        color: "default",
        class: [
          "text-text-primary",
          "hover:bg-surface-level-2 data-[state=hover]:bg-surface-level-2",
          "active:bg-surface-level-3 data-[state=active]:bg-surface-level-3",
        ].join(" "),
      },
      {
        hierarchy: "tertiary",
        color: "destructive",
        class: ["text-text-danger", softHoverActive.danger].join(" "),
      },

      // ── ghost ────────────────────────────────────────────────
      {
        hierarchy: "ghost",
        color: "default",
        class: [
          "text-text-primary",
          "hover:bg-surface-level-1 data-[state=hover]:bg-surface-level-1",
          "active:bg-surface-level-2 data-[state=active]:bg-surface-level-2",
        ].join(" "),
      },
      {
        hierarchy: "ghost",
        color: "destructive",
        class: ["text-text-danger", softHoverActive.danger].join(" "),
      },
      {
        hierarchy: "ghost",
        color: "warning",
        class: ["text-text-warning", softHoverActive.warning].join(" "),
      },
      {
        hierarchy: "ghost",
        color: "success",
        class: ["text-text-success", softHoverActive.success].join(" "),
      },
      {
        hierarchy: "ghost",
        color: "info",
        class: ["text-text-info", softHoverActive.info].join(" "),
      },

      // ── link ─────────────────────────────────────────────────
      {
        hierarchy: "link",
        color: "default",
        class: [
          "text-text-link",
          "hover:text-text-link-hover data-[state=hover]:text-text-link-hover",
        ].join(" "),
      },
      {
        hierarchy: "link",
        color: "destructive",
        class: [
          "text-text-danger",
          "hover:text-text-danger-hover data-[state=hover]:text-text-danger-hover",
        ].join(" "),
      },
      {
        hierarchy: "link",
        color: "warning",
        class: [
          "text-text-warning",
          "hover:text-text-warning-hover data-[state=hover]:text-text-warning-hover",
        ].join(" "),
      },
      {
        hierarchy: "link",
        color: "success",
        class: [
          "text-text-success",
          "hover:text-text-success-hover data-[state=hover]:text-text-success-hover",
        ].join(" "),
      },
      {
        hierarchy: "link",
        color: "info",
        class: [
          "text-text-info",
          "hover:text-text-info-hover data-[state=hover]:text-text-info-hover",
        ].join(" "),
      },

      // ── padding by size (non-link, non-icon-only) ─────────────
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: ["none", "leading", "trailing"],
        size: "xs",
        class: "px-control-padding-x-xs py-control-padding-y-xs",
      },
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: ["none", "leading", "trailing"],
        size: "sm",
        class: "px-control-padding-x-sm py-control-padding-y-sm",
      },
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: ["none", "leading", "trailing"],
        size: "md",
        class: "px-control-padding-x-md py-control-padding-y-md",
      },
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: ["none", "leading", "trailing"],
        size: "lg",
        class: "px-control-padding-x-lg py-control-padding-y-lg",
      },

      // ── icon-only square padding ─────────────────────────────
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: "only",
        size: "xs",
        class: "px-control-icon-padding-xs py-control-icon-padding-xs",
      },
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: "only",
        size: "sm",
        class: "px-control-icon-padding-sm py-control-icon-padding-sm",
      },
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: "only",
        size: "md",
        class: "px-control-icon-padding-md py-control-icon-padding-md",
      },
      {
        hierarchy: ["primary", "secondary", "tertiary", "ghost"],
        icon: "only",
        size: "lg",
        class: "px-control-icon-padding-lg py-control-icon-padding-lg",
      },
    ],
    defaultVariants: {
      hierarchy: "primary",
      color: "default",
      size: "md",
      icon: "none",
      fullWidth: false,
    },
  },
);

export const buttonIconSize = {
  xs: "size-icon-size-xs",
  sm: "size-icon-size-sm",
  md: "size-icon-size-md",
  lg: "size-icon-size-lg",
} as const;

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function isColorAllowedForHierarchy(
  hierarchy: ButtonHierarchy,
  color: string,
): boolean {
  return (BUTTON_COLOR_BY_HIERARCHY[hierarchy] as readonly string[]).includes(
    color,
  );
}
