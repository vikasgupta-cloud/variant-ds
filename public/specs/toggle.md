# Toggle

Immediate on/off switch (Radix Switch). Prefer over Checkbox when the change applies instantly.

## When to use

- Settings that apply immediately
- Feature flags in UI

## Variant / state matrix

- **size:** sm | md | lg
- **state:** default | off | on | disabled | focused
- **labelPosition:** start | end

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root (switch)
2. Thumb
3. Label
4. Description

## Tokens consumed

### role

- `selected/bg` → `--selected-bg`
- `selected/bg-hover` → `--selected-bg-hover`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/disabled` → `--text-disabled`
- `border/focus` → `--border-focus`

### surface

- `surface/control` → `--surface-control`
- `surface/control-hover` → `--surface-control-hover`

### structure

- `control/label-gap` → `--control-label-gap`
- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`

### component

- `toggle/track-width` → `--toggle-track-width`
- `toggle/track-height` → `--toggle-track-height`
- `toggle/knob-size` → `--toggle-knob-size`
- `toggle/track-padding` → `--toggle-track-padding`
- `toggle/radius` → `--toggle-radius`
- `toggle/knob-bg-off` → `--toggle-knob-bg-off`
- `toggle/knob-bg-on` → `--toggle-knob-bg-on`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | sm \| md \| lg | md | Switch size. |
| `labelPosition` | start \| end | end | Label placement. |
| `state` | default \| off \| on \| disabled \| focused | default | Design-review only. |

## Accessibility

- switch role from Radix
- Space toggles
- Label is associated

## Do

- Use for immediate binary settings

## Don't

- Don't use for multi-select — use Checkbox
