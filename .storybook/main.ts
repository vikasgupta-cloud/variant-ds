// Purpose: Storybook 10 main config — React + Vite, ESM. Addons from spec §4.
// Tailwind v4 via @tailwindcss/vite (no tailwind.config.js).
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../src/docs/**/*.mdx",
    "../src/docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    // Hide Storybook’s Get started checklist / Guide chrome
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
  },
  managerHead: (head) =>
    `${head}<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" />`,
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
    });
  },
};

export default config;
