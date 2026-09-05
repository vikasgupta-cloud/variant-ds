/**
 * Button — Role + Structure (+ Surface for secondary/ghost/tertiary). Zero component tokens.
 * Axes: hierarchy × color (type-safe pairs). Primary decision: bg/neutral/strong, not yellow.
 * `state` is a design-review affordance for Storybook/Figma parity — not for production.
 */
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  buttonIconSize,
  buttonVariants,
  type ButtonHierarchyColorProps,
  type ButtonIcon,
  type ButtonSize,
  type ButtonState,
} from "./Button.variants";

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  asChild?: boolean;
  loading?: boolean;
  /** Icon content for leading / trailing / only placements. */
  iconNode?: ReactNode;
  size?: ButtonSize;
  icon?: ButtonIcon;
  fullWidth?: boolean;
  /**
   * Design-review affordance — forces a visual state to match Figma’s State dropdown.
   * Production apps should leave this at `default` and let CSS handle interaction.
   */
  state?: ButtonState;
};

export type ButtonProps = ButtonBaseProps & ButtonHierarchyColorProps;

function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none",
        className,
      )}
      aria-hidden
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      hierarchy = "primary",
      color = "default",
      size = "md",
      icon = "none",
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      iconNode,
      state = "default",
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    const Comp = asChild ? Slot : "button";
    const forceDisabled = state === "disabled";
    const isDisabled = disabled || loading || forceDisabled;
    const iconClass = buttonIconSize[size];
    const dataState = state === "default" ? undefined : state;

    const showLeading = icon === "leading" || icon === "only";
    const showTrailing = icon === "trailing";
    const isIconOnly = icon === "only";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          buttonVariants({
            hierarchy,
            color,
            size,
            icon,
            fullWidth,
          }),
          className,
        )}
        disabled={asChild ? undefined : isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        data-state={dataState}
        data-loading={loading ? "" : undefined}
        {...props}
      >
        {loading ? (
          <>
            <Spinner className={iconClass} />
            {!isIconOnly ? <span className="opacity-70">{children}</span> : null}
            <span className="sr-only">Loading</span>
          </>
        ) : (
          <>
            {showLeading && iconNode ? (
              <span className={cn("inline-flex shrink-0", iconClass)} aria-hidden>
                {iconNode}
              </span>
            ) : null}
            {isIconOnly && !iconNode ? children : null}
            {!isIconOnly ? children : null}
            {showTrailing && iconNode ? (
              <span className={cn("inline-flex shrink-0", iconClass)} aria-hidden>
                {iconNode}
              </span>
            ) : null}
            {isIconOnly && iconNode ? (
              <span className="sr-only">{children}</span>
            ) : null}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";
