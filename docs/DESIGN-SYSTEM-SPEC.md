
Build a hosted, documented React component library and design-system reference for VWO (Wingify). It has to serve designers and engineers equally: designers use it to verify the system looks right in every mode and state; engineers use it as the source of truth for what to build against.

## Stack — use exactly these

- **Storybook 10** (`npm create storybook@latest`) — React + Vite. ESM-only.
- **React 19** + **TypeScript**, strict mode.
- **Tailwind CSS v4** via `@tailwindcss/vite`. No `tailwind.config.js` — CSS-first config with `@theme`.
- **Radix UI primitives** — unstyled. All visual styling comes from our tokens; Radix supplies behaviour and accessibility only.
- **Style Dictionary v4** — tokens compile from JSON to CSS. Never hand-write a token name in CSS.
- **pnpm**.

Package name: `@wingify/variant-ds`. Repo: `variant-ds`.

---

## 1 · Token architecture

Six layers. References flow one way: Component → Structure → Surface → Role → Primitive. Add an ESLint rule or a build-time check that fails if a component file references a primitive directly.

**Critical rule:** every CSS custom property name is *generated* by Style Dictionary from the token path. Nobody types a variable name by hand. `color.neutral.950` becomes `--neutral-950`, `dimension.16` becomes `--dimension-16`. The name always matches the token path. This is non-negotiable — the previous system broke because CSS names drifted from token names.

### Source files

```
tokens/
  primitive.json     colours, dimensions, radius, border-width, opacity, motion
  role.light.json    the colour vocabulary, light mode
  role.dark.json     the colour vocabulary, dark mode
  surface.json       context levels, keyed by canvas / surface / surface-raised
  structure.json     control/*, chip/*, icon/size, focus, layout
  component.json     genuine per-component deviations only
```

### Layer 0 — Primitive

```
neutral   0 #ffffff · 50 #f6f3ed · 100 #e5e0d6 · 200 #dbd6cb · 300 #b2ada1
          400 #989388 · 500 #79756b · 600 #5f5c53 · 700 #4f4d44
          800 #3c3932 · 900 #2b2923 · 950 #1b1913

cherry    100 #ffe2dc · 200 #ffcabe · 300 #fb937d · 400 #f4603f · 500 #de2d02
          600 #b72200 · 700 #92230d · 800 #6f1c0a · 900 #4f150a

amber     100 #ffe4c8 · 200 #f5c896 · 300 #e7a04c · 400 #c78321 · 500 #a76700
          600 #8b5500 · 700 #6f4300 · 800 #563400 · 900 #3e2300

green     100 #caf2dd · 200 #a4e4c3 · 300 #07c787 · 400 #03a673 · 500 #00865b
          600 #006f4b · 700 #00583a · 800 #00442a · 900 #00301e

ocean     100 #dee9ff · 200 #c4d7ff · 300 #8badff · 400 #6389f9 · 500 #406bed
          600 #2f54cb · 700 #2846a0 · 800 #1d3578 · 900 #152656

berry     100 #ffe0f4 · 200 #ffc6ea · 300 #f87fd8 · 400 #e155bd · 500 #cb37a4
          600 #a72686 · 700 #84266c · 800 #661e53 · 900 #48163a

yellow    tint #f1f9c7 · accent #eeff6d · accent-hover #e5f669
          deep #727b00 · field-shade #333718
```

Dimension — **the name is the value**:
```
0 2 4 6 8 10 12 14 16 20 24 28 32 40 48 64 80 96 128
```

```
radius        none 0 · xs 2 · sm 4 · md 8 · lg 16 · full 999
border-width  1 · 1.5 · 2 · 3
opacity       8 16 40 64 80
duration      fast 120ms · normal 200ms · slow 320ms
easing        standard cubic-bezier(.2,0,.2,1)
```

### Layer 1 — Role (light / dark)

```
                              LIGHT          DARK
bg/canvas                     neutral-50     neutral-950
bg/surface                    neutral-0      neutral-900
bg/surface-raised             neutral-0      neutral-800
bg/disabled                   neutral-100    neutral-800
bg/tooltip                    neutral-950    neutral-700

text/primary                  neutral-950    neutral-50
text/secondary                neutral-600    neutral-300
text/tertiary                 neutral-500    neutral-400
text/disabled                 neutral-400    neutral-500
text/on-inverse               neutral-50     neutral-950
text/link                     ocean-600      ocean-300
text/link-hover               ocean-700      ocean-200
text/on-strong                neutral-0      neutral-0
text/on-strong-warning        neutral-950    neutral-950

icon/primary                  neutral-950    neutral-50
icon/secondary                neutral-600    neutral-300
icon/tertiary                 neutral-500    neutral-400
icon/disabled                 neutral-400    neutral-500
icon/on-inverse               neutral-0      neutral-950

border/subtle                 neutral-200    neutral-700
border/default                neutral-500    neutral-500
border/strong                 neutral-600    neutral-300
border/focus                  neutral-950    neutral-50
```

Status roles — `neutral`, `info`, `success`, `warning`, `danger`, `ai`:

```
bg/{role}/strong          600 → 500
bg/{role}/strong-hover    700 → 600     neutral, danger, ai ONLY
bg/{role}/strong-active   800 → 700     neutral, danger, ai ONLY
bg/{role}/soft            100 → 900
text/{role}               700 → 300     used for text AND icons
text/{role}-hover         800 → 200     danger, warning, success, info, ai, neutral
                                        Hover state for status-coloured text and link buttons
border/{role}             200 → 700
```

Family mapping: neutral→neutral, info→ocean, success→green, warning→amber, danger→cherry, ai→berry.

Two exceptions, both deliberate:
- `bg/warning/strong` is **amber-300 in both modes**, paired with `text/on-strong-warning` (neutral-950). White on amber failed contrast.
- `bg/neutral/strong` is neutral-950 → neutral-50 (a full inversion, not the 600/500 pattern).

Success, info and warning get **no** hover or active variants. They aren't interactive. Do not add them.

Status icons get **no** tokens of their own. They bind `text/{role}` and `text/on-strong`.

Selected role (yellow):
```
selected/bg            yellow-accent        both modes
selected/bg-hover      yellow-accent-hover  both modes
selected/text          neutral-950          both modes
selected/edge          neutral-950 → yellow-accent
selected/indicator     yellow-deep → yellow-accent
selected/field-hover   yellow-tint → yellow-field-shade
```

### Layer 2 — Surface (context)

Three contexts: `canvas`, `surface`, `surface-raised`. Applied via a `data-context` attribute; nested elements inherit from the nearest ancestor that sets it.

```
                    canvas              surface             surface-raised
LIGHT
surface/level-1     neutral-100         neutral-50          neutral-100
surface/level-2     neutral-200         neutral-100         neutral-200
surface/level-3     neutral-300         neutral-200         neutral-300
surface/border      neutral-500         neutral-400         neutral-400

DARK
surface/level-1     neutral-900         neutral-800         neutral-700
surface/level-2     neutral-800         neutral-700         neutral-600
surface/level-3     neutral-700         neutral-600         neutral-500
surface/border      neutral-400         neutral-500         neutral-500
```

State→level mapping is documentation, not tokens: hover → level-1, active/selected/disabled → level-2, selected-hover → level-3.

### Layer 3 — Structure (shared sizing)

Two families, because buttons and badges have genuinely different padding ranges.

```
control/padding-x      xs 6   sm 8   md 12  lg 16
control/padding-y      xs 4   sm 6   md 10  lg 12
control/gap            xs 2   sm 4   md 6   lg 8
control/icon-padding   xs 6   sm 8   md 10  lg 14
control/radius         → radius.xs
control/label-gap      → dimension.8
control/content-gap    → dimension.8

chip/padding-x         sm 6   md 8   lg 12
chip/padding-y         sm 1   md 3   lg 4
chip/gap               sm 2   md 4   lg 6

icon/size              xs 12  sm 14  md 16  lg 20  xl 24
focus/ring-width       → border-width.2
focus/ring-offset      → dimension.2

layout/card            → dimension.16
layout/section         → dimension.32
layout/stack-tight     → dimension.4
layout/stack           → dimension.8
layout/stack-loose     → dimension.16
```

### Layer 4 — Component

Only genuine deviations:
```
dropdown/  menu-radius(sm) menu-padding-y(4) item-padding-x(12) item-padding-y(6)
badge/     radius(full) dot-size/{sm 6, md 8} count-size/{sm 16, md 18, lg 22} count-radius(xs)
tag/       radius(xs)
checkbox/  size/{sm 16, md 20, lg 24} radius(xs)
radio/     size/{sm 16, md 20, lg 24} dot-size/{sm 8, md 10, lg 12} radius(full)
toggle/    track-width/{sm 28, md 36, lg 44} track-height/{sm 16, md 20, lg 24}
           knob-size/{sm 12, md 16, lg 20} track-padding(2) radius(full)
           track-off-bg(neutral-300 → neutral-500)
           track-off-bg-hover(neutral-400 → neutral-400)
           knob-bg(neutral-0 → neutral-900)
tab/       item-spacing(4) content-gap/{sm 4, md 6, lg 8} indicator-weight(2)
           container-radius(sm) container-padding(4) radius(xs)
segment/   radius-outer(sm) radius-inner(none)
progress/  track-height(8) radius(full) label-gap(8)
slider/    thumb-size(20) thumb-border(→ border/strong)
modal/     radius(md) padding(24) max-width(560)
           scrim-bg(neutral-950) scrim-opacity(→ opacity.64)
card/      radius(md) padding(→ layout/card)
alert/     radius(sm) padding(12) icon-gap(12)
```

### Typography

```
display/2xl   Ergon Bold      60/68  -2%
display/xl    Ergon Bold      48/56  -2%
display/lg    Ergon Bold      36/44  -2%
heading/xl    Ergon Bold      30/40  -1%
heading/lg    Ergon Bold      24/32  -1%
heading/md    DM Sans Bold    20/28  -1%
heading/sm    DM Sans SemiBold 18/24  0      ← was 18/28, corrected
body/lg       DM Sans Regular 16/24  0
body/md       DM Sans Regular 14/20  0
body/sm       DM Sans Regular 12/18  0
numeric/lg    DM Mono Medium  20/28  0      ← tracking removed
numeric/md    DM Mono Regular 14/20  0
numeric/sm    DM Mono Regular 12/16  0
```

Plus weight variants: `body/lg-medium`, `body/lg-semibold`, `body/md-medium`, `body/md-semibold`, `body/sm-medium`, `body/sm-semibold`. Full symmetry — no gaps.

DM Sans and DM Mono from Google Fonts. **Ergon is licensed** — set up `@font-face` pointing at `public/fonts/ergon-bold.woff2` and fall back to DM Sans if absent. Don't fail the build when it's missing.

---

## 2 · Tailwind v4 setup

`src/styles/theme.css`:

```css
@import "tailwindcss";

/* generated by Style Dictionary — do not edit */
@import "./tokens/primitive.css";
@import "./tokens/role.css";
@import "./tokens/surface.css";
@import "./tokens/structure.css";
@import "./tokens/component.css";

/* map tokens onto Tailwind utilities */
@theme inline {
  --color-bg-canvas: var(--bg-canvas);
  --color-bg-surface: var(--bg-surface);
  --color-text-primary: var(--text-primary);
  /* …every role token */
  --spacing-*: initial;   /* drop Tailwind's default scale entirely */
  --spacing-2: var(--dimension-2);
  /* …every dimension step */
}
```

Mode switching is selector-level, no rebuild:
```css
[data-mode="light"] { /* role tokens, light */ }
[data-mode="dark"]  { /* role tokens, dark */ }
[data-context="canvas"] { /* surface tokens */ }
```

Purge Tailwind's default colour and spacing scales with `--color-*: initial` and `--spacing-*: initial`. If a developer can write `bg-blue-500`, someone will.

---

## 3 · Components

Fifteen. Each is a real, accessible, production-quality React component — not a demo.

**The twelve specced:** Button, Input, Dropdown (Select + Menu), Badge, Tag, Checkbox, Radio, Toggle, Tabs, Border (docs page only, not a component), ButtonGroup, Progress + Slider.

**Three added to stress-test the Surface layer:** Card, Alert, Modal. These are the only components that exercise nesting and the scrim — Modal especially, because it's where a missed context mode would show up.

### Variant and state matrix

Every component must expose every combination as a Storybook story. Include an "All variants" story per component showing the full grid at once.

```
Button      hierarchy: primary | secondary | tertiary | ghost | link
            color:    (allowed pairs only — invalid combinations are a TypeScript error)
                        primary    default | destructive | ai
                        secondary  default | destructive | warning | success | info | ai
                        tertiary   default | destructive
                        ghost      default | destructive | warning | success | info | ai
                        link       default | destructive | warning | success | info | ai
            size:    xs | sm | md | lg
            icon:    none | leading | trailing | only
            state:   default | hover | active | focused | disabled   ← design-review only
            plus:    loading, fullWidth, iconNode

Input       size:    sm | md | lg
            state:   default | hover | focused | disabled | read-only | error   ← design-review only
            plus:    label, helper text, error message, prefix/suffix icon, clearable

Dropdown    Select and Menu variants
            state:   closed | open | item-hover | item-selected | item-disabled
            plus:    grouped items, item descriptions, multi-select

Badge       role:    neutral | info | success | warning | danger | ai
            emphasis: soft | strong
            size:    sm | md | lg
            plus:    dot, count, icon

Tag         size:    sm | md | lg
            state:   rest | hover | disabled
            plus:    removable, with icon

Checkbox    size:    sm | md | lg
            state:   unchecked | checked | indeterminate | disabled | focus | error

Radio       size:    sm | md | lg
            state:   unselected | selected | disabled | focus
            plus:    RadioGroup with orientation

Toggle      size:    sm | md | lg
            state:   off | on | disabled | focus
            plus:    label position, description text

Tabs        variant: underline | button
            size:    sm | md | lg
            state:   default | active | disabled
            plus:    with icons, with badge counts, overflow

ButtonGroup size:    sm | md | lg
            plus:    2–5 items, single and multi select, icon-only

Progress    variant: neutral | success | danger
            plus:    determinate, indeterminate, with label, with value

Slider      state:   rest | hover | dragging | disabled
            plus:    single and range

Card        variant: default | raised | interactive
            plus:    with header, footer, nested card

Alert       role:    info | success | warning | danger | ai
            emphasis: soft | strong
            plus:    with title, with action, dismissible
            actions: optional pair — ghost “Dismiss” + secondary primary-action,
                     both inherit the Alert role as Button color (danger → destructive).
                     Never a primary default button inside a coloured alert.

Modal       size:    sm | md | lg
            plus:    with footer actions, scrolling body, nested content, destructive confirm
```

**`state` prop (design-review affordance):** Button, Input, and every subsequent component expose a `state` prop that mirrors Figma’s State dropdown. The default value is `default`, which uses real CSS `:hover` / `:active` / `:focus-visible` — normal runtime behaviour. Any other value forces that state’s styling by applying the same classes the pseudo-selector would, so designers can pick “hover” in Storybook without hovering. **Not for production use** — real applications leave `state` at `default` and let CSS handle interaction.

Use `cva` (class-variance-authority) for variant maps. **The variant map is where design decisions live** — e.g. primary buttons using `bg/neutral/strong` rather than brand yellow. There is deliberately no intent-token layer; the component carries the decision and the docs explain the reasoning.

---

## 4 · Storybook configuration

### Global toolbar controls

Three, all in `.storybook/preview.tsx` as globals with a decorator:

1. **Mode** — Light / Dark → sets `data-mode` on the story root
2. **Context** — Canvas / Surface / Surface-raised → sets `data-context`
3. **Side by side** — renders the story twice, light and dark, in one frame

Context is requirement 2 — a designer needs to see whether a component changes on different backgrounds without leaving the story.

### Addons

`@storybook/addon-docs` (autodocs), `@storybook/addon-a11y`, `@storybook/addon-vitest`.

Turn a11y violations into **build failures**, not warnings. The system we're replacing shipped a text token at 2.07:1 contrast in dark mode for months.

---

## 5 · Documentation pages (MDX)

### Token browser — `Foundations/Tokens`

Reads the compiled `tokens.json` at runtime and renders tables automatically. It must never be hand-maintained.

For each token: name, layer, resolved value in the current mode, what it aliases, a swatch, and **a written description of when to use it**. The description is a required field in the JSON — Style Dictionary should fail the build if any token lacks one.

Colour tokens additionally show a **live-computed WCAG contrast ratio** against the background they're actually used on, with pass/tight/fail badges, recomputed when the mode toggle changes. Reuse the logic from the demo HTML.

### Per-component pages

Each gets: overview and when to use it, the full variant/state matrix, an anatomy diagram, a **complete list of every token the component consumes grouped by layer**, props table (autodocs), accessibility notes, and do/don't examples.

### Download

A `<DownloadSpec />` component on every page producing:
- **Markdown** — the full component spec, human-readable
- **JSON** — tokens consumed, props, variants, machine-readable

Plus, on the Foundations page, the whole token set as CSS, JSON, and a Figma-variables-import-shaped JSON.

Generate these at build time into `public/specs/` so downloads are instant and diffable in git.

---

## 6 · Repo structure

```
variant-ds/
  tokens/                    source JSON
  build/style-dictionary.config.js
  src/
    styles/theme.css
    styles/tokens/           GENERATED — gitignored
    components/<Name>/
      <Name>.tsx
      <Name>.variants.ts     cva map
      <Name>.stories.tsx
      <Name>.mdx
      index.ts
    docs/
      TokenBrowser.tsx
      DownloadSpec.tsx
      ContrastBadge.tsx
  .storybook/
  scripts/generate-specs.ts
```

Scripts: `tokens:build`, `dev`, `build`, `test`, `lint`.
`tokens:build` runs before `dev` and `build`. Generated CSS is gitignored — the JSON is the source of truth.

---

## 7 · Hosting

Static build (`storybook build`) deployed to Vercel. Include `vercel.json` and a GitHub Action that builds tokens, runs tests, builds Storybook, and deploys on push to `main`.

This file contains an unreleased rebrand. Enable Vercel password protection on the project before the first deploy. Do not deploy it publicly.

---

## 8 · Live token editing

Anyone using the hosted Storybook must be able to change a token value and see every component update instantly — no rebuild, no reload. This is the main way we validate the system: a designer asks "what if `border/default` were neutral/600?" and answers it in ten seconds across every component at once.

### The one thing that must be right

Style Dictionary must be configured with **`outputReferences: true`**.

Without it, Style Dictionary flattens every alias to a literal value:
```css
--bg-neutral-strong: #1b1913;   /* WRONG — reference lost */
```
With it, the reference chain survives into CSS:
```css
--bg-neutral-strong: var(--neutral-950);   /* correct */
```

This is the difference between a working feature and a broken one. With references preserved, editing `--neutral-950` cascades automatically to every role token that aliases it, and to every component using those roles. Without it, nothing cascades and each token has to be edited individually.

Verify this before building the editor: change `--neutral-950` in devtools and confirm the primary button, body text, and progress fill all move together.

### Runtime editor (hosted — the important one)

A Storybook addon panel, registered in `.storybook/manager.tsx`, available on every story.

**Layout:** tokens grouped by layer (Primitive / Role / Surface / Structure / Component), collapsible, with a search filter. Colour tokens get a swatch and a colour picker plus a hex field. Dimension tokens get a number input.

**Applying edits:** write the override as an inline custom property on the story root element (`element.style.setProperty('--neutral-950', value)`). Do not regenerate CSS, do not touch the stylesheet. The cascade does the rest.

**Editing a reference:** for tokens that alias another token, offer both — pick a different token to alias, or enter a raw value. Show the current alias chain (`bg/neutral/strong → neutral/950 → #1b1913`) so it's clear what's being changed and at which layer.

**Persistence:** localStorage, keyed separately per mode, so edits survive navigating between stories. Storybook's channel API syncs the panel to the preview iframe.

**Modified state:** any edited token shows a dot and its original value alongside the new one. A counter in the panel header shows how many tokens are modified. Per-token reset and a global "reset all".

**Live contrast:** every edit re-runs the contrast checks. If an edit takes a pair below its threshold, show an inline warning naming the pair and the new ratio — for example, editing `border/default` to neutral/400 should immediately warn that it now fails 3:1 on canvas. Warn; don't block. The point is to make consequences visible.

**Export:** three outputs from the current edited state —
- `tokens.json` — the full set with edits merged, ready to replace the source file
- `diff.json` — only what changed, with before and after
- `overrides.css` — the raw custom properties, for pasting into devtools or a branch

Make the diff view the default. When someone hands this to an engineer, "these four tokens changed" is more useful than a 300-line file.

### Source editing (local dev)

`pnpm dev` runs Style Dictionary in watch mode alongside Storybook. Editing `tokens/*.json` regenerates the CSS and hot-reloads. No restart.

Validate on watch: fail loudly on a broken reference, a missing description, or a duplicate token path across layers, and print the offending path.

### Not in scope

No writing back to `tokens/*.json` from the hosted UI, and no server. The hosted editor is a sandbox — you explore in the browser, export a diff, and commit it deliberately. A design system that can be silently mutated from a web page is a design system with no history.

---

## 9 · Acceptance criteria

Do not consider this done until all of these hold:

1. No hardcoded colour or dimension anywhere in a component file. Add a lint rule that fails on hex codes and raw `px` outside `tokens/`.
2. Every component renders correctly in light and dark × all three contexts. Verify visually, don't assume.
3. Every CSS variable name is derivable from its token path. No exceptions.
4. `addon-a11y` passes on every story. Build fails otherwise.
5. Every token has a description. Build fails otherwise.
6. Token browser reads from generated JSON — zero hand-maintained token tables.
7. Downloads work on every component page.
8. Full keyboard operation on every interactive component, with visible focus rings.
9. `prefers-reduced-motion` respected.
10. The three deliberate exceptions are implemented as specified, not "corrected": amber warning with dark text, neutral's inverted strong, and no hover states on success/info/warning.
11. Style Dictionary emits `var()` references, not flattened values. Test: change `--neutral-950` in devtools and confirm the primary button, body text and progress fill all move together.
12. Editing any token in the runtime panel updates every component on screen with no reload, and survives navigating between stories.
13. Editing a token below its contrast threshold produces a visible warning naming the failing pair.
14. All three export formats work and round-trip: exported `tokens.json` replaces the source file and produces identical output.

---

## 10 · Build order

1. Token pipeline — JSON, Style Dictionary (`outputReferences: true`), generated CSS, Tailwind `@theme`. Verify variable names match token paths exactly, and verify the reference chain survives into the CSS output.
2. Storybook with the three global toolbar controls working.
3. Token browser with live contrast, and the runtime token editor panel. **Check the numbers before building components** — if a role token is wrong, better to find out now, and the editor makes fixing it a ten-second experiment rather than a rebuild.
4. Button and Input. These have zero component tokens, so they prove the Role and Structure layers work.
5. Card, Alert, Modal. These prove the Surface layer works.
6. Everything else.
7. Docs, downloads, spec generation.
8. CI and deployment.

Stop after step 4 and confirm before continuing. If Button and Input can't be built from Role and Structure tokens alone, the architecture has a problem worth finding early.
