/**
 * Full Phosphor regular-weight catalog for Foundations → Iconography.
 * Product UI still uses the curated Icon wrapper; this list is browse-only.
 */
import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon as PhosphorIconComponent } from "@phosphor-icons/react";

const EXCLUDE = new Set([
  "IconContext",
  "IconBase",
  "SSRBase",
  "default",
]);

export type PhosphorCatalogEntry = {
  /** PascalCase export name, e.g. MagnifyingGlass */
  name: string;
  Component: PhosphorIconComponent;
};

function isIconComponent(value: unknown): value is PhosphorIconComponent {
  return (
    typeof value === "object" &&
    value !== null &&
    "$$typeof" in (value as object)
  );
}

/** Unique icons — skips `*Icon` aliases and non-glyph exports. */
export const PHOSPHOR_CATALOG: PhosphorCatalogEntry[] = Object.entries(
  PhosphorIcons,
)
  .filter(([key, value]) => {
    if (EXCLUDE.has(key)) return false;
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(key)) return false;
    if (key.endsWith("Icon")) return false;
    return isIconComponent(value);
  })
  .map(([name, Component]) => ({
    name,
    Component: Component as PhosphorIconComponent,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function phosphorImportSnippet(name: string): string {
  return `import { ${name} } from "@phosphor-icons/react";`;
}
