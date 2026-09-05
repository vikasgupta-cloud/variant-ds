/**
 * Storybook preview — theme wiring, mode/context toolbars, live token overrides (spec §4, §8).
 * Preview hooks (useChannel) are only called inside this decorator — not in child components.
 */
import type { Decorator, Preview } from "@storybook/react-vite";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChannel } from "storybook/preview-api";
import "../src/styles/theme.css";
import { contrastRatio, resolveCssColorVar } from "../src/docs/contrast";
import {
  EVENTS,
  loadOverrides,
  type TokenOverrides,
} from "../src/docs/token-editor-shared";

/* DM Sans + DM Mono — manager theme + docs typography */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap";
document.head.appendChild(fontLink);
type ContextValue = "canvas" | "surface" | "surface-raised";

const contextBackground: Record<ContextValue, string> = {
  canvas: "bg-bg-canvas",
  surface: "bg-bg-surface",
  "surface-raised": "bg-bg-surface-raised",
};

/** Window event so TokenBrowser (not a decorator) can refresh without preview hooks. */
const CONTRAST_REFRESH_EVENT = "variant-ds:refresh-contrast";

/** Pairs re-checked after every override (warn, don't block). */
const CONTRAST_PAIRS: { fg: string; bg: string; min: number; label: string }[] = [
  { fg: "--text-primary", bg: "--bg-canvas", min: 4.5, label: "text/primary on bg/canvas" },
  { fg: "--text-secondary", bg: "--bg-canvas", min: 4.5, label: "text/secondary on bg/canvas" },
  {
    fg: "--text-on-strong",
    bg: "--bg-info-strong",
    min: 4.5,
    label: "text/on-strong on bg/info/strong",
  },
  {
    fg: "--text-on-inverse",
    bg: "--bg-neutral-strong",
    min: 4.5,
    label: "text/on-inverse on bg/neutral/strong",
  },
  { fg: "--border-default", bg: "--bg-canvas", min: 3, label: "border/default on bg/canvas" },
  { fg: "--border-danger", bg: "--bg-danger-soft", min: 3, label: "border/danger on bg/danger/soft" },
  { fg: "--surface-border", bg: "--bg-canvas", min: 3, label: "surface/border on bg/canvas" },
  { fg: "--surface-control", bg: "--bg-canvas", min: 3, label: "surface/control on bg/canvas" },
];

function applyOverridesToElement(el: HTMLElement, overrides: TokenOverrides) {
  const prev = (el.dataset.tokenOverrideKeys ?? "").split(",").filter(Boolean);
  for (const key of prev) {
    el.style.removeProperty(key);
  }
  const keys = Object.keys(overrides);
  for (const [prop, value] of Object.entries(overrides)) {
    el.style.setProperty(prop, value);
  }
  el.dataset.tokenOverrideKeys = keys.join(",");
}

function collectWarnings(root: HTMLElement): string[] {
  const warnings: string[] = [];
  for (const pair of CONTRAST_PAIRS) {
    const fg = resolveCssColorVar(pair.fg, root);
    const bg = resolveCssColorVar(pair.bg, root);
    if (!fg || !bg) continue;
    const ratio = contrastRatio(fg, bg);
    if (ratio !== null && ratio < pair.min) {
      warnings.push(
        `${pair.label} is ${ratio.toFixed(2)}:1 (needs ≥${pair.min}:1)`,
      );
    }
  }
  return warnings;
}

function Frame({
  mode,
  context,
  overrides,
  children,
}: {
  mode: "light" | "dark";
  context: ContextValue;
  overrides: TokenOverrides;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    applyOverridesToElement(ref.current, overrides);
  }, [overrides, mode, context]);

  return (
    <div
      ref={ref}
      data-mode={mode}
      data-context={context}
      data-token-root=""
      className={`min-h-screen w-full p-8 ${contextBackground[context]} text-text-primary`}
    >
      {children}
    </div>
  );
}

const withTokenTheme: Decorator = (Story, context) => {
  const mode = (context.globals["mode"] as "light" | "dark") ?? "light";
  const dataContext =
    (context.globals["context"] as ContextValue) ?? "canvas";
  const sideBySide =
    context.globals["sideBySide"] === true ||
    context.globals["sideBySide"] === "true";

  const [overrides, setOverrides] = useState<TokenOverrides>(() =>
    loadOverrides(mode),
  );

  const emit = useChannel({
    [EVENTS.SET_OVERRIDES]: (payload: {
      mode: "light" | "dark";
      overrides: TokenOverrides;
    }) => {
      if (payload.mode !== mode) return;
      setOverrides(payload.overrides);
    },
  });

  useEffect(() => {
    setOverrides(loadOverrides(mode));
    emit(EVENTS.MODE_CHANGED, { mode });
  }, [mode, emit]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const root = document.querySelector<HTMLElement>("[data-token-root]");
      const warnings = root ? collectWarnings(root) : [];
      emit(EVENTS.OVERRIDES_APPLIED, { warnings });
      emit(EVENTS.REFRESH_CONTRAST, {});
      window.dispatchEvent(new CustomEvent(CONTRAST_REFRESH_EVENT));
    });
    return () => cancelAnimationFrame(id);
  }, [overrides, mode, dataContext, emit]);

  if (sideBySide) {
    return (
      <div className="grid min-h-screen w-full grid-cols-2">
        <Frame
          mode="light"
          context={dataContext}
          overrides={loadOverrides("light")}
        >
          <Story />
        </Frame>
        <Frame mode="dark" context={dataContext} overrides={loadOverrides("dark")}>
          <Story />
        </Frame>
      </div>
    );
  }

  return (
    <Frame mode={mode} context={dataContext} overrides={overrides}>
      <Story />
    </Frame>
  );
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    options: {
      storySort: {
        order: [
          "Get started",
          [
            "Overview",
            "Installation",
            "For designers",
            "For engineers",
            "Changelog",
          ],
          "Foundations",
          [
            "Colour",
            "Typography",
            "Spacing",
            "Radius",
            "Elevation",
            "Motion",
            "Iconography",
            "Tokens",
            "Contrast",
          ],
          "Components",
          [
            "Forms and input",
            [
              "Button",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Button group",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Input",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Select",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Checkbox",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Radio",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Toggle",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Slider",
              ["Examples", "Usage", "Code", "Accessibility"],
            ],
            "Labels",
            [
              "Badge",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Tag",
              ["Examples", "Usage", "Code", "Accessibility"],
            ],
            "Messaging",
            [
              "Alert",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Modal",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Toast",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Tooltip",
              ["Examples", "Usage", "Code", "Accessibility"],
            ],
            "Navigation",
            [
              "Tabs",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Dropdown menu",
              ["Examples", "Usage", "Code", "Accessibility"],
            ],
            "Loading",
            [
              "Progress bar",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Skeleton",
              ["Examples", "Usage", "Code", "Accessibility"],
            ],
            "Layout",
            [
              "Card",
              ["Examples", "Usage", "Code", "Accessibility"],
              "Page header",
              ["Examples", "Usage", "Code", "Accessibility"],
            ],
          ],
          "Patterns",
          [
            "Forms",
            "Empty states",
            "Destructive actions",
            "AI surfaces",
          ],
          "Tools",
          ["Figma library", "Token export", "Contributing"],
        ],
      },
    },
  },
  globalTypes: {
    mode: {
      description: "Color mode",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    context: {
      description: "Surface context",
      toolbar: {
        title: "Context",
        icon: "component",
        items: [
          { value: "canvas", title: "Canvas" },
          { value: "surface", title: "Surface" },
          { value: "surface-raised", title: "Surface-raised" },
        ],
        dynamicTitle: true,
      },
    },
    sideBySide: {
      description: "Render light and dark side by side",
      toolbar: {
        title: "Side by side",
        icon: "sidebyside",
        items: [
          { value: false, title: "Single" },
          { value: true, title: "Side by side" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: "light",
    context: "canvas",
    sideBySide: false,
  },
  decorators: [withTokenTheme],
};

export default preview;
