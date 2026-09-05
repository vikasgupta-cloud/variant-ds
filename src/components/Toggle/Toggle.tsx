/**
 * Toggle — Radix Switch. Off = toggle-track-off-bg; On = bg/neutral/strong.
 * Optional label + description; labelPosition start|end (default end).
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
   * Design-review affordance — forces a visual state to match Figma’s State dropdown.
   * Production apps leave this at `default` and let CSS / Radix handle interaction.
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
        {...(onCheckedChange ? { onCheckedChange } : {})}
        aria-describedby={description ? descriptionId : undefined}
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
            "block shrink-0 rounded-full bg-toggle-knob-bg",
            "shadow-sm transition-transform motion-reduce:transition-none",
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
