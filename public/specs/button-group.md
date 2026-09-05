# ButtonGroup

Segmented control for single or multi select. Selected items use yellow selected tokens (wayfinding), not primary button chrome.

## When to use

- View switchers
- Compact mutually exclusive or multi options

## Variant / state matrix

- **size:** sm | md | lg
- **type:** single | multiple
- **state:** default | hover | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Group root
2. Item(s)
3. Optional icon

## Tokens consumed

### role

- `selected/bg` → `--selected-bg`
- `selected/text` → `--selected-text`
- `text/primary` → `--text-primary`
- `border/subtle` → `--border-subtle`
- `bg/surface` → `--bg-surface`
- `border/focus` → `--border-focus`

### surface

- `surface/level-1` → `--surface-level-1`

### structure

- `control/padding-x` → `--control-padding-x`
- `control/padding-y` → `--control-padding-y`
- `control/gap` → `--control-gap`
- `icon/size` → `--icon-size`
- `focus/ring-width` → `--focus-ring-width`

### component

- `segment/radius-outer` → `--segment-radius-outer`
- `segment/radius-inner` → `--segment-radius-inner`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | single \| multiple | single | Selection mode. |
| `size` | sm \| md \| lg | md | Item size. |

## Accessibility

- toggle group / toggle roles from Radix
- Selected state exposed to AT

## Do

- Use selected yellow for the active segment

## Don't

- Don't style selected segments as primary black buttons
