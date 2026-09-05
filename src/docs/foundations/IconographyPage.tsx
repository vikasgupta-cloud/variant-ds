/**
 * Foundations / Iconography — searchable grid via docs primitives + Icon.
 */
import { useMemo, useState } from "react";
import {
  ICON_PHOSPHOR_NAME,
  Icon,
  SYSTEM_ICONS,
  type IconName,
  type IconSize,
} from "../../components/Icon";
import { Input } from "../../components/Input";
import { Card } from "../../components/Card";
import { resolveCssVar, useFoundationsTick } from "./catalog";
import {
  Callout,
  CodeBlock,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../primitives";

const SIZES: IconSize[] = ["xs", "sm", "md", "lg", "xl"];

export function IconographyPage() {
  const [query, setQuery] = useState("");
  const { tick, root } = useFoundationsTick();
  void tick;

  const sizePx = useMemo(() => {
    const map = {} as Partial<Record<IconSize, string>>;
    for (const size of SIZES) {
      const raw = resolveCssVar(`--icon-size-${size}`, root);
      map[size] = raw ? raw.replace(/px$/i, "") : "—";
    }
    return map;
  }, [root, tick]);

  const names = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (Object.keys(SYSTEM_ICONS) as IconName[]).filter((name) => {
      if (!q) return true;
      const phosphor = ICON_PHOSPHOR_NAME[name].toLowerCase();
      return name.includes(q) || phosphor.includes(q);
    });
  }, [query]);

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        description="Line icons only — Phosphor regular weight, sized with icon/size/*. Import from the Icon wrapper, never from @phosphor-icons/react."
      />

      <Callout role="info" title="Regular weight only">
        <Prose>
          <span>
            Only <strong>regular</strong> (stroke) weight is used. Fill / bold /
            duotone / thin are out of scope. Colour inherits{" "}
            <code>currentColor</code> from the surrounding text or icon role
            token.
          </span>
        </Prose>
      </Callout>

      <Section
        title="Size scale"
        description="icon/size from tokens.json. The name is the pixel value."
      >
        <div className="flex flex-wrap items-end gap-layout-section">
          {SIZES.map((size) => (
            <div
              key={size}
              className="flex flex-col items-center gap-8 text-icon-primary"
            >
              <Icon name="magnifying-glass" size={size} />
              <span className="font-mono type-numeric-sm text-text-tertiary">
                {size}
              </span>
              <span className="font-mono type-numeric-sm text-text-tertiary">
                {sizePx[size] ?? "—"}px · icon/size/{size}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="System icons"
        description="Curated set used across Variant. Search by system name or Phosphor export."
      >
        <div className="max-w-sm">
          <Input
            label="Search"
            placeholder="e.g. search, Warning, caret…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            prefixIcon={<Icon name="magnifying-glass" />}
            clearable
            onClear={() => setQuery("")}
          />
        </div>

        <div className="grid grid-cols-2 gap-layout-section sm:grid-cols-3 md:grid-cols-4">
          {names.map((name) => {
            const phosphor = ICON_PHOSPHOR_NAME[name];
            const snippet = `import { Icon } from "@wingify/variant-ds/Icon";\n\n<Icon name="${name}" size="md" />`;
            return (
              <Card
                key={name}
                header={
                  <div className="flex items-center gap-8 text-icon-primary">
                    <Icon name={name} size="lg" />
                    <div className="min-w-0">
                      <span className="block type-body-md-medium truncate text-text-primary">
                        {name}
                      </span>
                      <span className="block font-mono type-numeric-sm truncate text-text-tertiary">
                        {phosphor}
                      </span>
                    </div>
                  </div>
                }
              >
                <CodeBlock>{snippet}</CodeBlock>
              </Card>
            );
          })}
        </div>

        {names.length === 0 ? (
          <Prose>
            <span>No icons match “{query}”.</span>
          </Prose>
        ) : null}
      </Section>
    </DocsPage>
  );
}
