/**
 * ESLint flat config — AC §9.1: fail on hex literals and raw `px` outside tokens/.
 * Generated token CSS/JSON and Storybook static output are ignored.
 */
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const noHardcodedTokens = {
  "no-restricted-syntax": [
    "error",
    {
      selector:
        "Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
      message:
        "Hex colour literals are forbidden outside tokens/. Use a Role/Surface/Structure token (or put the value in tokens/).",
    },
    {
      selector: "TemplateElement[value.cooked=/#[0-9a-fA-F]{3,8}\\b/]",
      message:
        "Hex colour literals are forbidden outside tokens/. Use a Role/Surface/Structure token (or put the value in tokens/).",
    },
    {
      selector: "Literal[value=/\\d+px\\b/]",
      message:
        "Raw px values are forbidden outside tokens/. Use dimension/* or a Structure token.",
    },
    {
      selector: "TemplateElement[value.cooked=/\\d+px\\b/]",
      message:
        "Raw px values are forbidden outside tokens/. Use dimension/* or a Structure token.",
    },
  ],
};

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/storybook-static/**",
      "**/dist/**",
      "tokens/**",
      "src/styles/tokens/**",
      "public/specs/**",
      "pnpm-lock.yaml",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...noHardcodedTokens,
      // Design-system repo — allow underscore unused when needed for cva exhaustiveness
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
