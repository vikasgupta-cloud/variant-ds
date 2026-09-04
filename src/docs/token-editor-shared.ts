/**
 * Shared Storybook channel events + localStorage keys for the runtime token editor (spec §8).
 */
export const ADDON_ID = "variant-ds/token-editor";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = "tokenEditor";

export const EVENTS = {
  /** Manager → preview: apply overrides for a mode. */
  SET_OVERRIDES: `${ADDON_ID}/set-overrides`,
  /** Preview → manager: request current state / announce applied. */
  OVERRIDES_APPLIED: `${ADDON_ID}/overrides-applied`,
  /** Preview → manager: current mode from toolbar. */
  MODE_CHANGED: `${ADDON_ID}/mode-changed`,
  /** Preview → anyone in iframe: recompute live contrast. */
  REFRESH_CONTRAST: `${ADDON_ID}/refresh-contrast`,
} as const;

export const STORAGE_PREFIX = "variant-ds:token-overrides:";

export function storageKey(mode: "light" | "dark"): string {
  return `${STORAGE_PREFIX}${mode}`;
}

export type TokenOverrides = Record<string, string>;

export function loadOverrides(mode: "light" | "dark"): TokenOverrides {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(storageKey(mode));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as TokenOverrides;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveOverrides(mode: "light" | "dark", overrides: TokenOverrides): void {
  if (typeof localStorage === "undefined") return;
  if (Object.keys(overrides).length === 0) {
    localStorage.removeItem(storageKey(mode));
  } else {
    localStorage.setItem(storageKey(mode), JSON.stringify(overrides));
  }
}
