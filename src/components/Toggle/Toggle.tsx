/**
 * Toggle — Radix Switch. Off = surface/control; On = selected/bg.
 * Knob: toggle/knob-bg-off | toggle/knob-bg-on (dark mark on yellow).
 * Optional label + description; labelPosition start|end (default end).
 * Read-only: value stays text/primary on bg/disabled (legible). Disabled uses text/disabled.
 * `state` is a design-review affordance — not for production.
 */
import * as Switch from "@radix-ui/react-switch";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  toggleKnobSize,
  toggleRootVariants,
  toggleTrackVariants,
  type ToggleLabelPosition,
  type ToggleSize,
  type ToggleState,
} from "./Toggle.variants";

export type ToggleProps = Omit<
  ComponentPropsWithoutRef<typeof Switch.Root>,
  "children"
> & {
  size?: ToggleSize;
  label?: ReactNode;
  description?: ReactNode;
  /** Label before (start) or after (end) the control. Default end. */
  labelPosition?: ToggleLabelPosition;
  /**
   * Read-only: value stays legible (text/primary on bg/disabled). Not the same as disabled.
   */
  readOnly?: boolean;
  /**
   * Design-review affordance — forces a visual state to match Figma’s State dropdown.
   * Production apps leave this at `default`.
   */
  state?: ToggleState;
};

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(
    {
      className,
      size = "md",
      label,
      description,
      labelPosition = "end",
      readOnly = false,
      state = "default",
      disabled,
      checked,
      defaultChecked,
      onCheckedChange,
      id: idProp,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const descriptionId = `${id}-description`;

    const forceDisabled = state === "disabled";
    const forceFocused = state === "focused";
    const isDisabled = disabled || forceDisabled;

    let resolvedChecked = checked;
    if (state === "on") resolvedChecked = true;
    else if (state === "off") resolvedChecked = false;

    const reviewDataState = forceFocused
      ? "focused"
      : forceDisabled
        ? "disabled"
        : undefined;

    const control = (
      <Switch.Root
        ref={ref}
        id={id}
        disabled={isDisabled}
        {...(resolvedChecked !== undefined ? { checked: resolvedChecked } : {})}
        {...(resolvedChecked === undefined && defaultChecked !== undefined
          ? { defaultChecked }
          : {})}
        {...(onCheckedChange && !readOnly ? { onCheckedChange } : {})}
        aria-readonly={readOnly || undefined}
        aria-describedby={description ? descriptionId : undefined}
        data-readonly={readOnly || undefined}
        {...(reviewDataState ? { "data-state": reviewDataState } : {})}
        className={cn(
          toggleTrackVariants({ size }),
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
        <Switch.Thumb
          className={cn(
            "block shrink-0 rounded-full bg-toggle-knob-bg-off",
            "group-data-[state=checked]:bg-toggle-knob-bg-on",
            "shadow-sm transition-colors transition-transform motion-reduce:transition-none",
            toggleKnobSize[size],
          )}
        />
      </Switch.Root>
    );

    if (!label && !description) {
      return control;
    }

    return (
      <div className={toggleRootVariants({ labelPosition })}>
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

Toggle.displayName = "Toggle";
