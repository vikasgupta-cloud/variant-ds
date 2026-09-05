/**
 * Tag — Surface level-1 chip (hover → level-2). Removable uses Button ghost icon-only.
 * `state` is a design-review affordance (Figma “rest” maps to default) — not for production.
 */
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../Button";
import {
  tagIconSize,
  tagVariants,
  type TagSize,
  type TagState,
} from "./Tag.variants";

function RemoveIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-full" aria-hidden>
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  size?: TagSize;
  /** Shows a ghost icon-only remove control. */
  removable?: boolean;
  onRemove?: () => void;
  icon?: ReactNode;
  /**
   * Design-review affordance — forces a visual state (rest → default).
   * Production apps leave this at `default`.
   */
  state?: TagState;
};

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    className,
    size = "md",
    removable = false,
    onRemove,
    icon,
    state = "default",
    children,
    ...props
  },
  ref,
) {
  const dataState = state === "default" ? undefined : state;
  const isDisabled = state === "disabled";
  const removeSize = size === "lg" ? "sm" : "xs";

  return (
    <span
      ref={ref}
      data-state={dataState}
      aria-disabled={isDisabled || undefined}
      className={cn(tagVariants({ size }), className)}
      {...props}
    >
      {icon ? (
        <span
          className={cn("inline-flex shrink-0", tagIconSize[size])}
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {children != null ? <span className="min-w-0">{children}</span> : null}
      {removable ? (
        <Button
          hierarchy="ghost"
          color="default"
          size={removeSize}
          icon="only"
          iconNode={<RemoveIcon />}
          disabled={isDisabled}
          onClick={onRemove}
          aria-label="Remove"
          className="-my-chip-padding-y-sm"
        >
          Remove
        </Button>
      ) : null}
    </span>
  );
});

Tag.displayName = "Tag";
