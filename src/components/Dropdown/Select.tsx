/**
 * Select — @radix-ui/react-select. Trigger mirrors Input field chrome.
 * Compound parts + optional label. `state` is design-review only.
 */
import * as SelectPrimitive from "@radix-ui/react-select";
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
  selectTriggerVariants,
  type DropdownState,
} from "./Dropdown.variants";

type SelectReviewContextValue = {
  state: DropdownState;
};

const SelectReviewContext = createContext<SelectReviewContextValue>({
  state: "default",
});

function useSelectReview() {
  return useContext(SelectReviewContext);
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

export type SelectProps = ComponentPropsWithoutRef<
  typeof SelectPrimitive.Root
> & {
  label?: ReactNode;
  /**
   * Design-review affordance — forces open/item visuals for Storybook/Figma.
   * Production apps leave this at `default`.
   */
  state?: DropdownState;
  children: ReactNode;
  className?: string;
};

export function Select({
  label,
  state = "default",
  children,
  className,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: SelectProps) {
  const forcedOpen = resolveOpen(state, open);

  return (
    <SelectReviewContext.Provider value={{ state }}>
      <div className={cn("flex w-full flex-col gap-control-label-gap", className)}>
        {label ? (
          <span className="text-sm font-medium text-text-primary">{label}</span>
        ) : null}
        <SelectPrimitive.Root
          {...props}
          {...(forcedOpen !== undefined ? { open: forcedOpen } : {})}
          {...(forcedOpen === undefined && defaultOpen !== undefined
            ? { defaultOpen }
            : {})}
          {...(onOpenChange && state === "default"
            ? { onOpenChange }
            : {})}
        >
          {children}
        </SelectPrimitive.Root>
      </div>
    </SelectReviewContext.Provider>
  );
}

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants(), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span className="inline-flex shrink-0 text-icon-secondary size-icon-size-sm">
          <ChevronDownIcon className="size-full" />
        </span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = SelectPrimitive.Value;

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent(
  { className, children, position = "popper", sideOffset = 4, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        data-context="surface-raised"
        position={position}
        sideOffset={sideOffset}
        className={cn(dropdownContentVariants(), className)}
        {...props}
      >
        <SelectPrimitive.Viewport className="w-full">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = "SelectContent";

export const SelectGroup = SelectPrimitive.Group;

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(dropdownLabelVariants(), className)}
      {...props}
    />
  );
});
SelectLabel.displayName = "SelectLabel";

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    description?: ReactNode;
  }
>(function SelectItem(
  { className, children, description, disabled, ...props },
  ref,
) {
  const { state } = useSelectReview();
  const reviewAttr =
    state === "item-hover" ||
    state === "item-selected" ||
    state === "item-disabled"
      ? state
      : undefined;
  const isDisabled = state === "item-disabled" || Boolean(disabled);

  return (
    <SelectPrimitive.Item
      ref={ref}
      disabled={isDisabled}
      {...(reviewAttr ? { "data-review": reviewAttr } : {})}
      className={cn(dropdownItemVariants(), className)}
      {...props}
    >
      <span className="absolute right-dropdown-item-padding-x inline-flex size-icon-size-sm items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-full text-icon-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-control-gap-sm pr-icon-size-md">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        {description ? (
          <span className="text-xs text-text-secondary data-[disabled]:text-text-disabled">
            {description}
          </span>
        ) : null}
      </div>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn(dropdownSeparatorVariants(), className)}
      {...props}
    />
  );
});
SelectSeparator.displayName = "SelectSeparator";
