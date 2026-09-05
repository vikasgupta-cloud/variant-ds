/**
 * Toggle variant map — track binds Surface + selected; knob binds component colour tokens.
 * On: selected/bg (+ hover selected/bg-hover). Off: surface/control (+ hover control-hover).
 */
import { cva, type VariantProps } from "class-variance-authority";

export type ToggleSize = "sm" | "md" | "lg";

/** Design-review affordance — not for production. Default lets CSS / Radix handle interaction. */
export type ToggleState = "default" | "off" | "on" | "disabled" | "focused";

export type ToggleLabelPosition = "start" | "end";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  "data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
  "data-[state=focused]:outline-[length:var(--focus-ring-width)]",
  "data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

export const toggleTrackVariants = cva(
  [
    "group shrink-0 appearance-none",
    "inline-flex items-center",
    "rounded-toggle p-toggle-track-padding",
    "bg-surface-control",
    "transition-colors motion-reduce:transition-none",
    "outline-none",
    focusRing,
    "hover:bg-surface-control-hover",
    "data-[state=checked]:bg-selected-bg data-[state=checked]:hover:bg-selected-bg-hover",
    "data-[state=unchecked]:justify-start data-[state=checked]:justify-end",
    "data-[state=focused]:justify-start",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "data-[state=disabled]:cursor-not-allowed data-[state=disabled]:opacity-50",
    "data-[state=disabled]:bg-bg-disabled",
    // Read-only: track on bg/disabled; knob position still shows on/off (legible, not faded).
    "data-[readonly]:cursor-default data-[readonly]:pointer-events-none data-[readonly]:opacity-100",
    "data-[readonly]:bg-bg-disabled data-[readonly]:data-[state=checked]:bg-bg-disabled data-[readonly]:hover:bg-bg-disabled",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-toggle-track-height-sm w-toggle-track-width-sm",
        md: "h-toggle-track-height-md w-toggle-track-width-md",
        lg: "h-toggle-track-height-lg w-toggle-track-width-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const toggleKnobSize = {
  sm: "size-toggle-knob-size-sm",
  md: "size-toggle-knob-size-md",
  lg: "size-toggle-knob-size-lg",
} as const;

export const toggleRootVariants = cva("flex items-start gap-control-label-gap", {
  variants: {
    labelPosition: {
      end: "flex-row",
      start: "flex-row-reverse",
    },
  },
  defaultVariants: {
    labelPosition: "end",
  },
});

export type ToggleTrackVariantProps = VariantProps<typeof toggleTrackVariants>;
