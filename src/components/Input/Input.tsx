/**
 * Input — Role + Structure + Surface (field / field-hover). Zero component tokens.
 * Composition `type` axis + optional helpIcon (Tooltip) and characterCount.
 * `state` is a design-review affordance for Storybook/Figma parity — not for production.
 */
import { Icon } from "../Icon";
import { Tooltip, TooltipProvider } from "../Tooltip";
import {
  useId,
  forwardRef,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  inputAddonVariants,
  inputGroupVariants,
  inputIconSize,
  inputVariants,
  type InputState,
  type InputType,
  type InputVariantProps,
} from "./Input.variants";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix" | "type"
> &
  InputVariantProps & {
    /** Native input type (text, email, …). Composition axis is `fieldType`. */
    htmlType?: InputHTMLAttributes<HTMLInputElement>["type"];
    /**
     * Field composition — default | icon-leading | leading-dropdown |
     * trailing-dropdown | leading-text | trailing-button.
     */
    type?: InputType;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
    /** Shown when type is leading-text (e.g. currency symbol). */
    leadingText?: ReactNode;
    /** Shown when type is trailing-button — typically a Button. */
    trailingButton?: ReactNode;
    /** Shown when type is leading-dropdown — typically a compact Select/Menu trigger. */
    leadingDropdown?: ReactNode;
    /** Shown when type is trailing-dropdown. */
    trailingDropdown?: ReactNode;
    /**
     * Help control beside the label. `true` uses a Question icon;
     * pass a string for tooltip copy (defaults to helperText / “More information”).
     */
    helpIcon?: boolean | string;
    /**
     * Character counter under the field. Pass max length; current comes from
     * `value`/`defaultValue` length when uncontrolled, or set `current`.
     * Turns text/danger when over max.
     */
    characterCount?: number | { max: number; current?: number };
    clearable?: boolean;
    onClear?: () => void;
    /**
     * Design-review affordance — forces a visual state to match Figma’s State dropdown.
     * Production apps should leave this at `default` and let CSS handle interaction.
     */
    state?: InputState;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    size = "md",
    type: fieldType = "default",
    htmlType = "text",
    label,
    helperText,
    errorMessage,
    prefixIcon,
    suffixIcon,
    leadingText,
    trailingButton,
    leadingDropdown,
    trailingDropdown,
    helpIcon,
    characterCount,
    clearable = false,
    onClear,
    state = "default",
    id: idProp,
    disabled,
    readOnly,
    value,
    defaultValue,
    maxLength,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const countId = `${id}-count`;

  const forceDisabled = state === "disabled";
  const forceReadOnly = state === "read-only";
  const forceError = state === "error";
  const isDisabled = disabled || forceDisabled;
  const isReadOnly = readOnly || forceReadOnly;

  const invalid =
    Boolean(errorMessage) ||
    forceError ||
    ariaInvalid === true ||
    ariaInvalid === "true";
  const resolvedSize = size ?? "md";
  const iconClass = inputIconSize[resolvedSize];
  const showClear =
    clearable &&
    !isDisabled &&
    !isReadOnly &&
    value != null &&
    String(value).length > 0;

  const dataState = state === "default" ? undefined : state;

  const showLeadingIcon = fieldType === "icon-leading" || Boolean(prefixIcon);
  const showLeadingText = fieldType === "leading-text";
  const showTrailingButton = fieldType === "trailing-button";
  const showLeadingDropdown = fieldType === "leading-dropdown";
  const showTrailingDropdown = fieldType === "trailing-dropdown";
  const isGrouped =
    showLeadingText ||
    showTrailingButton ||
    showLeadingDropdown ||
    showTrailingDropdown;

  const countMax =
    typeof characterCount === "number"
      ? characterCount
      : characterCount?.max;
  const countCurrent =
    typeof characterCount === "object" && characterCount.current != null
      ? characterCount.current
      : value != null
        ? String(value).length
        : defaultValue != null
          ? String(defaultValue).length
          : 0;
  const countOver =
    countMax != null ? countCurrent > countMax : false;

  // Structure tokens only — inset for prefix/suffix icons scales with control size.
  const padX = `var(--control-padding-x-${resolvedSize})`;
  const iconSz = `var(--icon-size-${resolvedSize})`;
  const gap = `var(--control-gap-${resolvedSize})`;
  const iconInset = `calc(${padX} + ${iconSz} + ${gap})`;

  const helpContent =
    typeof helpIcon === "string"
      ? helpIcon
      : helperText || "More information";

  const describedBy =
    [
      helperText && !errorMessage && !forceError ? helperId : null,
      errorMessage || forceError ? errorId : null,
      countMax != null ? countId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const field = (
    <div className={cn("relative flex min-w-0 flex-1 items-center")}>
      {showLeadingIcon && prefixIcon ? (
        <span
          className={cn(
            "pointer-events-none absolute inline-flex text-icon-secondary",
            resolvedSize === "sm" && "left-control-padding-x-sm",
            resolvedSize === "md" && "left-control-padding-x-md",
            resolvedSize === "lg" && "left-control-padding-x-lg",
            iconClass,
          )}
          aria-hidden
        >
          {prefixIcon}
        </span>
      ) : null}

      <input
        ref={ref}
        id={id}
        type={htmlType}
        disabled={isDisabled}
        readOnly={isReadOnly}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        data-state={dataState}
        className={cn(
          inputVariants({ size }),
          isGrouped &&
            "rounded-none border-0 bg-transparent shadow-none focus-visible:outline-none data-[state=focused]:outline-none",
          showLeadingIcon && prefixIcon && "pl-[length:var(--input-icon-inset)]",
          (suffixIcon || showClear) && "pr-[length:var(--input-icon-inset)]",
          className,
        )}
        style={
          showLeadingIcon || suffixIcon || showClear
            ? ({ "--input-icon-inset": iconInset } as CSSProperties)
            : undefined
        }
        {...props}
      />

      {showClear ? (
        <button
          type="button"
          onClick={onClear}
          className={cn(
            "absolute inline-flex items-center justify-center rounded-control text-icon-tertiary",
            "hover:text-icon-primary focus-visible:outline focus-visible:outline-border-focus",
            "focus-visible:outline-[length:var(--focus-ring-width)]",
            resolvedSize === "sm" && "right-control-padding-x-sm",
            resolvedSize === "md" && "right-control-padding-x-md",
            resolvedSize === "lg" && "right-control-padding-x-lg",
            iconClass,
          )}
          aria-label="Clear"
        >
          <Icon name="x" size={resolvedSize} />
        </button>
      ) : suffixIcon ? (
        <span
          className={cn(
            "pointer-events-none absolute inline-flex text-icon-secondary",
            resolvedSize === "sm" && "right-control-padding-x-sm",
            resolvedSize === "md" && "right-control-padding-x-md",
            resolvedSize === "lg" && "right-control-padding-x-lg",
            iconClass,
          )}
          aria-hidden
        >
          {suffixIcon}
        </span>
      ) : null}
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-control-label-gap">
      {label || helpIcon ? (
        <div className="flex items-center gap-control-gap-sm">
          {label ? (
            <label
              htmlFor={id}
              className="type-body-md-medium text-text-primary"
            >
              {label}
            </label>
          ) : null}
          {helpIcon ? (
            <TooltipProvider delayDuration={200}>
              <Tooltip content={helpContent}>
                <button
                  type="button"
                  className={cn(
                    "inline-flex shrink-0 rounded-control text-icon-secondary",
                    "hover:text-icon-primary",
                    "focus-visible:outline focus-visible:outline-border-focus",
                    "focus-visible:outline-[length:var(--focus-ring-width)]",
                    "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
                  )}
                  aria-label="More information"
                >
                  <Icon name="question" size="sm" />
                </button>
              </Tooltip>
            </TooltipProvider>
          ) : null}
        </div>
      ) : null}

      {isGrouped ? (
        <div
          className={cn(
            inputGroupVariants({ size }),
            invalid && "border-border-danger",
            isDisabled &&
              "cursor-not-allowed border-border-subtle bg-bg-disabled",
          )}
          data-state={dataState}
        >
          {showLeadingDropdown && leadingDropdown ? (
            <div className={cn(inputAddonVariants({ size }), "border-r border-border-subtle")}>
              {leadingDropdown}
            </div>
          ) : null}
          {showLeadingText && leadingText != null ? (
            <span
              className={cn(
                inputAddonVariants({ size }),
                "shrink-0 border-r border-border-subtle text-text-secondary",
              )}
            >
              {leadingText}
            </span>
          ) : null}
          {field}
          {showTrailingDropdown && trailingDropdown ? (
            <div className={cn(inputAddonVariants({ size }), "border-l border-border-subtle")}>
              {trailingDropdown}
            </div>
          ) : null}
          {showTrailingButton && trailingButton ? (
            <div className={cn(inputAddonVariants({ size }), "border-l border-border-subtle")}>
              {trailingButton}
            </div>
          ) : null}
        </div>
      ) : (
        field
      )}

      {errorMessage || forceError ? (
        <p id={errorId} className="type-body-sm text-text-danger" role="alert">
          {errorMessage || "Fix this field."}
        </p>
      ) : helperText ? (
        <p id={helperId} className="type-body-sm text-text-secondary">
          {helperText}
        </p>
      ) : null}

      {countMax != null ? (
        <p
          id={countId}
          className={cn(
            "type-body-sm tabular-nums",
            countOver ? "text-text-danger" : "text-text-secondary",
          )}
          aria-live="polite"
        >
          {countCurrent}/{countMax}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";
