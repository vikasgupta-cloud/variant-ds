/**
 * Modal variant map — Overlay scrim + Component modal tokens. Surface-raised panel.
 */
import { cva, type VariantProps } from "class-variance-authority";

/** Design-review affordance — Modal open state is controlled via `open`, not this prop. */
export type ModalState = "default";

export const modalOverlayVariants = cva(
  [
    "fixed inset-0 z-modal",
    "bg-overlay-scrim",
    "opacity-[var(--overlay-scrim-opacity)]",
  ].join(" "),
);

export const modalContentVariants = cva(
  [
    "fixed left-1/2 top-1/2 z-modal",
    "-translate-x-1/2 -translate-y-1/2",
    "flex w-[calc(100%-var(--dimension-32))] flex-col",
    "rounded-modal border border-border-subtle bg-bg-surface-raised",
    "p-modal-padding text-text-primary shadow-sm",
    "outline-none",
    "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
    "focus-visible:outline-[length:var(--focus-ring-width)]",
    "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
    "max-h-[90vh] overflow-hidden",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "max-w-modal-sm",
        md: "max-w-modal-md",
        lg: "max-w-modal-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ModalVariantProps = VariantProps<typeof modalContentVariants>;
