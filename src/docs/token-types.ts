/**
 * Types for the generated flat token catalog (src/styles/tokens/tokens.json).
 */
export type TokenLayer =
  | "primitive"
  | "role"
  | "surface"
  | "structure"
  | "overlay"
  | "component";

export type TypographyValue = {
  fontFamily: string;
  fontSize: string;
  fontWeight: number | string;
  lineHeight: string;
  letterSpacing: string;
};

export type CatalogToken = {
  name: string;
  path: string[];
  cssVar: string;
  layer: TokenLayer;
  type: string;
  description: string;
  value: string | number | TypographyValue | number[] | null;
  valueByMode: { light?: string | number; dark?: string | number } | null;
  valueByContext: Record<string, string | number> | null;
  alias: string | null;
};

export type TokenCatalog = {
  $schema: string;
  generated: boolean;
  tokens: CatalogToken[];
};
