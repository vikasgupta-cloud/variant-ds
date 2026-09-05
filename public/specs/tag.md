# Tag

Filterable or removable chip for selected values and facets.

## When to use

- Selected filters
- Removable keywords
- Compact labeled values

## Variant / state matrix

- **size:** sm | md | lg
- **state:** default | hover | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Optional icon
3. Label
4. Optional remove control

## Tokens consumed

### role

- `text/primary` → `--text-primary`
- `text/disabled` → `--text-disabled`
- `border/subtle` → `--border-subtle`
- `icon/secondary` → `--icon-secondary`

### surface

- `surface/level-1` → `--surface-level-1`
- `surface/level-2` → `--surface-level-2`

### structure

- `chip/padding-x` → `--chip-padding-x`
- `chip/padding-y` → `--chip-padding-y`
- `chip/gap` → `--chip-gap`
- `icon/size` → `--icon-size`

### component

- `tag/radius` → `--tag-radius`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | sm \| md \| lg | md | Chip size. |
| `removable` | boolean | false | Shows remove Button. |
| `state` | default \| hover \| disabled | default | Design-review only. |

## Accessibility

- Remove control is a Button with accessible name
- Disabled tags are not focusable for remove

## Do

- Use removable for dismissible selections

## Don't

- Don't use Tag for status — use Badge
