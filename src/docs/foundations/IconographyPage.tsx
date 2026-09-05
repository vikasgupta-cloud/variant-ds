/**
 * Foundations / Iconography — full Phosphor regular-weight gallery.
 * Virtualised grid + search. Categories omitted (Phosphor React does not expose them).
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Icon, type IconSize } from "../../components/Icon";
import { Input } from "../../components/Input";
import { resolveCssVar, useFoundationsTick } from "./catalog";
import {
  phosphorImportSnippet,
  PHOSPHOR_CATALOG,
} from "./phosphorCatalog";
import {
  Callout,
  DocsPage,
  PageHeader,
  Prose,
  Section,
} from "../primitives";
import { cn } from "../../lib/cn";

const SIZES: IconSize[] = ["xs", "sm", "md", "lg", "xl"];
/** Row pitch ≈ icon/size/lg + label + cell padding (dimension scale). */
const ROW_HEIGHT = 104;
const MIN_COL_WIDTH = 112;
const GRID_GAP = 8;

export function IconographyPage() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { tick, root } = useFoundationsTick();

  const sizePx = useMemo(() => {
    const map = {} as Partial<Record<IconSize, string>>;
    for (const size of SIZES) {
      const raw = resolveCssVar(`--icon-size-${size}`, root);
      map[size] = raw ? raw.replace(/px$/i, "") : "—";
    }
    return map;
    // tick forces re-read when mode / overrides change
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [root, tick]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PHOSPHOR_CATALOG;
    return PHOSPHOR_CATALOG.filter((entry) =>
      entry.name.toLowerCase().includes(q),
    );
  }, [query]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(6);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      const next = Math.max(
        2,
        Math.floor((width + GRID_GAP) / (MIN_COL_WIDTH + GRID_GAP)),
      );
      setCols(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rowCount = Math.max(1, Math.ceil(filtered.length / cols));

  const virtualizer = useVirtualizer({
    count: filtered.length === 0 ? 0 : rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 6,
  });

  const copyImport = useCallback(async (name: string) => {
    const snippet = phosphorImportSnippet(name);
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(name);
      window.setTimeout(() => {
        setCopied((prev) => (prev === name ? null : prev));
      }, 1500);
    } catch {
      setCopied(null);
    }
  }, []);

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        description="Complete Phosphor set at regular weight. Product components use the curated Icon wrapper; this gallery is for discovery and import copy."
      />

      <Callout role="info" title="Regular weight only">
        <Prose>
          <span>
            Only the <strong>regular</strong> (line) weight is used — fill, bold,
            duotone, light, and thin are out of scope. Icons inherit{" "}
            <code>currentColor</code> from surrounding text or an icon role token.
            There is no colour prop.
          </span>
        </Prose>
      </Callout>

      <Section
        title="Size scale"
        description="icon/size/xs through xl — structure tokens. Name is the pixel value."
      >
        <div className="flex flex-wrap items-end gap-layout-section">
          {SIZES.map((size) => (
            <div
              key={size}
              className="flex flex-col items-center gap-8 text-icon-primary"
            >
              <Icon name="magnifying-glass" size={size} />
              <span className="font-mono type-numeric-sm text-text-secondary">
                {size}
              </span>
              <span className="font-mono type-numeric-sm text-text-secondary">
                {sizePx[size] ?? "—"}px · icon/size/{size}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="All icons"
        description={`${PHOSPHOR_CATALOG.length} glyphs · virtualised grid · click a cell to copy its import. Phosphor does not expose category metadata in @phosphor-icons/react, so this list is flat (search by name).`}
      >
        <div className="flex flex-wrap items-end gap-layout-section">
          <div className="max-w-sm flex-1">
            <Input
              type="icon-leading"
              label="Search"
              placeholder="e.g. Airplane, warning, caret…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              prefixIcon={<Icon name="magnifying-glass" />}
              clearable
              onClear={() => setQuery("")}
            />
          </div>
          <p className="type-body-sm text-text-secondary" aria-live="polite">
            {filtered.length === PHOSPHOR_CATALOG.length
              ? `${filtered.length} icons`
              : `${filtered.length} of ${PHOSPHOR_CATALOG.length}`}
            {copied ? (
              <span className="ml-12 text-text-success">Copied {copied}</span>
            ) : null}
          </p>
        </div>

        <div
          ref={scrollRef}
          className="mt-layout-stack h-[min(70vh,40rem)] overflow-auto rounded-control border border-border-subtle bg-bg-surface"
        >
          {filtered.length === 0 ? (
            <div className="p-layout-section">
              <Prose>
                <span>No icons match “{query}”.</span>
              </Prose>
            </div>
          ) : (
            <div
              className="relative w-full p-8"
              style={{ height: virtualizer.getTotalSize() }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const start = virtualRow.index * cols;
                const rowItems = filtered.slice(start, start + cols);
                const rowStyle: CSSProperties = {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gap: GRID_GAP,
                };
                return (
                  <div
                    key={virtualRow.key}
                    className="grid px-8"
                    style={rowStyle}
                  >
                    {rowItems.map((entry) => {
                      const Glyph = entry.Component;
                      const isCopied = copied === entry.name;
                      return (
                        <button
                          key={entry.name}
                          type="button"
                          onClick={() => void copyImport(entry.name)}
                          title={`Copy ${phosphorImportSnippet(entry.name)}`}
                          className={cn(
                            "flex flex-col items-center justify-center gap-8 rounded-control p-8",
                            "text-icon-primary",
                            "hover:bg-surface-level-1",
                            "focus-visible:outline focus-visible:outline-border-focus",
                            "focus-visible:outline-[length:var(--focus-ring-width)]",
                            "focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
                            isCopied && "bg-bg-success-soft text-text-success",
                          )}
                        >
                          <span className="inline-flex size-icon-size-lg shrink-0 items-center justify-center text-current">
                            <Glyph
                              weight="regular"
                              className="size-full"
                              aria-hidden
                            />
                          </span>
                          <span className="w-full truncate text-center font-mono type-numeric-sm text-text-secondary">
                            {entry.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      <Section
        title="System wrapper"
        description="App code should import the curated Icon set, not the full Phosphor package."
      >
        <Prose>
          <span>
            Use{" "}
            <code>{`import { Icon } from "@wingify/variant-ds/Icon"`}</code> with
            a system name (e.g. <code>magnifying-glass</code>). The gallery above
            copies package imports for icons that are not yet in the curated set.
          </span>
        </Prose>
        <div className="mt-layout-stack flex items-center gap-8 text-icon-primary">
          <span className="inline-flex size-icon-size-md shrink-0 text-current">
            <MagnifyingGlass
              weight="regular"
              className="size-full"
              aria-hidden
            />
          </span>
          <span className="type-body-sm text-text-secondary">
            Demo glyph also renders at regular weight via currentColor.
          </span>
        </div>
      </Section>
    </DocsPage>
  );
}
