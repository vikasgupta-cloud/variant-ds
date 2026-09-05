/**
 * Progress — @radix-ui/react-progress. Determinate + indeterminate; Role strong fills.
 * Indeterminate animates; respects prefers-reduced-motion.
 */
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";
import {
  progressIndicatorVariants,
  progressTrackVariants,
  type ProgressState,
  type ProgressVariant,
} from "./Progress.variants";

export type ProgressProps = Omit<
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
  "value"
> & {
  variant?: ProgressVariant;
  /** 0–100. Omit (or pass null) for indeterminate. */
  value?: number | null;
  label?: string;
  showValue?: boolean;
  /**
   * Design-review affordance — Progress has no forced interaction states.
   */
  state?: ProgressState;
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      className,
      variant = "neutral",
      value,
      label,
      showValue = false,
      state: _state = "default",
      id: idProp,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const labelId = `${id}-label`;
    const indeterminate = value == null;
    const clamped =
      value == null ? null : Math.min(100, Math.max(0, value));

    return (
      <div className={cn("flex w-full flex-col gap-progress-label-gap", className)}>
        {label || showValue ? (
          <div className="flex items-baseline justify-between gap-control-gap-md">
            {label ? (
              <span
                id={labelId}
                className="text-sm font-medium text-text-primary"
              >
                {label}
              </span>
            ) : (
              <span />
            )}
            {showValue && !indeterminate ? (
              <span className="font-mono text-xs text-text-secondary">
                {clamped}%
              </span>
            ) : null}
          </div>
        ) : null}

        <ProgressPrimitive.Root
          ref={ref}
          id={id}
          value={indeterminate ? null : clamped}
          max={100}
          aria-labelledby={label ? labelId : undefined}
          className={progressTrackVariants()}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={progressIndicatorVariants({
              variant,
              indeterminate,
            })}
            style={
              indeterminate
                ? undefined
                : { transform: `translateX(-${100 - (clamped ?? 0)}%)` }
            }
          />
        </ProgressPrimitive.Root>
      </div>
    );
  },
);

Progress.displayName = "Progress";
