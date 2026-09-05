/**
 * Storybook manager — VWO Variant theme, sidebar release badges, token editor.
 */
import { addons } from "storybook/manager-api";
import { variantTheme } from "./theme";
import {
  RELEASE_PHASE_LABEL,
  releasePhaseForItemName,
} from "../src/docs/release-phase";
import "./addons/token-editor/register.tsx";

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
