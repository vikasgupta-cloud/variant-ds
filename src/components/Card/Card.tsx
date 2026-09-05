/**
 * Card — Surface nesting + Role chrome (border/subtle, shadow/sm).
 * Component tokens: card/radius, card/padding. Sets data-context so nested cards resolve levels.
 */
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import {
  cardContext,
  cardVariants,
  type CardState,
  type CardVariantProps,
} from "./Card.variants";

export type CardProps = HTMLAttributes<HTMLDivElement> &
  CardVariantProps & {
    asChild?: boolean;
    header?: ReactNode;
    footer?: ReactNode;
    /**
     * Design-review affordance — forces a visual state (interactive cards).
     * Production apps leave this at `default`.
     */
    state?: CardState;
  };

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    variant = "default",
    asChild = false,
    header,
    footer,
    state = "default",
    children,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : "div";
  const resolvedVariant = variant ?? "default";
  const context = cardContext[resolvedVariant];
  const dataState = state === "default" ? undefined : state;
  const isDisabled = state === "disabled";

  return (
    <Comp
      ref={ref}
      data-context={context}
      data-state={dataState}
      aria-disabled={isDisabled || undefined}
      className={cn(cardVariants({ variant: resolvedVariant }), className)}
      {...props}
    >
      {header ? (
        <div className="mb-layout-stack flex flex-col gap-layout-stack-tight">
          {header}
        </div>
      ) : null}
      {children ? <div className="min-w-0 flex-1">{children}</div> : null}
      {footer ? (
        <div className="mt-layout-stack flex flex-wrap items-center gap-layout-stack">
          {footer}
        </div>
      ) : null}
    </Comp>
  );
});

Card.displayName = "Card";
