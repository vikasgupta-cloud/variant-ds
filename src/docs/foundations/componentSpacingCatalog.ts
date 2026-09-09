/**
 * Component padding & size assignments for Foundations / Spacing.
 * Mirrors Structure (control/*, chip/*) and component.size.json usage in
 * variant maps — keep in sync when a component changes its sizing tokens.
 */
export type SpacingTokenRef = {
  /** Human path, e.g. control/padding-x/md */
  path: string;
  /** CSS custom property without leading -- */
  cssVar: string;
};

export type ComponentSpacingRow = {
  component: string;
  /** e.g. icon-only, menu item, track */
  part?: string;
  size: string;
  paddingX?: SpacingTokenRef;
  paddingY?: SpacingTokenRef;
  /** Uniform padding (all sides) — shown in both X and Y columns. */
  padding?: SpacingTokenRef;
  sizeTokens?: SpacingTokenRef[];
};

const controlPad = (size: string): Pick<ComponentSpacingRow, "paddingX" | "paddingY"> => ({
  paddingX: {
    path: `control/padding-x/${size}`,
    cssVar: `control-padding-x-${size}`,
  },
  paddingY: {
    path: `control/padding-y/${size}`,
    cssVar: `control-padding-y-${size}`,
  },
});

const iconPad = (size: string): Pick<ComponentSpacingRow, "paddingX" | "paddingY"> => ({
  paddingX: {
    path: `control/icon-padding/${size}`,
    cssVar: `control-icon-padding-${size}`,
  },
  paddingY: {
    path: `control/icon-padding/${size}`,
    cssVar: `control-icon-padding-${size}`,
  },
});

const chipPad = (size: string): Pick<ComponentSpacingRow, "paddingX" | "paddingY"> => ({
  paddingX: {
    path: `chip/padding-x/${size}`,
    cssVar: `chip-padding-x-${size}`,
  },
  paddingY: {
    path: `chip/padding-y/${size}`,
    cssVar: `chip-padding-y-${size}`,
  },
});

const CONTROL_SIZES = ["xs", "sm", "md", "lg"] as const;
const CHIP_SIZES = ["sm", "md", "lg"] as const;
const SM_MD_LG = ["sm", "md", "lg"] as const;

/** Flat rows for the reference table — one row per component × size × part. */
export const COMPONENT_SPACING_ROWS: ComponentSpacingRow[] = [
  // ── control/* ──────────────────────────────────────────────
  ...CONTROL_SIZES.map(
    (size): ComponentSpacingRow => ({
      component: "Button",
      size,
      ...controlPad(size),
    }),
  ),
  ...CONTROL_SIZES.map(
    (size): ComponentSpacingRow => ({
      component: "Button",
      part: "icon-only",
      size,
      ...iconPad(size),
    }),
  ),
  ...SM_MD_LG.map(
    (size): ComponentSpacingRow => ({
      component: "Input",
      size,
      ...controlPad(size),
    }),
  ),
  {
    component: "Select",
    part: "trigger",
    size: "md",
    ...controlPad("md"),
  },
  ...SM_MD_LG.map(
    (size): ComponentSpacingRow => ({
      component: "ButtonGroup",
      size,
      ...controlPad(size),
    }),
  ),
  ...SM_MD_LG.map(
    (size): ComponentSpacingRow => ({
      component: "ButtonGroup",
      part: "icon-only",
      size,
      ...iconPad(size),
    }),
  ),
  {
    component: "Tooltip",
    size: "—",
    ...controlPad("sm"),
  },

  // ── chip/* ─────────────────────────────────────────────────
  ...CHIP_SIZES.map(
    (size): ComponentSpacingRow => ({
      component: "Badge",
      size,
      ...chipPad(size),
    }),
  ),
  ...CHIP_SIZES.map(
    (size): ComponentSpacingRow => ({
      component: "Tag",
      size,
      ...chipPad(size),
    }),
  ),
  ...CHIP_SIZES.map(
    (size): ComponentSpacingRow => ({
      component: "Tabs",
      part: "item",
      size,
      ...chipPad(size),
      sizeTokens: [
        {
          path: `tab/content-gap/${size}`,
          cssVar: `tab-content-gap-${size}`,
        },
      ],
    }),
  ),
  {
    component: "Tabs",
    part: "list (button)",
    size: "—",
    padding: {
      path: "tab/container-padding",
      cssVar: "tab-container-padding",
    },
  },

  // ── component.size padding ─────────────────────────────────
  {
    component: "Dropdown",
    part: "menu",
    size: "—",
    paddingY: {
      path: "dropdown/menu-padding-y",
      cssVar: "dropdown-menu-padding-y",
    },
  },
  {
    component: "Dropdown",
    part: "item",
    size: "—",
    paddingX: {
      path: "dropdown/item-padding-x",
      cssVar: "dropdown-item-padding-x",
    },
    paddingY: {
      path: "dropdown/item-padding-y",
      cssVar: "dropdown-item-padding-y",
    },
  },
  {
    component: "Alert",
    size: "—",
    padding: {
      path: "alert/padding",
      cssVar: "alert-padding",
    },
  },
  {
    component: "Card",
    size: "—",
    padding: {
      path: "card/padding",
      cssVar: "card-padding",
    },
  },
  ...SM_MD_LG.map(
    (size): ComponentSpacingRow => ({
      component: "Toggle",
      part: "track",
      size,
      padding: {
        path: "toggle/track-padding",
        cssVar: "toggle-track-padding",
      },
      sizeTokens: [
        {
          path: `toggle/track-width/${size}`,
          cssVar: `toggle-track-width-${size}`,
        },
        {
          path: `toggle/track-height/${size}`,
          cssVar: `toggle-track-height-${size}`,
        },
        {
          path: `toggle/knob-size/${size}`,
          cssVar: `toggle-knob-size-${size}`,
        },
      ],
    }),
  ),

  // ── size-only (no x/y padding) ─────────────────────────────
  ...SM_MD_LG.map(
    (size): ComponentSpacingRow => ({
      component: "Checkbox",
      size,
      sizeTokens: [
        {
          path: `checkbox/size/${size}`,
          cssVar: `checkbox-size-${size}`,
        },
      ],
    }),
  ),
  ...SM_MD_LG.map(
    (size): ComponentSpacingRow => ({
      component: "Radio",
      size,
      sizeTokens: [
        {
          path: `radio/size/${size}`,
          cssVar: `radio-size-${size}`,
        },
        {
          path: `radio/dot-size/${size}`,
          cssVar: `radio-dot-size-${size}`,
        },
      ],
    }),
  ),
  {
    component: "Progress",
    size: "—",
    sizeTokens: [
      {
        path: "progress/track-height",
        cssVar: "progress-track-height",
      },
    ],
  },
  {
    component: "Slider",
    size: "—",
    sizeTokens: [
      {
        path: "slider/thumb-size",
        cssVar: "slider-thumb-size",
      },
    ],
  },
  ...(["xs", "sm", "md", "lg", "xl"] as const).map(
    (size): ComponentSpacingRow => ({
      component: "Icon",
      size,
      sizeTokens: [
        {
          path: `icon/size/${size}`,
          cssVar: `icon-size-${size}`,
        },
      ],
    }),
  ),
];
