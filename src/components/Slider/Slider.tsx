/**
 * Slider — @radix-ui/react-slider. Single or range; `state` is design-review only.
 */
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "../../lib/cn";
import {
  sliderRangeVariants,
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  type SliderState,
} from "./Slider.variants";

export type SliderProps = Omit<
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange"
> & {
  /** Single number or `[min, max]` range pair. */
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onValueChange?: (value: number | [number, number]) => void;
  label?: string;
  showValue?: boolean;
  /**
   * Design-review affordance — forces hover / dragging / disabled visuals.
   * Production apps leave this at `default`.
   */
  state?: SliderState;
};

function toArray(
  value: number | [number, number] | undefined,
): number[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? [...value] : [value];
}

function fromArray(
  value: number[],
  range: boolean,
): number | [number, number] {
  if (range) {
    return [value[0] ?? 0, value[1] ?? 0];
  }
  return value[0] ?? 0;
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  function Slider(
    {
      className,
      value,
      defaultValue,
      onValueChange,
      label,
      showValue = false,
      state = "default",
      disabled,
      min = 0,
      max = 100,
      step = 1,
      id: idProp,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const labelId = `${id}-label`;

    const forceDisabled = state === "disabled";
    const isDisabled = disabled || forceDisabled;

    const valueArr = toArray(value);
    const defaultArr = toArray(defaultValue) ?? [min];
    const thumbCount = valueArr?.length ?? defaultArr.length;
    const isRange = thumbCount > 1;

    const thumbReviewState =
      state === "hover" || state === "dragging" ? state : undefined;

    const displayValue = valueArr ?? defaultArr;

    return (
      <div className={cn("flex w-full flex-col gap-progress-label-gap", className)}>
        {label || showValue ? (
          <div className="flex items-baseline justify-between gap-control-gap-md">
            {label ? (
              <label
                id={labelId}
                htmlFor={id}
                className={cn(
                  "text-sm font-medium text-text-primary",
                  isDisabled && "text-text-disabled",
                )}
              >
                {label}
              </label>
            ) : (
              <span />
            )}
            {showValue ? (
              <span className="font-mono text-xs text-text-secondary">
                {isRange
                  ? `${displayValue[0]} – ${displayValue[1]}`
                  : displayValue[0]}
              </span>
            ) : null}
          </div>
        ) : null}

        <SliderPrimitive.Root
          ref={ref}
          id={id}
          min={min}
          max={max}
          step={step}
          disabled={isDisabled}
          aria-labelledby={label ? labelId : undefined}
          {...(valueArr !== undefined ? { value: valueArr } : {})}
          {...(valueArr === undefined ? { defaultValue: defaultArr } : {})}
          {...(onValueChange
            ? {
                onValueChange: (next: number[]) => {
                  onValueChange(fromArray(next, isRange));
                },
              }
            : {})}
          className={sliderRootVariants()}
          {...props}
        >
          <SliderPrimitive.Track className={sliderTrackVariants()}>
            <SliderPrimitive.Range className={sliderRangeVariants()} />
          </SliderPrimitive.Track>
          {Array.from({ length: thumbCount }, (_, i) => (
            <SliderPrimitive.Thumb
              key={i}
              {...(thumbReviewState
                ? { "data-state": thumbReviewState }
                : {})}
              className={sliderThumbVariants()}
            />
          ))}
        </SliderPrimitive.Root>
      </div>
    );
  },
);

Slider.displayName = "Slider";
