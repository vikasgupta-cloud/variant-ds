/**
 * Storybook preview — theme wiring + global toolbars (spec §4).
 * Mode → data-mode, Context → data-context, Side-by-side → light+dark pair.
 */
import type { Decorator, Preview } from "@storybook/react-vite";
import React from "react";
import "../src/styles/theme.css";

type ContextValue = "canvas" | "surface" | "surface-raised";

const contextBackground: Record<ContextValue, string> = {
  canvas: "bg-bg-canvas",
  surface: "bg-bg-surface",
  "surface-raised": "bg-bg-surface-raised",
};

function Frame({
  mode,
  context,
  children,
}: {
  mode: "light" | "dark";
  context: ContextValue;
  children: React.ReactNode;
}) {
  return (
    <div
      data-mode={mode}
      data-context={context}
      className={`min-h-screen w-full p-8 ${contextBackground[context]} text-text-primary`}
    >
      {children}
    </div>
  );
}

const withModeContext: Decorator = (Story, context) => {
  const mode = (context.globals["mode"] as "light" | "dark") ?? "light";
  const dataContext =
    (context.globals["context"] as ContextValue) ?? "canvas";
  const sideBySide =
    context.globals["sideBySide"] === true ||
    context.globals["sideBySide"] === "true";

  if (sideBySide) {
    return (
      <div className="grid min-h-screen w-full grid-cols-2">
        <Frame mode="light" context={dataContext}>
          <Story />
        </Frame>
        <Frame mode="dark" context={dataContext}>
          <Story />
        </Frame>
      </div>
    );
  }

  return (
    <Frame mode={mode} context={dataContext}>
      <Story />
    </Frame>
  );
};

const preview: Preview = {
  tags: ["autodocs"],
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
  decorators: [withModeContext],
};

export default preview;
