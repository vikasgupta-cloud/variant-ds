# Input

Text field with label, helper, and error. Uses Surface field fills so the well stays correct in every context.

## When to use

- Single-line text entry
- Pair with Button in form rows
- Use errorMessage for validation copy (sets aria-invalid)

## Variant / state matrix

- **size:** sm | md | lg
- **state:** default | hover | focused | disabled | read-only | error

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Label
2. Field
3. Prefix/suffix icon
4. Clear control
5. Helper / error

## Tokens consumed

### role

- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/tertiary` → `--text-tertiary`
- `text/disabled` → `--text-disabled`
- `text/danger` → `--text-danger`
- `border/default` → `--border-default`
- `border/focus` → `--border-focus`
- `border/subtle` → `--border-subtle`
- `border/danger` → `--border-danger`
- `bg/disabled` → `--bg-disabled`
- `icon/secondary` → `--icon-secondary`
- `icon/tertiary` → `--icon-tertiary`
- `icon/primary` → `--icon-primary`

### surface

- `surface/field` → `--surface-field`
- `surface/field-hover` → `--surface-field-hover`
- `surface/level-1` → `--surface-level-1`

### structure

- `control/padding-x` → `--control-padding-x`
- `control/padding-y` → `--control-padding-y`
- `control/gap` → `--control-gap`
- `control/radius` → `--control-radius`
- `control/label-gap` → `--control-label-gap`
- `icon/size` → `--icon-size`
- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | sm \| md \| lg | md | Field size. |
| `label` | string | — | Visible label. |
| `helperText` | string | — | Supporting copy. |
| `errorMessage` | string | — | Validation message; marks invalid. |
| `state` | default \| hover \| focused \| disabled \| read-only \| error | default | Design-review only. |

## Accessibility

- Label associated via htmlFor / id
- Helper and error wired through aria-describedby
- error / aria-invalid expose invalid state
- Clear control has accessible name

## Do

- Always provide a visible label for persistent fields
- Prefer errorMessage over colour alone

## Don't

- Don't rely on placeholder as the only label
- Don't use state≠default in production
