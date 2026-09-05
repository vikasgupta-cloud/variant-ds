/**
 * Shared types for per-component documentation specs (Task 8 / spec §5).
 */
export type SpecLayer =
  | "primitive"
  | "role"
  | "surface"
  | "structure"
  | "overlay"
  | "component";

export type SpecProp = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export type ComponentSpec = {
  /** URL/file slug, e.g. "button" */
  id: string;
  /** Display name, e.g. "Button" */
  name: string;
  /** Storybook title path, e.g. "Components/Button" */
  storyTitle: string;
  overview: string;
  whenToUse: string[];
  /** Axis → allowed values */
  variants: Record<string, string[]>;
  anatomy: string[];
  /** Layer → token CSS paths (e.g. "bg/neutral/strong") */
  tokens: Partial<Record<SpecLayer, string[]>>;
  props: SpecProp[];
  accessibility: string[];
  do: string[];
  dont: string[];
};
