/**
 * Storybook manager theme — mirrors resolved Role + Primitive values (light mode).
 * Manager cannot read preview CSS variables; keep in sync with tokens/*.json.
 *
 * Mapping:
 *   appBg          → bg/canvas      (neutral-50)
 *   appContentBg   → bg/surface     (neutral-0)
 *   textColor      → text/primary   (neutral-950)
 *   textMutedColor → text/secondary (neutral-600)
 *   appBorderColor → border/subtle  (neutral-200)
 *   colorSecondary → selected/bg    (yellow-accent) + selected/text (neutral-950)
 */
import { create } from "storybook/theming";

/** Resolved light-mode Role / Primitive values — do not invent new hex here. */
const role = {
  bgCanvas: "#f6f3ed", // bg/canvas → neutral.50
  bgSurface: "#ffffff", // bg/surface → neutral.0
  textPrimary: "#1b1913", // text/primary → neutral.950
  textSecondary: "#5f5c53", // text/secondary → neutral.600
  textTertiary: "#79756b", // text/tertiary → neutral.500
  borderSubtle: "#dbd6cb", // border/subtle → neutral.200
  selectedBg: "#eeff6d", // selected/bg → yellow.accent
  selectedText: "#1b1913", // selected/text → neutral.950
  surfaceLevel1: "#e5e0d6", // surface/level-1 on canvas → neutral.100
  radiusMd: 8, // radius/md
  radiusSm: 4, // radius/sm
} as const;

export const variantTheme = create({
  base: "light",
  brandTitle: "VWO Variant",
  brandUrl: "./",
  brandTarget: "_self",

  fontBase: '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: '"DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace',

  colorPrimary: role.textPrimary,
  /** Active sidebar / selected chrome — selected/bg (yellow) */
  colorSecondary: role.selectedBg,

  appBg: role.bgCanvas,
  appContentBg: role.bgSurface,
  appPreviewBg: role.bgCanvas,
  appBorderColor: role.borderSubtle,
  appBorderRadius: role.radiusMd,

  textColor: role.textPrimary,
  textInverseColor: role.selectedText,
  textMutedColor: role.textSecondary,

  barTextColor: role.textSecondary,
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
  booleanSelectedBg: role.selectedBg,
});
