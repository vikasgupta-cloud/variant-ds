/**
 * Alert — Role fills + Component alert tokens. Actions: ghost Dismiss + secondary primary-action.
 * Both inherit the Alert role as Button color. Never a primary default button inside.
 */
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonColorFor } from "../Button";
import {
  alertVariants,
  type AlertRole,
  type AlertState,
} from "./Alert.variants";

const ROLE_TO_BUTTON_COLOR: Record<
  AlertRole,
  ButtonColorFor<"ghost"> & ButtonColorFor<"secondary">
> = {
  info: "info",
  success: "success",
  warning: "warning",
  danger: "destructive",
  ai: "ai",
};

export type AlertActions = {
  /** Label for the secondary (primary-action) button. */
  primaryLabel: string;
  onPrimary?: () => void;
  onDismiss?: () => void;
};

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "role" | "title"> & {
  role: AlertRole;
  emphasis?: "soft" | "strong";
  title?: string;
  children?: ReactNode;
  /**
   * When set, renders exactly two buttons: ghost “Dismiss” and secondary
   * labelled with `primaryLabel`. Both inherit this Alert’s role as `color`.
   */
  actions?: AlertActions;
  /** Ghost Dismiss only — use when there is no primary action. */
  dismissible?: boolean;
  onDismiss?: () => void;
  /**
   * Design-review affordance — Alert has no forced pseudo-states.
   * Production apps leave this at `default`.
   */
  state?: AlertState;
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    className,
    role,
    emphasis = "soft",
    title,
    children,
    actions,
    dismissible = false,
    onDismiss,
    state: _state = "default",
    ...props
  },
  ref,
) {
  const buttonColor = ROLE_TO_BUTTON_COLOR[role];
  const showDismissOnly = dismissible && !actions;

  return (
    <div
      ref={ref}
      role="status"
      data-role={role}
      className={cn(alertVariants({ role, emphasis }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-layout-stack-tight">
        {title ? (
          <p className="type-body-md-semibold text-inherit">{title}</p>
        ) : null}
        {children ? (
          <div className="type-body-md text-inherit opacity-90">{children}</div>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-layout-stack">
          <Button
            hierarchy="ghost"
            color={buttonColor}
            size="sm"
            onClick={actions.onDismiss}
          >
            Dismiss
          </Button>
          <Button
            hierarchy="secondary"
            color={buttonColor}
            size="sm"
            onClick={actions.onPrimary}
          >
            {actions.primaryLabel}
          </Button>
        </div>
      ) : showDismissOnly ? (
        <div className="flex shrink-0 flex-wrap items-center gap-layout-stack">
          <Button
            hierarchy="ghost"
            color={buttonColor}
            size="sm"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
        </div>
      ) : null}
    </div>
  );
});

Alert.displayName = "Alert";
