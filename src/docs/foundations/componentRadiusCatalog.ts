/**
 * Component radius assignments for Foundations / Radius.
 * Mirrors Structure control/radius and component.size.json — keep in sync
 * when a component changes its corner token.
 */
export type RadiusTokenRef = {
  /** Human path, e.g. control/radius or badge/count-radius */
  path: string;
  /** CSS custom property without leading -- */
  cssVar: string;
};

export type ComponentRadiusRow = {
  component: string;
  /** e.g. menu, count, track, list (button) */
  part?: string;
  /** Token the component binds (Structure or Component layer). */
  radius: RadiusTokenRef;
  /** Primitive step this token aliases, e.g. radius/xs */
  primitive: string;
};

const row = (
  component: string,
  path: string,
  cssVar: string,
  primitive: string,
  part?: string,
): ComponentRadiusRow => ({
  component,
  ...(part ? { part } : {}),
  radius: { path, cssVar },
  primitive,
});

/** Flat rows for the reference table — one row per component × part. */
export const COMPONENT_RADIUS_ROWS: ComponentRadiusRow[] = [
  // ── Structure control/radius ───────────────────────────────
  row("Button", "control/radius", "control-radius", "radius/xs"),
  row("Input", "control/radius", "control-radius", "radius/xs"),
  row("Select", "control/radius", "control-radius", "radius/xs", "trigger"),
  row("ButtonGroup", "segment/radius-outer", "segment-radius-outer", "radius/sm", "root"),
  row("ButtonGroup", "segment/radius-inner", "segment-radius-inner", "radius/none", "item"),
  row("Tooltip", "control/radius", "control-radius", "radius/xs"),

  // ── Component tokens ───────────────────────────────────────
  row("Badge", "badge/radius", "badge-radius", "radius/full"),
  row("Badge", "badge/count-radius", "badge-count-radius", "radius/xs", "count"),
  row("Tag", "tag/radius", "tag-radius", "radius/xs"),
  row("Checkbox", "checkbox/radius", "checkbox-radius", "radius/xs"),
  row("Radio", "radio/radius", "radio-radius", "radius/full"),
  row("Toggle", "toggle/radius", "toggle-radius", "radius/full", "track"),
  row("Tabs", "tab/container-radius", "tab-container-radius", "radius/sm", "list (button)"),
  row("Tabs", "tab/radius", "tab-radius", "radius/xs", "item (button)"),
  row("Dropdown", "dropdown/menu-radius", "dropdown-menu-radius", "radius/sm", "menu"),
  row("Alert", "alert/radius", "alert-radius", "radius/sm"),
  row("Card", "card/radius", "card-radius", "radius/md"),
  row("Progress", "progress/radius", "progress-radius", "radius/full", "track"),
  row("Slider", "progress/radius", "progress-radius", "radius/full", "track"),
];
