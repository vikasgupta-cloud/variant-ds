/**
 * Foundations / Typography — specimens via docs primitives.
 */
import {
  isTypographyValue,
  tokensWhere,
  useFoundationsTick,
} from "./catalog";
import {
  Callout,
  DocsPage,
  PageHeader,
  Prose,
  Section,
  SpecimenRow,
} from "../primitives";

const SAMPLE = "The quick brown fox jumps over the lazy dog 0123456789";
const FAMILY_ORDER = ["display", "heading", "body", "numeric"] as const;

export function TypographyPage() {
  const { tick } = useFoundationsTick();
  void tick;

  const styles = tokensWhere(
    (t) => t.layer === "primitive" && t.type === "typography",
  ).sort((a, b) => {
    const fa = FAMILY_ORDER.indexOf(
      a.path[0] as (typeof FAMILY_ORDER)[number],
    );
    const fb = FAMILY_ORDER.indexOf(
      b.path[0] as (typeof FAMILY_ORDER)[number],
    );
    if (fa !== fb) return fa - fb;
    return a.name.localeCompare(b.name);
  });

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="Composite typography tokens from tokens.json (display/, heading/, body/, numeric/). Specimens use live CSS variables. Prefer type-* utilities in product UI."
      />

      <Callout role="info" title="Ergon fallback">
        <Prose>
          <span>
            <strong>Ergon</strong> is licensed and loaded from{" "}
            <code>/fonts/ergon-bold.woff2</code> when present. Display and large
            heading stacks fall back to <strong>DM Sans</strong> if Ergon is
            missing — the build does not fail without the file.
          </span>
        </Prose>
      </Callout>

      <Section title="Text styles">
        {styles.map((token) => {
          if (!isTypographyValue(token.value)) return null;
          const v = token.value;
          const label = token.path.join("/");
          return (
            <SpecimenRow
              key={token.name}
              label={label}
              meta={`${token.name} · ${v.fontSize}/${v.lineHeight} · ${v.fontWeight} · ${v.letterSpacing}`}
              sample={SAMPLE}
              sampleStyle={{
                fontFamily: `var(--${token.name}-font-family)`,
                fontSize: `var(--${token.name}-font-size)`,
                fontWeight: `var(--${token.name}-font-weight)` as unknown as number,
                lineHeight: `var(--${token.name}-line-height)`,
                letterSpacing: `var(--${token.name}-letter-spacing)`,
              }}
            />
          );
        })}
      </Section>
    </DocsPage>
  );
}
