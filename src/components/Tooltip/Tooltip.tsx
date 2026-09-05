/**
 * Tooltip — Radix Tooltip. Soft inverse surface (bg/tooltip + text/on-inverse).
 * Zero component tokens. Delay respects prefers-reduced-motion via short default.
 */
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { tooltipContentVariants } from "./Tooltip.variants";

export type TooltipProps = {
  /** Trigger element (must accept a ref — wrap text in a span if needed). */
  children: ReactNode;
  /** Tooltip body copy. */
  content: ReactNode;
  /** Side relative to the trigger. */
  side?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
  /** Alignment along the side. */
  align?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["align"];
  /** Open delay in ms. Default 200. */
  delayDuration?: number;
  /** Controlled open (optional). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function TooltipProvider({
  children,
  delayDuration = 200,
  ...props
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

export const Tooltip = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(function Tooltip(
  {
    children,
    content,
    side = "top",
    align = "center",
    delayDuration = 200,
    open,
    defaultOpen,
    onOpenChange,
    className,
  },
  ref,
) {
  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration}
      {...(open !== undefined ? { open } : {})}
      {...(defaultOpen !== undefined ? { defaultOpen } : {})}
      {...(onOpenChange ? { onOpenChange } : {})}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          align={align}
          sideOffset={4}
          className={cn(tooltipContentVariants(), className)}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});

Tooltip.displayName = "Tooltip";
