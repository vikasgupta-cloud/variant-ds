/**
 * Badge — Role soft/strong status chips. Component tokens for radius / chip padding / dot / count.
 * Optional leading dot or icon; optional count (pill sizing via badge-count-size).
 * `state` is a design-review affordance — not for production.
 */
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  badgeCountSize,
  badgeCountType,
  badgeDotSize,
  badgeIconSize,
  badgeVariants,
  type BadgeEmphasis,
  type BadgeRole,
  type BadgeSize,
  type BadgeState,
} from "./Badge.variants";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "role"> & {
  role?: BadgeRole;
  emphasis?: BadgeEmphasis;
  size?: BadgeSize;
  /** Leading status dot. */
  dot?: boolean;
  /** Count value — rendered in count-sized pill when set. */
  count?: number | string;
  /** Leading icon (ignored when `count` is set without children). */
  icon?: ReactNode;
  /**
   * Design-review affordance — forces a visual state.
   * Production apps leave this at `default`.
   */
  state?: BadgeState;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    className,
    role = "neutral",
    emphasis = "soft",
    size = "md",
    dot = false,
    count,
    icon,
    state = "default",
    children,
    ...props
  },
  ref,
) {
  const dataState = state === "default" ? undefined : state;
  const isCountOnly = count != null && children == null;
  const showDot = dot && !isCountOnly;
  const showIcon = Boolean(icon) && !isCountOnly;

  return (
    <span
      ref={ref}
      data-role={role}
      data-state={dataState}
      className={cn(
        badgeVariants({ role, emphasis, size }),
        isCountOnly && [
          "justify-center p-0",
          badgeCountSize[size],
          "rounded-badge-count",
        ],
        className,
      )}
      {...props}
    >
      {showDot ? (
        <span
          className={cn("shrink-0 rounded-full bg-current", badgeDotSize[size])}
          aria-hidden
        />
      ) : null}
      {showIcon ? (
        <span
          className={cn("inline-flex shrink-0", badgeIconSize[size])}
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {children != null ? <span className="min-w-0">{children}</span> : null}
      {count != null ? (
        isCountOnly ? (
          <span className={badgeCountType[size]}>{count}</span>
        ) : (
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-badge-count font-semibold",
              badgeCountSize[size === "lg" ? "md" : "sm"],
              badgeCountType[size],
            )}
          >
            {count}
          </span>
        )
      ) : null}
    </span>
  );
});

Badge.displayName = "Badge";
