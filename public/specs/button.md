# Button

Primary interactive control. Hierarchy and colour are independent axes with type-safe allowed pairs. Primary uses bg/neutral/strong — not brand yellow (yellow is for wayfinding/selection).

## When to use

- Trigger actions (submit, confirm, navigate)
- Use hierarchy to express emphasis; colour for semantic meaning (destructive, AI, status on secondary/ghost/link)
- Prefer link hierarchy for inline textual actions

## Variant / state matrix

- **hierarchy:** primary | secondary | tertiary | ghost | link
- **color:** default | destructive | warning | success | info | ai
- **size:** xs | sm | md | lg
- **icon:** none | leading | trailing | only
- **state:** default | hover | active | focused | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root (button)
2. Leading/trailing icon
3. Label
4. Loading spinner

## Tokens consumed

### role

- `bg/neutral/strong` → `--bg-neutral-strong`
- `bg/neutral/strong-hover` → `--bg-neutral-strong-hover`
- `bg/neutral/strong-active` → `--bg-neutral-strong-active`
- `bg/danger/strong` → `--bg-danger-strong`
- `bg/danger/strong-hover` → `--bg-danger-strong-hover`
- `bg/danger/strong-active` → `--bg-danger-strong-active`
- `bg/ai/strong` → `--bg-ai-strong`
- `bg/ai/strong-hover` → `--bg-ai-strong-hover`
- `bg/ai/strong-active` → `--bg-ai-strong-active`
- `bg/surface` → `--bg-surface`
- `bg/disabled` → `--bg-disabled`
- `bg/danger/soft` → `--bg-danger-soft`
- `bg/warning/soft` → `--bg-warning-soft`
- `bg/success/soft` → `--bg-success-soft`
- `bg/info/soft` → `--bg-info-soft`
- `bg/ai/soft` → `--bg-ai-soft`
- `text/primary` → `--text-primary`
- `text/on-inverse` → `--text-on-inverse`
- `text/on-strong` → `--text-on-strong`
- `text/disabled` → `--text-disabled`
- `text/link` → `--text-link`
- `text/link-hover` → `--text-link-hover`
- `text/danger` → `--text-danger`
- `text/danger-hover` → `--text-danger-hover`
- `text/warning` → `--text-warning`
- `text/warning-hover` → `--text-warning-hover`
- `text/success` → `--text-success`
- `text/success-hover` → `--text-success-hover`
- `text/info` → `--text-info`
- `text/info-hover` → `--text-info-hover`
- `text/ai` → `--text-ai`
- `text/ai-hover` → `--text-ai-hover`
- `border/focus` → `--border-focus`
- `border/danger` → `--border-danger`
- `border/warning` → `--border-warning`
- `border/success` → `--border-success`
- `border/info` → `--border-info`
- `border/ai` → `--border-ai`

### surface

- `surface/border` → `--surface-border`
- `surface/level-1` → `--surface-level-1`
- `surface/level-2` → `--surface-level-2`
- `surface/level-3` → `--surface-level-3`

### structure

- `control/padding-x` → `--control-padding-x`
- `control/padding-y` → `--control-padding-y`
- `control/gap` → `--control-gap`
- `control/icon-padding` → `--control-icon-padding`
- `control/radius` → `--control-radius`
- `icon/size` → `--icon-size`
- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `hierarchy` | primary \| secondary \| tertiary \| ghost \| link | primary | Visual weight / chrome style. |
| `color` | depends on hierarchy (type-safe) | default | Semantic colour. Primary only allows default | destructive | ai. |
| `size` | xs \| sm \| md \| lg | md | Control sizing from Structure. |
| `icon` | none \| leading \| trailing \| only | none | Icon placement axis. |
| `state` | default \| hover \| active \| focused \| disabled | default | Design-review only — not for production. |
| `loading` | boolean | false | Shows spinner and sets aria-busy. |

## Accessibility

- Native button semantics; fully keyboard operable
- Visible focus ring via focus-visible + border/focus
- loading sets aria-busy; disabled via disabled / aria-disabled
- icon-only requires aria-label
- Respects prefers-reduced-motion on transitions/spinner

## Do

- Use primary default for the main action on a view
- Pair Alert actions as ghost + secondary coloured by role
- Leave state at default in product code

## Don't

- Don't use primary + warning/success/info (blocked at the type level)
- Don't put a primary default button inside a coloured Alert
- Don't use brand yellow as a primary button fill
