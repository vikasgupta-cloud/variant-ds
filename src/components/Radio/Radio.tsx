/**
 * Radio — Radix Radio Group. Export RadioGroup + RadioItem (alias: Radio).
 * Selected indicator: radio-dot-size filled with bg/neutral/strong.
 * `state` on items is a design-review affordance — not for production.
 */
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  radioDotSize,
  radioGroupVariants,
  radioItemVariants,
  type RadioSize,
  type RadioState,
} from "./Radio.variants";

const RadioSizeContext = createContext<RadioSize>("md");

export type RadioGroupProps = ComponentPropsWithoutRef<
  typeof RadioPrimitive.Root
> & {
  size?: RadioSize;
  orientation?: "horizontal" | "vertical";
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    { className, size = "md", orientation = "vertical", ...props },
    ref,
  ) {
    return (
      <RadioSizeContext.Provider value={size}>
        <RadioPrimitive.Root
          ref={ref}
          orientation={orientation}
          className={cn(radioGroupVariants({ orientation }), className)}
          {...props}
        />
      </RadioSizeContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export type RadioItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadioPrimitive.Item>,
  "children"
> & {
  size?: RadioSize;
  label?: ReactNode;
  description?: ReactNode;
  /**
   * Design-review affordance — forces a visual state.
   * Production apps leave this at `default`.
   */
  state?: RadioState;
};

export const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  function RadioItem(
    {
      className,
      size: sizeProp,
      label,
      description,
      state = "default",
      disabled,
      value,
      id: idProp,
      ...props
    },
    ref,
  ) {
    const ctxSize = useContext(RadioSizeContext);
    const size = sizeProp ?? ctxSize;
    const autoId = useId();
    const id = idProp ?? autoId;
    const descriptionId = `${id}-description`;

    const forceDisabled = state === "disabled";
    const forceFocused = state === "focused";
    const forceSelected = state === "selected";
    const forceUnselected = state === "unselected";
    const isDisabled = disabled || forceDisabled;

    const reviewDataState = forceFocused
      ? "focused"
      : forceDisabled
        ? "disabled"
        : forceSelected
          ? "checked"
          : forceUnselected
            ? "unchecked"
            : undefined;

    const control = (
      <RadioPrimitive.Item
        ref={ref}
        id={id}
        value={value}
        disabled={isDisabled}
        aria-describedby={description ? descriptionId : undefined}
        {...(reviewDataState ? { "data-state": reviewDataState } : {})}
        className={cn(
          radioItemVariants({ size }),
          "relative",
          forceFocused &&
            [
              "outline-solid outline outline-border-focus",
              "outline-[length:var(--focus-ring-width)]",
              "outline-offset-[length:var(--focus-ring-offset)]",
            ].join(" "),
          className,
        )}
        {...props}
      >
        <RadioPrimitive.Indicator
          {...(forceSelected || forceUnselected
            ? { forceMount: true as const }
            : {})}
          className={cn(
            "flex items-center justify-center",
            forceUnselected && "hidden",
            forceSelected && "!flex",
          )}
        >
          <span
            className={cn(
              "rounded-full bg-bg-neutral-strong",
              radioDotSize[size],
            )}
          />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Item>
    );

    if (!label && !description) {
      return control;
    }

    return (
      <div className="flex items-start gap-control-label-gap">
        {control}
        <div className="flex min-w-0 flex-col gap-control-gap-sm">
          {label ? (
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium text-text-primary",
                isDisabled && "text-text-disabled",
              )}
            >
              {label}
            </label>
          ) : null}
          {description ? (
            <p
              id={descriptionId}
              className={cn(
                "text-xs text-text-secondary",
                isDisabled && "text-text-disabled",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
);

RadioItem.displayName = "RadioItem";

/** Alias for RadioItem. */
export const Radio = RadioItem;
