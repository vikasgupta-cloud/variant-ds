/**
 * Manager chrome — Wingify Variant DS theme, sidebar release badges, token editor.
 * manager.css restores yellow selection with dark ink (platform hardcodes white
 * on colorSecondary). CSS variables come from tokens/manager-theme.light.json.
 */
import { addons } from "storybook/manager-api";
import { variantTheme } from "./theme";
import managerTheme from "../tokens/manager-theme.light.json" with { type: "json" };
import {
  RELEASE_PHASE_LABEL,
  releasePhaseForItemName,
} from "../src/docs/release-phase";
import "./addons/token-editor/register.tsx";
import "./manager.css";

const PRODUCT_NAME = "Wingify Variant DS";

// Bridge Role selected/* into manager CSS (manager cannot read preview vars).
const root = document.documentElement;
root.style.setProperty("--sb-selected-bg", managerTheme.selectedBg);
root.style.setProperty("--sb-selected-text", managerTheme.selectedText);

// Keep the browser tab name on our product, not the platform default.
document.title = PRODUCT_NAME;
const titleObserver = new MutationObserver(() => {
  if (document.title.includes("Storybook")) {
    document.title = document.title.replace(/\bStorybook\b/g, PRODUCT_NAME);
  }
});
titleObserver.observe(document.querySelector("title") ?? document.head, {
  childList: true,
  characterData: true,
  subtree: true,
});

addons.setConfig({
  theme: variantTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ["Patterns", "Tools"],
    renderLabel(item) {
      if (item.type === "component" || item.type === "group") {
        const phase = releasePhaseForItemName(item.name);
        if (phase) {
          return `${item.name} · ${RELEASE_PHASE_LABEL[phase]}`;
        }
      }
      return item.name;
    },
  },
});
