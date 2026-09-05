/**
 * Shared Dropdown surfaces — Select + Menu content/items.
 * Menu portal stacks just below z/modal via calc(var(--z-modal) - 10).
 */
import { cva, type VariantProps } from "class-variance-authority";

/** Design-review affordance — not for production. Default lets Radix handle open/highlight. */
export type DropdownState =
  | "default"
  | "closed"
  | "open"
  | "item-hover"
  | "item-selected"
  | "item-disabled";

const focusRing = [
  "focus-visible:outline-solid focus-visible:outline focus-visible:outline-border-focus",
  "focus-visible:outline-[length:var(--focus-ring-width)]",
  "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
].join(" ");

/** Select trigger — Input-ish recessed field. */
export const selectTriggerVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center justify-between gap-control-gap-md",
    "rounded-control border border-border-default bg-surface-field",
    "px-control-padding-x-md py-control-padding-y-md text-sm text-text-primary",
    "transition-colors motion-reduce:transition-none outline-none",
    "hover:bg-surface-field-hover data-[state=hover]:bg-surface-field-hover",
    "data-[placeholder]:text-text-tertiary",
    focusRing,
    "data-[state=open]:border-border-focus",
    "disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-text-disabled disabled:border-border-subtle",
    "data-[disabled]:cursor-not-allowed data-[disabled]:bg-bg-disabled data-[disabled]:text-text-disabled",
    // Read-only: value stays text/primary on bg/disabled (legible); disabled uses text/disabled.
    "data-[readonly]:cursor-default data-[readonly]:pointer-events-none data-[readonly]:bg-bg-disabled data-[readonly]:text-text-primary data-[readonly]:border-border-subtle",
  ].join(" "),
);

/** Floating panel for Select and Menu. */
export const dropdownContentVariants = cva(
  [
    "z-[calc(var(--z-modal)-10)]",
    "min-w-[var(--radix-select-trigger-width,12rem)]",
    "overflow-hidden",
    "rounded-dropdown-menu border border-border-subtle bg-bg-surface-raised",
    "py-dropdown-menu-padding-y shadow-sm",
    "text-sm text-text-primary",
  ].join(" "),
);

export const dropdownItemVariants = cva(
  [
    "relative flex w-full cursor-default select-none items-center gap-control-gap-sm",
    "px-dropdown-item-padding-x py-dropdown-item-padding-y",
    "text-sm text-text-primary outline-none",
    "data-[highlighted]:bg-surface-level-1",
    "data-[state=checked]:bg-surface-level-2",
    "data-[disabled]:pointer-events-none data-[disabled]:text-text-disabled",
    // Design-review forced states on the item
    "data-[review=item-hover]:bg-surface-level-1",
    "data-[review=item-selected]:bg-surface-level-2",
    "data-[review=item-disabled]:pointer-events-none data-[review=item-disabled]:text-text-disabled",
  ].join(" "),
);

export const dropdownLabelVariants = cva(
  "px-dropdown-item-padding-x py-dropdown-item-padding-y text-xs font-medium text-text-tertiary",
);

export const dropdownSeparatorVariants = cva(
  "my-dropdown-menu-padding-y h-px bg-border-subtle",
);

export type SelectTriggerVariantProps = VariantProps<
  typeof selectTriggerVariants
>;
export type DropdownContentVariantProps = VariantProps<
  typeof dropdownContentVariants
>;
