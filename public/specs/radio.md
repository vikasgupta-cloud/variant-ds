# Radio

Exclusive choice within a RadioGroup. Orientation horizontal or vertical.

## When to use

- Pick one option from a short list
- Form settings with mutually exclusive values

## Variant / state matrix

- **size:** sm | md | lg
- **orientation:** vertical | horizontal
- **state:** default | unselected | selected | disabled | focused

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. RadioGroup
2. RadioItem
3. Indicator dot
4. Label

## Tokens consumed

### role

- `bg/neutral/strong` → `--bg-neutral-strong`
- `text/primary` → `--text-primary`
- `text/disabled` → `--text-disabled`
- `border/default` → `--border-default`
- `border/focus` → `--border-focus`

### surface

- `surface/field` → `--surface-field`

### structure

- `control/label-gap` → `--control-label-gap`
- `control/content-gap` → `--control-content-gap`
- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`

### component

- `radio/size` → `--radio-size`
- `radio/dot-size` → `--radio-dot-size`
- `radio/radius` → `--radio-radius`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | vertical \| horizontal | vertical | Group layout. |
| `size` | sm \| md \| lg | md | Item size. |
| `value` | string | — | Selected value (group). |

## Accessibility

- Radiogroup + radio roles from Radix
- Arrow keys move selection within the group

## Do

- Provide a group legend/label in the surrounding form

## Don't

- Don't use a single Radio without a group
