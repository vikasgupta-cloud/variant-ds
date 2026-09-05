/**
 * Input — Role + Structure + Surface (field / field-hover). Zero component tokens.
 * Surface is required for context-aware recessed wells; Role alone cannot express that.
 * `state` is a design-review affordance for Storybook/Figma parity — not for production.
 */
import { Icon } from "../Icon";
import {
  useId,
  forwardRef,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  inputIconSize,
  inputVariants,
  type InputState,
  type InputVariantProps,
} from "./Input.variants";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> &
  InputVariantProps & {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    prefixIcon?: ReactNode;
    suffixIcon?: ReactNode;
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
    label,
    helperText,
    errorMessage,
    prefixIcon,
    suffixIcon,
    clearable = false,
    onClear,
    state = "default",
    id: idProp,
    disabled,
    readOnly,
    value,
    defaultValue,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

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

  // Structure tokens only — inset for prefix/suffix icons scales with control size.
  const padX = `var(--control-padding-x-${resolvedSize})`;
  const iconSz = `var(--icon-size-${resolvedSize})`;
  const gap = `var(--control-gap-${resolvedSize})`;
  const iconInset = `calc(${padX} + ${iconSz} + ${gap})`;

  return (
    <div className="flex w-full flex-col gap-control-label-gap">
      {label ? (
        <label htmlFor={id} className="type-body-md-medium text-text-primary">
          {label}
        </label>
      ) : null}

      <div className="relative flex w-full items-center">
        {prefixIcon ? (
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
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={invalid || undefined}
          aria-describedby={
            [helperText ? helperId : null, errorMessage ? errorId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          data-state={dataState}
          className={cn(
            inputVariants({ size }),
            prefixIcon && "pl-[length:var(--input-icon-inset)]",
            (suffixIcon || showClear) && "pr-[length:var(--input-icon-inset)]",
            className,
          )}
          style={
            prefixIcon || suffixIcon || showClear
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

      {errorMessage || forceError ? (
        <p id={errorId} className="type-body-sm text-text-danger" role="alert">
          {errorMessage || "Fix this field."}
        </p>
      ) : helperText ? (
        <p id={helperId} className="type-body-sm text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";
