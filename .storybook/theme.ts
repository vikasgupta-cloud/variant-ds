/**
 * Storybook manager theme — mirrors resolved Role + Primitive values (light mode).
 * Hex lives in tokens/manager-theme.light.json (manager cannot read preview CSS vars).
 *
 * Important: Storybook paints `color.lightest` (white) on `colorSecondary` fills
 * (sidebar selection, solid buttons). Yellow accent fails that pattern — secondary
 * is therefore near-black (selected/text). Brand yellow selection is restored in
 * manager.css with selected/text ink.
 */
import { create } from "storybook/theming";
import role from "../tokens/manager-theme.light.json" with { type: "json" };

export const variantTheme = create({
  base: "light",
  brandTitle: "Wingify Variant DS",
  brandUrl: "./",
  brandTarget: "_self",

  fontBase: '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: '"DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  colorPrimary: role.textPrimary,
  /** Must work with Storybook’s hardcoded white ink on secondary fills. */
  colorSecondary: role.selectedText,

  appBg: role.bgCanvas,
  appContentBg: role.bgSurface,
  appPreviewBg: role.bgCanvas,
  appBorderColor: role.borderSubtle,
  appBorderRadius: role.radiusMd,

  textColor: role.textPrimary,
  textInverseColor: role.bgSurface,
  textMutedColor: role.textSecondary,

  barTextColor: role.textSecondary,
  /** Underline / selected toolbar text — dark, not yellow (yellow fails on white). */
  barSelectedColor: role.selectedText,
  barHoverColor: role.textPrimary,
  barBg: role.bgSurface,

  inputBg: role.bgSurface,
  inputBorder: role.borderSubtle,
  inputTextColor: role.textPrimary,
  inputBorderRadius: role.radiusSm,

  buttonBg: role.surfaceLevel1,
  buttonBorder: role.borderSubtle,

  booleanBg: role.surfaceLevel1,
  /** Track fill for boolean; knob contrast handled by Storybook chrome. */
  booleanSelectedBg: role.selectedBg,
});
