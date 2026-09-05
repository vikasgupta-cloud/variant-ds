/**
 * Release phases for components — sidebar + page badge (all shipped components are Beta).
 */
export type ReleasePhase = "stable" | "beta" | "caution" | "deprecated";

export const RELEASE_PHASE_LABEL: Record<ReleasePhase, string> = {
  stable: "Stable",
  beta: "Beta",
  caution: "Caution",
  deprecated: "Deprecated",
};

/** Map Storybook component folder name → phase */
export const COMPONENT_RELEASE_PHASE: Record<string, ReleasePhase> = {
  Button: "beta",
  "Button group": "beta",
  Input: "beta",
  Select: "beta",
  Checkbox: "beta",
  Radio: "beta",
  Toggle: "beta",
  Slider: "beta",
  Badge: "beta",
  Tag: "beta",
  Alert: "beta",
  Modal: "beta",
  Toast: "beta",
  Tooltip: "beta",
  Tabs: "beta",
  "Dropdown menu": "beta",
  "Progress bar": "beta",
  Skeleton: "beta",
  Card: "beta",
  "Page header": "beta",
};

export function releasePhaseForStoryId(storyId: string): ReleasePhase | null {
  // ids look like: components-forms-and-input-button--playground
  // or components-forms-and-input-button-examples--all-variants
  for (const [name, phase] of Object.entries(COMPONENT_RELEASE_PHASE)) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    if (storyId.includes(`-${slug}-`) || storyId.includes(`-${slug}--`) || storyId.endsWith(`-${slug}`)) {
      return phase;
    }
  }
  return null;
}

export function releasePhaseForItemName(name: string): ReleasePhase | null {
  return COMPONENT_RELEASE_PHASE[name] ?? null;
}
