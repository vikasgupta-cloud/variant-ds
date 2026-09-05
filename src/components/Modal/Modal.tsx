/**
 * Modal — Overlay scrim + z/modal + Component modal tokens. Panel is surface-raised.
 * Stress-tests nested Surface context (e.g. a Card inside the dialog).
 */
import * as Dialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../Button";
import {
  modalContentVariants,
  modalOverlayVariants,
  type ModalState,
  type ModalVariantProps,
} from "./Modal.variants";

export type ModalProps = ModalVariantProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** Element that opens the dialog (Radix Trigger). */
  trigger?: ReactNode;
  /**
   * Design-review affordance — Modal has no forced pseudo-states; leave at default.
   * Production apps rely on `open` / trigger interaction.
   */
  state?: ModalState;
  className?: string;
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    defaultOpen,
    onOpenChange,
    size = "md",
    title,
    description,
    children,
    footer,
    trigger,
    state: _state = "default",
    className,
  },
  ref,
) {
  const descriptionId = description
    ? "variant-ds-modal-description"
    : undefined;

  return (
    <Dialog.Root
      {...(open !== undefined ? { open } : {})}
      {...(defaultOpen !== undefined ? { defaultOpen } : {})}
      {...(onOpenChange ? { onOpenChange } : {})}
    >
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className={modalOverlayVariants()} />
        <Dialog.Content
          ref={ref}
          data-context="surface-raised"
          aria-describedby={descriptionId}
          className={cn(modalContentVariants({ size }), className)}
        >
          <div className="flex shrink-0 items-start justify-between gap-layout-stack">
            <div className="min-w-0 flex-1">
              <Dialog.Title className="text-base font-semibold text-text-primary">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description
                  id={descriptionId}
                  className="mt-layout-stack-tight text-sm text-text-secondary"
                >
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <Button
                hierarchy="ghost"
                size="sm"
                icon="only"
                aria-label="Close"
                iconNode={
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-full"
                    aria-hidden
                  >
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />
            </Dialog.Close>
          </div>

          {children ? (
            <div className="mt-layout-stack min-h-0 flex-1 overflow-y-auto">
              {children}
            </div>
          ) : null}

          {footer ? (
            <div className="mt-layout-stack flex shrink-0 flex-wrap items-center justify-end gap-layout-stack">
              {footer}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

Modal.displayName = "Modal";
