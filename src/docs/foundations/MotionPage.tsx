/**
 * Foundations / Motion — duration/* and easing/* demos via docs primitives.
 */
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
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
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(false);
    setReplayKey((k) => k + 1);
    requestAnimationFrame(() => {
      setHoverDemo(true);
      window.setTimeout(() => setModalOpen(true), reduced ? 0 : 80);
    });
  }, [reduced]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHoverDemo(true));
    return () => cancelAnimationFrame(id);
  }, [replayKey]);

  const panelStyle: CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: reduced ? "0ms" : durationSlow,
    transitionTimingFunction: easing,
    opacity: modalOpen ? 1 : 0,
    transform: modalOpen
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
        title="Modal open"
        description="Open animation uses duration/slow. Replay closes and re-opens; the preview panel mirrors enter motion."
      >
        <Button hierarchy="secondary" onClick={() => setModalOpen(true)}>
          Open modal
        </Button>
        <div
          key={`panel-${replayKey}-${modalOpen}`}
          className="max-w-md rounded-modal border border-border-subtle bg-bg-surface-raised p-modal-padding shadow-md"
          style={panelStyle}
        >
          <span className="type-body-md-semibold text-text-primary">
            Preview panel
          </span>
          <span className="mt-8 block type-body-md text-text-secondary">
            Enter uses duration/slow ({durationSlow}) and easing/standard.
          </span>
        </div>
        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Motion demo"
          description="Dialog open. Motion tokens also drive the preview panel above."
        >
          <span className="type-body-md text-text-secondary">
            Dark mode still uses the same motion tokens — elevation changes with
            surfaces, not slower shadows.
          </span>
        </Modal>
      </Section>
    </DocsPage>
  );
}
