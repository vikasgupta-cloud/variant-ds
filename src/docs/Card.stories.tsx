/**
 * Foundations / Card — border/subtle + shadow/sm across canvas, surface, and modal.
 * Light and dark shown side by side for outline/scrim judgment.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

function DemoCard({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <article className="w-full max-w-sm rounded-md border border-border-subtle bg-bg-surface p-16 text-text-primary shadow-sm">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-4 text-sm text-text-secondary">{children}</p>
      <p className="mt-8 font-mono text-xs text-text-tertiary">{note}</p>
    </article>
  );
}

function ModeColumn({
  mode,
  children,
}: {
  mode: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <div
      data-mode={mode}
      data-context="canvas"
      className="flex min-h-full flex-col gap-32 bg-bg-canvas p-24 text-text-primary"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
        {mode}
      </p>
      {children}
    </div>
  );
}

function CardContexts({ mode }: { mode: "light" | "dark" }) {
  return (
    <>
      <section className="flex flex-col gap-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          On canvas
        </h2>
        <DemoCard title="Campaign summary" note="border/subtle · shadow/sm · canvas">
          Outline is decorative trim (neutral-200 / 700). Fill contrast and{" "}
          <code>shadow/sm</code> carry the boundary.
        </DemoCard>
        <div className="max-w-sm border-t border-border-subtle pt-8">
          <p className="text-xs text-text-tertiary">
            Hairline uses the same <code>border/subtle</code> token as the card
            outline.
          </p>
        </div>
      </section>

      <section data-context="surface" className="rounded-md bg-bg-surface p-24">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          On surface
        </h2>
        <DemoCard title="Audience segment" note="border/subtle · shadow/sm · surface">
          Nested <code>data-context=&quot;surface&quot;</code>. Same card chrome —
          subtle border + small shadow.
        </DemoCard>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Inside a modal
        </h2>
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-md p-32">
          <div
            aria-hidden
            className="absolute inset-0 bg-overlay-scrim"
            style={{ opacity: "var(--overlay-scrim-opacity)" }}
          />
          <div
            role="dialog"
            aria-labelledby={`modal-card-title-${mode}`}
            data-context="surface-raised"
            className="relative z-10 w-full max-w-md rounded-md border border-border-subtle bg-bg-surface-raised p-16 shadow-sm"
          >
            <h3
              id={`modal-card-title-${mode}`}
              className="text-sm font-semibold tracking-tight text-text-primary"
            >
              Confirm publish
            </h3>
            <p className="mt-4 text-sm text-text-secondary">
              Scrim uses mode-locked <code>overlay/scrim</code> +{" "}
              <code>overlay/scrim-opacity</code> (neutral-950 @ 64%). Card still
              uses <code>border/subtle</code> and <code>shadow/sm</code>.
            </p>
            <p className="mt-8 font-mono text-xs text-text-tertiary">
              overlay/scrim · border/subtle · shadow/sm · surface-raised
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function CardDemo() {
  return (
    <div className="grid min-h-screen w-full grid-cols-2">
      <ModeColumn mode="light">
        <header className="flex max-w-md flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Card</h1>
          <p className="text-sm text-text-secondary">
            <code className="text-text-primary">border/subtle</code> +{" "}
            <code className="text-text-primary">shadow/sm</code>. Scrim from the
            Overlay layer.
          </p>
        </header>
        <CardContexts mode="light" />
      </ModeColumn>
      <ModeColumn mode="dark">
        <header className="flex max-w-md flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Card</h1>
          <p className="text-sm text-text-secondary">
            Same tokens in dark — outline steps to neutral-700; scrim stays
            neutral-950 @ 64%.
          </p>
        </header>
        <CardContexts mode="dark" />
      </ModeColumn>
    </div>
  );
}

const meta = {
  title: "Foundations/Card",
  component: CardDemo,
  parameters: {
    layout: "fullscreen",
    // Story owns light+dark columns — ignore toolbar mode for this page.
  },
} satisfies Meta<typeof CardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AcrossContexts: Story = {};
