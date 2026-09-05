/**
 * Icon — sole public entry for Phosphor icons.
 * Consumers must import from here, never from `@phosphor-icons/react`.
 * Regular (line) weight only. Colour via currentColor / surrounding text token.
 */
import {
  ArrowRight,
  CaretDown,
  Check,
  CheckCircle,
  Copy,
  DotsThree,
  Info,
  MagnifyingGlass,
  Minus,
  PencilSimple,
  Plus,
  Question,
  Trash,
  Warning,
  WarningCircle,
  X,
  XCircle,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

/** Icons the design system ships — curated subset, not the full Phosphor set. */
export const SYSTEM_ICONS = {
  "arrow-right": ArrowRight,
  "caret-down": CaretDown,
  check: Check,
  "check-circle": CheckCircle,
  copy: Copy,
  "dots-three": DotsThree,
  info: Info,
  "magnifying-glass": MagnifyingGlass,
  minus: Minus,
  "pencil-simple": PencilSimple,
  plus: Plus,
  question: Question,
  trash: Trash,
  warning: Warning,
  "warning-circle": WarningCircle,
  x: X,
  "x-circle": XCircle,
} as const;

export type IconName = keyof typeof SYSTEM_ICONS;

/** Phosphor export name for docs / import snippets. */
export const ICON_PHOSPHOR_NAME: Record<IconName, string> = {
  "arrow-right": "ArrowRight",
  "caret-down": "CaretDown",
  check: "Check",
  "check-circle": "CheckCircle",
  copy: "Copy",
  "dots-three": "DotsThree",
  info: "Info",
  "magnifying-glass": "MagnifyingGlass",
  minus: "Minus",
  "pencil-simple": "PencilSimple",
  plus: "Plus",
  question: "Question",
  trash: "Trash",
  warning: "Warning",
  "warning-circle": "WarningCircle",
  x: "X",
  "x-circle": "XCircle",
};

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const ICON_SIZE_CLASS: Record<IconSize, string> = {
  xs: "size-icon-size-xs",
  sm: "size-icon-size-sm",
  md: "size-icon-size-md",
  lg: "size-icon-size-lg",
  xl: "size-icon-size-xl",
};

export type IconProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children" | "color"
> & {
  name: IconName;
  /** Bound to icon/size/* structure tokens. */
  size?: IconSize;
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { name, size = "md", className, ...props },
  ref,
) {
  const Glyph: PhosphorIcon = SYSTEM_ICONS[name];

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center justify-center text-current",
        ICON_SIZE_CLASS[size],
        className,
      )}
      {...props}
    >
      <Glyph
        weight="regular"
        className="size-full"
        color="currentColor"
        aria-hidden
      />
    </span>
  );
});

Icon.displayName = "Icon";
