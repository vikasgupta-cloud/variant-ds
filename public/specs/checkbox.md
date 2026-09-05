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

1. CheckboxGroup
2. Root
3. Indicator (check / dash)
4. Label
5. Description

## Tokens consumed

### role

- `selected/bg` → `--selected-bg`
- `selected/edge` → `--selected-edge`
- `icon/on-selected` → `--icon-on-selected`
- `bg/disabled` → `--bg-disabled`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/disabled` → `--text-disabled`
- `border/default` → `--border-default`
- `border/strong` → `--border-strong`
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
| `orientation` | vertical \| horizontal | vertical | CheckboxGroup layout. |
| `state` | design-review states | default | Design-review only. |

## Accessibility

- Radix provides checkbox role and keyboard support
- Label clicks toggle the control
- error sets aria-invalid

## Do

- Use indeterminate for partial selection

## Don't

- Don't use Checkbox for exclusive choices — use Radio
