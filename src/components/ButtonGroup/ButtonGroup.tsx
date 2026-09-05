/**
 * ButtonGroup — Radix Toggle Group segmented control (single | multiple).
 * Selected uses selected/bg (yellow wayfinding). Items 2–5 typical.
 * `state` on items is a design-review affordance — not for production.
 */
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  buttonGroupIconSize,
  buttonGroupItemVariants,
  buttonGroupRootVariants,
  type ButtonGroupItemState,
  type ButtonGroupSize,
} from "./ButtonGroup.variants";

type ButtonGroupContextValue = {
  size: ButtonGroupSize;
  iconOnly: boolean;
};

const ButtonGroupContext = createContext<ButtonGroupContextValue>({
  size: "md",
  iconOnly: false,
});

type ToggleGroupRootProps = ComponentPropsWithoutRef<typeof ToggleGroup.Root>;

export type ButtonGroupProps = Omit<ToggleGroupRootProps, "type"> & {
  size?: ButtonGroupSize;
  /** single (default) or multiple selection. */
  type?: "single" | "multiple";
  /** Icon-only segment chrome (square padding). */
  iconOnly?: boolean;
};

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    { className, size = "md", type = "single", iconOnly = false, ...props },
    ref,
  ) {
    const rootClass = cn(buttonGroupRootVariants({ size }), className);

    // Radix Root is a discriminated union on `type`; cast keeps exactOptionalPropertyTypes happy.
    const rootProps = {
      ref,
      type,
      className: rootClass,
      ...props,
    } as ToggleGroupRootProps & { ref: typeof ref };

    return (
      <ButtonGroupContext.Provider value={{ size, iconOnly }}>
        <ToggleGroup.Root {...rootProps} />
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export type ButtonGroupItemProps = ComponentPropsWithoutRef<
  typeof ToggleGroup.Item
> & {
  icon?: ReactNode;
  /**
   * Design-review affordance — forces hover/disabled visuals.
   * Production apps leave this at `default`.
   */
  state?: ButtonGroupItemState;
};

export const ButtonGroupItem = forwardRef<
  HTMLButtonElement,
  ButtonGroupItemProps
>(function ButtonGroupItem(
  { className, icon, state = "default", disabled, children, ...props },
  ref,
) {
  const { size, iconOnly } = useContext(ButtonGroupContext);
  const forceDisabled = state === "disabled";
  const forceHover = state === "hover";
  const isDisabled = disabled || forceDisabled;

  // Prefer Radix on/off; only override for design-review hover/disabled.
  const reviewDataState = forceDisabled
    ? "disabled"
    : forceHover
      ? "hover"
      : undefined;

  return (
    <ToggleGroup.Item
      ref={ref}
      disabled={isDisabled}
      {...(reviewDataState ? { "data-state": reviewDataState } : {})}
      className={cn(buttonGroupItemVariants({ size, iconOnly }), className)}
      {...props}
    >
      {icon ? (
        <span
          className={cn("inline-flex shrink-0", buttonGroupIconSize[size])}
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {iconOnly ? (
        children != null ? <span className="sr-only">{children}</span> : null
      ) : (
        children
      )}
    </ToggleGroup.Item>
  );
});

ButtonGroupItem.displayName = "ButtonGroupItem";
