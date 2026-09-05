/**
 * Progress variant map — Role strong fills on component track. Zero extra intent tokens.
 */
import { cva, type VariantProps } from "class-variance-authority";

export type ProgressVariant = "neutral" | "success" | "danger";

/** Design-review affordance — Progress has no forced interaction states. */
export type ProgressState = "default";

export const progressTrackVariants = cva(
  [
    "relative w-full overflow-hidden",
    "h-progress-track-height rounded-progress bg-progress-track-bg",
  ].join(" "),
);

export const progressIndicatorVariants = cva(
  [
    "h-full w-full rounded-progress",
    "transition-transform motion-reduce:transition-none",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: "bg-bg-neutral-strong",
        success: "bg-bg-success-strong",
        danger: "bg-bg-danger-strong",
      },
      indeterminate: {
        true: [
          "absolute inset-y-0 left-0 w-1/3",
          "animate-[variant-ds-progress-indeterminate_1.4s_ease-in-out_infinite]",
          "motion-reduce:animate-none motion-reduce:w-full motion-reduce:opacity-70",
        ].join(" "),
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      indeterminate: false,
    },
  },
);

export type ProgressVariantProps = VariantProps<
  typeof progressIndicatorVariants
>;
