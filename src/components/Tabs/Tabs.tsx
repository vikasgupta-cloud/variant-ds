/**
 * Tabs — Radix Tabs compound API: Tabs, TabsList, TabsTrigger, TabsContent.
 * Variants: underline | button. Size via context. Trigger `state` for design review.
 */
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import {
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerIconSize,
  tabsTriggerVariants,
  type TabsSize,
  type TabsTriggerState,
  type TabsVariant,
} from "./Tabs.variants";

type TabsContextValue = {
  variant: TabsVariant;
  size: TabsSize;
};

const TabsContext = createContext<TabsContextValue>({
  variant: "underline",
  size: "md",
});

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
  size?: TabsSize;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, variant = "underline", size = "md", ...props },
  ref,
) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <TabsPrimitive.Root
        ref={ref}
        className={cn("flex flex-col", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
});

Tabs.displayName = "Tabs";

export type TabsListProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
>;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ className, ...props }, ref) {
    const { variant } = useContext(TabsContext);
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

TabsList.displayName = "TabsList";

export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & {
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional trailing badge / count node (e.g. Badge). */
  badge?: ReactNode;
  /**
   * Design-review affordance — forces active/disabled visuals.
   * Production apps leave this at `default`.
   */
  state?: TabsTriggerState;
};

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger(
    {
      className,
      icon,
      badge,
      state = "default",
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    const { variant, size } = useContext(TabsContext);
    const forceDisabled = state === "disabled";
    const forceActive = state === "active";
    const isDisabled = disabled || forceDisabled;

    const reviewDataState = forceActive
      ? "active"
      : forceDisabled
        ? "disabled"
        : undefined;

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        disabled={isDisabled}
        {...(reviewDataState ? { "data-state": reviewDataState } : {})}
        className={cn(tabsTriggerVariants({ variant, size }), className)}
        {...props}
      >
        {icon ? (
          <span
            className={cn("inline-flex shrink-0", tabsTriggerIconSize[size])}
            aria-hidden
          >
            {icon}
          </span>
        ) : null}
        {children != null ? <span className="min-w-0">{children}</span> : null}
        {badge ? <span className="inline-flex shrink-0">{badge}</span> : null}
      </TabsPrimitive.Trigger>
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export type TabsContentProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ className, ...props }, ref) {
    const { size } = useContext(TabsContext);
    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(tabsContentVariants({ size }), className)}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";
