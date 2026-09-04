/**
 * Registers the runtime Tokens addon panel (spec §8).
 */
import React from "react";
import { addons, types } from "storybook/manager-api";
import { ADDON_ID, PANEL_ID } from "../../../src/docs/token-editor-shared.ts";
import { TokenEditorPanel } from "./Panel.tsx";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Tokens",
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: ({ active }) => <TokenEditorPanel active={!!active} />,
  });
});
