# Cursor Task Sequence

Issue these **one at a time**. Wait for each to finish and verify before moving on.

## Setup (do this yourself, not in Cursor)

```bash
mkdir variant-ds && cd variant-ds && git init
mkdir -p docs .cursor/rules
```

1. Save the big spec as `docs/DESIGN-SYSTEM-SPEC.md` (everything below the `---` in `cursor-prompt-vwo-ds-library.md`).
2. Save the rules file as `.cursor/rules/design-system.mdc`.
3. Open the folder in Cursor.

The rules file loads on every message. The spec is read on demand. Neither needs pasting into chat.

---

## Task 1 — Scaffold

> Read `docs/DESIGN-SYSTEM-SPEC.md` sections 1 and 2.
>
> Set up the project skeleton: pnpm, TypeScript strict, Vite, React 19, Storybook 10, Tailwind v4 via `@tailwindcss/vite`, Style Dictionary v4, Radix, cva. Create the folder structure from section 6 of the spec.
>
> Don't create any tokens or components yet. Just get `pnpm dev` opening an empty Storybook.

**Verify:** Storybook opens. Tailwind v4 is active with no `tailwind.config.js`.

---

## Task 2 — Token pipeline

> Read section 1 of the spec. Build the Style Dictionary pipeline: create `tokens/*.json` for all six layers with the exact values from the spec, and a config that outputs CSS custom properties.
>
> `outputReferences: true` is mandatory. After building, show me the generated `role.css` so I can confirm it contains `var()` references rather than flattened hex.
>
> Add build-time validation: fail on a missing description, a broken reference, or a duplicate token path across layers.

**Verify this yourself before continuing.** Open the generated CSS. If you see `--bg-neutral-strong: #1b1913` instead of `var(--neutral-950)`, stop — nothing downstream will work.

---

## Task 3 — Theme wiring

> Wire the generated tokens into Tailwind v4 with `@theme inline` in `src/styles/theme.css`. Purge Tailwind's default colour and spacing scales.
>
> Set up mode switching via `[data-mode="light|dark"]` and context switching via `[data-context="canvas|surface|surface-raised"]`, both as selector-level overrides.
>
> Add the three Storybook global toolbar controls from section 4: Mode, Context, and Side-by-side.

**Verify:** toggling Mode in the toolbar changes an empty story's background. This is the fiddliest step — expect a pass or two of debugging.

---

## Task 4 — Token browser and live editor

> Read sections 5 and 8 of the spec. Build the token browser docs page and the runtime token editor panel.
>
> The browser reads the compiled token JSON at runtime — no hand-maintained tables. Colour tokens show live-computed WCAG contrast against the background they're used on, recalculated when the mode changes.
>
> The editor panel applies overrides as inline custom properties on the story root, persists to localStorage per mode, and exports tokens.json / diff.json / overrides.css.

**Verify:** edit `--neutral-950` in the panel. Nothing else exists yet, but the contrast table should update. Also check the contrast numbers now — fixing a wrong role value here costs seconds.

---

## Task 5 — Button and Input

> Read section 3. Build Button and Input with every variant and state listed, using Radix where applicable and cva for variant maps.
>
> Both must own ZERO component tokens — only Role and Structure. If either needs a component token, stop and tell me which layer has the gap.
>
> Include an "All variants" story per component showing the full grid.

**This is the checkpoint.** If Button and Input can't be built from Role and Structure alone, the architecture has a problem worth finding now. Don't wave it through.

---

## Task 6 — Card, Alert, Modal

> Build Card, Alert and Modal per section 3. These exist to stress-test the Surface layer, so include stories with a card inside a card, and a modal containing a card.
>
> Modal uses the scrim tokens and `z/modal`.

**Verify:** nested cards render at distinct levels. Contexts resolve correctly at depth three.

---

## Task 7 — Remaining components

> Build the rest: Dropdown, Badge, Tag, Checkbox, Radio, Toggle, Tabs, ButtonGroup, Progress, Slider. Full variant and state matrix per section 3.

Split this if it gets unwieldy — three or four components per message is manageable.

---

## Task 8 — Docs and downloads

> Write the per-component MDX pages per section 5: overview, variant matrix, tokens consumed grouped by layer, props table, accessibility notes, do/don't examples.
>
> Add the `<DownloadSpec />` component producing Markdown and JSON per component, plus the full token set as CSS and JSON. Generate into `public/specs/` at build time.

---

## Task 9 — CI and deploy

> Add the GitHub Action from section 7: build tokens, run tests, build Storybook, deploy to Vercel on push to main. Include `vercel.json`.

Enable Vercel password protection before the first deploy. The file contains the unreleased rebrand.

---

## Task 10 — Audit

> Go through the acceptance criteria in section 9 of the spec and verify each one. Report which pass and which don't. Don't fix anything yet — just tell me the state.

---

## If a task goes sideways

Start a fresh Cursor chat rather than continuing a long one. The rules file reloads automatically and the spec is still on disk, so nothing is lost. Long chats degrade — restarting is cheap.
