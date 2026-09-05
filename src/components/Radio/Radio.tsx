/**
 * Radio — Radix Radio Group. Export RadioGroup + RadioItem (alias: Radio).
 * Selected: selected/bg · selected/edge; dot uses icon/on-selected.
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
   * Read-only: value stays legible (text/primary on bg/disabled). Not the same as disabled.
   */
  readOnly?: boolean;
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
      readOnly = false,
      state = "default",
      disabled,
      value,
      id: idProp,
      "aria-invalid": ariaInvalid,
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
    const forceError = state === "error";
    const forceSelected = state === "selected";
    const forceUnselected = state === "unselected";
    const isDisabled = disabled || forceDisabled;
    const invalid =
      forceError ||
      ariaInvalid === true ||
      ariaInvalid === "true";

    const reviewDataState = forceFocused
      ? "focused"
      : forceError
        ? "error"
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
        aria-invalid={invalid || undefined}
        aria-readonly={readOnly || undefined}
        aria-describedby={description ? descriptionId : undefined}
        data-readonly={readOnly || undefined}
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
              "rounded-full",
              readOnly ? "bg-text-primary" : "bg-icon-on-selected",
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
