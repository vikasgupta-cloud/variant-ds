/**
 * Slider variant map — Role strong range; Surface thumb; component track/thumb tokens.
 */
import { cva, type VariantProps } from "class-variance-authority";

/** Design-review affordance — not for production. */
export type SliderState = "default" | "hover" | "dragging" | "disabled";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  "data-[state=focused]:outline-solid data-[state=focused]:outline data-[state=focused]:outline-border-focus",
  "data-[state=focused]:outline-[length:var(--focus-ring-width)]",
  "data-[state=focused]:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

export const sliderRootVariants = cva(
  [
    "relative flex w-full touch-none select-none items-center",
    "data-[disabled]:opacity-60 data-[disabled]:pointer-events-none",
  ].join(" "),
);

export const sliderTrackVariants = cva(
  [
    "relative h-4 w-full grow overflow-hidden rounded-progress bg-slider-track-bg",
  ].join(" "),
);

export const sliderRangeVariants = cva(
  "absolute h-full rounded-progress bg-bg-neutral-strong",
);

export const sliderThumbVariants = cva(
  [
    "block shrink-0 size-slider-thumb-size rounded-full",
    "border border-slider-thumb-border bg-bg-surface shadow-sm",
    "transition-colors motion-reduce:transition-none outline-none",
    focusRing,
    "hover:border-border-strong data-[state=hover]:border-border-strong",
    "data-[state=dragging]:border-border-focus data-[state=dragging]:bg-surface-level-1",
    "disabled:pointer-events-none",
  ].join(" "),
);

export type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
