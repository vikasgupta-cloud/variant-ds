# Slider

Single or range slider (Radix). Thumb uses Structure/component sizing; track uses surface/control.

## When to use

- Numeric ranges
- Opacity/volume style continuous input

## Variant / state matrix

- **mode:** single | range
- **state:** default | hover | dragging | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Track
3. Range
4. Thumb(s)
5. Optional label

## Tokens consumed

### role

- `bg/neutral/strong` → `--bg-neutral-strong`
- `bg/surface` → `--bg-surface`
- `border/strong` → `--border-strong`
- `border/focus` → `--border-focus`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`

### component

- `slider/thumb-size` → `--slider-thumb-size`
- `slider/thumb-border` → `--slider-thumb-border`
- `slider/track-bg` → `--slider-track-bg`

### structure

- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | number \| [number, number] | — | Single or range value. |
| `state` | default \| hover \| dragging \| disabled | default | Design-review only. |

## Accessibility

- slider role
- Arrow keys adjust value
- Thumbs are keyboard focusable

## Do

- Provide a text field nearby for precise entry when needed

## Don't

- Don't use Slider for binary on/off — use Toggle
