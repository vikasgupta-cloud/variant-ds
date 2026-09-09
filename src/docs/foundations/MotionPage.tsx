/**
 * Foundations / Motion — duration/* and easing/* demos via docs primitives.
 * Panel enter demo uses Card chrome (Modal deferred).
 */
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Button } from "../../components/Button";
import {
  resolveCssVar,
  tokensWhere,
  useFoundationsTick,
} from "./catalog";
import {
  CodeBlock,
  DocsPage,
  DocsList,
  PageHeader,
  Section,
} from "../primitives";

export function MotionPage() {
  const { tick, root } = useFoundationsTick();
  void tick;
  const [replayKey, setReplayKey] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);
  const [hoverDemo, setHoverDemo] = useState(false);

  const durations = tokensWhere(
    (t) => t.layer === "primitive" && t.path[0] === "duration",
  ).sort((a, b) => a.name.localeCompare(b.name));

  const easings = tokensWhere(
    (t) => t.layer === "primitive" && t.path[0] === "easing",
  );

  const durationNormal =
    resolveCssVar("--duration-normal", root) ?? "200ms";
  const durationSlow = resolveCssVar("--duration-slow", root) ?? "320ms";
  const easing =
    resolveCssVar("--easing-standard", root) ?? "cubic-bezier(0.2, 0, 0.2, 1)";

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const replay = useCallback(() => {
    setHoverDemo(false);
    setPanelVisible(false);
    setReplayKey((k) => k + 1);
    requestAnimationFrame(() => {
      setHoverDemo(true);
      window.setTimeout(() => setPanelVisible(true), reduced ? 0 : 80);
    });
  }, [reduced]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHoverDemo(true);
      setPanelVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, [replayKey]);

  const panelStyle: CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: reduced ? "0ms" : durationSlow,
    transitionTimingFunction: easing,
    opacity: panelVisible ? 1 : 0,
    transform: panelVisible
      ? "translateY(0) scale(1)"
      : "translateY(var(--dimension-8)) scale(0.98)",
  };

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Motion"
        description="duration/* and easing/* from tokens.json. Demonstrations respect prefers-reduced-motion."
      />

      <Section title="Tokens">
        <DocsList
          items={[
            ...durations.map(
              (t) => `${t.name}: ${String(t.value)} — ${t.description}`,
            ),
            ...easings.map(
              (t) =>
                `${t.name}: ${
                  Array.isArray(t.value)
                    ? `cubic-bezier(${t.value.join(", ")})`
                    : String(t.value)
                } — ${t.description}`,
            ),
          ]}
        />
        <CodeBlock>
          {`--duration-normal: ${durationNormal}\n--duration-slow: ${durationSlow}\n--easing-standard: ${easing}`}
        </CodeBlock>
      </Section>

      <Section title="Button hover">
        <div className="flex flex-wrap items-center gap-8">
          <Button hierarchy="secondary" onClick={replay}>
            Replay demos
          </Button>
        </div>
        <div
          key={`hover-${replayKey}`}
          className="flex items-center gap-layout-section"
        >
          <button
            type="button"
            className="rounded-control border border-border-default bg-bg-surface px-control-padding-x-md py-control-padding-y-md type-body-md text-text-primary"
            style={{
              transitionProperty: "background-color, border-color, transform",
              transitionDuration: reduced ? "0ms" : durationNormal,
              transitionTimingFunction: easing,
              backgroundColor: hoverDemo
                ? "var(--bg-neutral-soft)"
                : "var(--bg-surface)",
              transform: hoverDemo
                ? "translateY(calc(-1 * var(--dimension-2)))"
                : "none",
            }}
            onMouseEnter={() => setHoverDemo(true)}
            onMouseLeave={() => setHoverDemo(false)}
          >
            Hover me
          </button>
          <Button
            onMouseEnter={() => setHoverDemo(true)}
            onMouseLeave={() => setHoverDemo(false)}
          >
            Real Button
          </Button>
        </div>
      </Section>

      <Section
        title="Panel enter"
        description="Enter animation uses duration/slow on a raised surface panel (Modal deferred)."
      >
        <div
          key={`panel-${replayKey}-${panelVisible}`}
          className="w-full max-w-measure-prose rounded-card border border-border-subtle bg-bg-surface-raised p-card-padding shadow-md"
          style={panelStyle}
        >
          <span className="type-body-md-semibold text-text-primary">
            Preview panel
          </span>
          <span className="mt-8 block type-body-md text-text-secondary">
            Enter uses duration/slow ({durationSlow}) and easing/standard.
          </span>
        </div>
      </Section>
    </DocsPage>
  );
}
