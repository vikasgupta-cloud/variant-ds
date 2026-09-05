# Checkbox

Binary or indeterminate multi-select control built on Radix Checkbox.

## When to use

- Multi-select lists
- Settings toggles that are not immediate on/off (prefer Toggle for that)
- Select-all with indeterminate

## Variant / state matrix

- **size:** sm | md | lg
- **state:** default | unchecked | checked | indeterminate | disabled | focused | error

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Indicator (check / dash)
3. Label
4. Description

## Tokens consumed

### role

- `bg/neutral/strong` → `--bg-neutral-strong`
- `bg/disabled` → `--bg-disabled`
- `text/on-inverse` → `--text-on-inverse`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/disabled` → `--text-disabled`
- `border/default` → `--border-default`
- `border/focus` → `--border-focus`
- `border/danger` → `--border-danger`

### surface

- `surface/field` → `--surface-field`

### structure

- `control/label-gap` → `--control-label-gap`
- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`

### component

- `checkbox/size` → `--checkbox-size`
- `checkbox/radius` → `--checkbox-radius`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | sm \| md \| lg | md | Box size. |
| `checked` | boolean \| 'indeterminate' | — | Controlled checked state. |
| `state` | design-review states | default | Design-review only. |

## Accessibility

- Radix provides checkbox role and keyboard support
- Label clicks toggle the control
- error sets aria-invalid

## Do

- Use indeterminate for partial selection

## Don't

- Don't use Checkbox for exclusive choices — use Radio
