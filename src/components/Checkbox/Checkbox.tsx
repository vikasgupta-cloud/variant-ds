/**
 * Checkbox — Radix Checkbox. Role + Surface field; checked = bg/neutral/strong.
 * Supports label + description. Indeterminate via checked="indeterminate".
 * `state` is a design-review affordance — not for production.
 */
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  checkboxIndicatorSize,
  checkboxVariants,
  type CheckboxSize,
  type CheckboxState,
} from "./Checkbox.variants";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 8h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  "children"
> & {
  size?: CheckboxSize;
  label?: ReactNode;
  description?: ReactNode;
  /**
   * Design-review affordance — forces a visual state to match Figma’s State dropdown.
   * Production apps leave this at `default` and let CSS / Radix handle interaction.
   */
  state?: CheckboxState;
};

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      size = "md",
      label,
      description,
      state = "default",
      disabled,
      checked,
      defaultChecked,
      onCheckedChange,
      id: idProp,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const descriptionId = `${id}-description`;

    const forceDisabled = state === "disabled";
    const forceError = state === "error";
    const forceFocused = state === "focused";
    const isDisabled = disabled || forceDisabled;
    const invalid =
      forceError || ariaInvalid === true || ariaInvalid === "true";

    let resolvedChecked = checked;
    if (state === "checked") resolvedChecked = true;
    else if (state === "unchecked") resolvedChecked = false;
    else if (state === "indeterminate") resolvedChecked = "indeterminate";

    // Radix owns data-state for checked/unchecked/indeterminate.
    // For focused / error / disabled design-review, set data-state when Radix won't.
    const reviewDataState =
      forceFocused
        ? "focused"
        : forceError
          ? "error"
          : forceDisabled
            ? "disabled"
            : undefined;

    const forceIndicator =
      state === "checked" || state === "indeterminate";

    const control = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        disabled={isDisabled}
        {...(resolvedChecked !== undefined ? { checked: resolvedChecked } : {})}
        {...(resolvedChecked === undefined && defaultChecked !== undefined
          ? { defaultChecked }
          : {})}
        {...(onCheckedChange ? { onCheckedChange } : {})}
        aria-invalid={invalid || undefined}
        aria-describedby={description ? descriptionId : undefined}
        {...(reviewDataState ? { "data-state": reviewDataState } : {})}
        className={cn(
          "group",
          checkboxVariants({ size }),
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
        <CheckboxPrimitive.Indicator
          {...(forceIndicator ? { forceMount: true as const } : {})}
          className="flex items-center justify-center text-current"
        >
          <CheckIcon
            className={cn(
              checkboxIndicatorSize[size],
              "group-data-[state=indeterminate]:hidden",
              state === "indeterminate" && "hidden",
            )}
          />
          <IndeterminateIcon
            className={cn(
              checkboxIndicatorSize[size],
              "hidden group-data-[state=indeterminate]:block",
              state === "indeterminate" && "!block",
            )}
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
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

Checkbox.displayName = "Checkbox";
