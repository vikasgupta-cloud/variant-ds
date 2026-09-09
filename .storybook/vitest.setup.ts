/**
 * Storybook Vitest setup — a11y annotations must precede project preview
 * so parameters.a11y.test: "error" is not overridden by the addon default.
 */
import { setProjectAnnotations } from "@storybook/react-vite";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import * as projectAnnotations from "./preview";

setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
