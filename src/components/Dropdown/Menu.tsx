/**
 * DropdownMenu — @radix-ui/react-dropdown-menu. Use Button as Trigger via asChild.
 * Supports checkbox items for multi-select. `state` is design-review only.
 */
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  dropdownContentVariants,
  dropdownItemVariants,
  dropdownLabelVariants,
  dropdownSeparatorVariants,
  type DropdownState,
} from "./Dropdown.variants";

type MenuReviewContextValue = {
  state: DropdownState;
};

const MenuReviewContext = createContext<MenuReviewContextValue>({
  state: "default",
});

function useMenuReview() {
  return useContext(MenuReviewContext);
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 8.5l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function resolveOpen(
  state: DropdownState,
  open: boolean | undefined,
): boolean | undefined {
  if (state === "closed") return false;
  if (
    state === "open" ||
    state === "item-hover" ||
    state === "item-selected" ||
    state === "item-disabled"
  ) {
    return true;
  }
  return open;
}

export type DropdownMenuProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
> & {
  /**
   * Design-review affordance — forces open/item visuals for Storybook/Figma.
   * Production apps leave this at `default`.
   */
  state?: DropdownState;
};

export function DropdownMenu({
  state = "default",
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: DropdownMenuProps) {
  const forcedOpen = resolveOpen(state, open);

  return (
    <MenuReviewContext.Provider value={{ state }}>
      <DropdownMenuPrimitive.Root
        {...props}
        {...(forcedOpen !== undefined ? { open: forcedOpen } : {})}
        {...(forcedOpen === undefined && defaultOpen !== undefined
          ? { defaultOpen }
          : {})}
        {...(onOpenChange && state === "default" ? { onOpenChange } : {})}
      >
        {children}
      </DropdownMenuPrimitive.Root>
    </MenuReviewContext.Provider>
  );
}

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(function DropdownMenuContent(
  { className, sideOffset = 4, children, ...props },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        data-context="surface-raised"
        sideOffset={sideOffset}
        className={cn(
          dropdownContentVariants(),
          "min-w-48",
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(dropdownLabelVariants(), className)}
      {...props}
    />
  );
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    description?: ReactNode;
  }
>(function DropdownMenuItem(
  { className, children, description, disabled, ...props },
  ref,
) {
  const { state } = useMenuReview();
  const reviewAttr =
    state === "item-hover" ||
    state === "item-selected" ||
    state === "item-disabled"
      ? state
      : undefined;
  const isDisabled = state === "item-disabled" || Boolean(disabled);

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      disabled={isDisabled}
      {...(reviewAttr ? { "data-review": reviewAttr } : {})}
      className={cn(dropdownItemVariants(), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-control-gap-sm">
        <span>{children}</span>
        {description ? (
          <span className="text-xs text-text-secondary">{description}</span>
        ) : null}
      </div>
    </DropdownMenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
    description?: ReactNode;
  }
>(function DropdownMenuCheckboxItem(
  { className, children, description, checked, disabled, ...props },
  ref,
) {
  const { state } = useMenuReview();
  const reviewAttr =
    state === "item-hover" ||
    state === "item-selected" ||
    state === "item-disabled"
      ? state
      : undefined;
  const isDisabled = state === "item-disabled" || Boolean(disabled);
  const resolvedChecked =
    state === "item-selected" ? true : checked;

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      {...(resolvedChecked !== undefined ? { checked: resolvedChecked } : {})}
      disabled={isDisabled}
      {...(reviewAttr ? { "data-review": reviewAttr } : {})}
      className={cn(dropdownItemVariants(), "pl-icon-size-lg", className)}
      {...props}
    >
      <span className="absolute left-dropdown-item-padding-x inline-flex size-icon-size-sm items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-full text-icon-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-control-gap-sm">
        <span>{children}</span>
        {description ? (
          <span className="text-xs text-text-secondary">{description}</span>
        ) : null}
      </div>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(dropdownSeparatorVariants(), className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
