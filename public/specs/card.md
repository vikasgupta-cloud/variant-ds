# Card

Surface container that sets data-context so nested cards resolve levels correctly. Default/interactive → surface; raised → surface-raised.

## When to use

- Grouping related content
- Nested panels
- Interactive selectable tiles (interactive variant)

## Variant / state matrix

- **variant:** default | raised | interactive
- **state:** default | hover | active | focused | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Optional header
3. Body
4. Optional footer

## Tokens consumed

### role

- `bg/surface` → `--bg-surface`
- `bg/surface-raised` → `--bg-surface-raised`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `border/subtle` → `--border-subtle`
- `border/focus` → `--border-focus`

### surface

- `surface/level-1` → `--surface-level-1`
- `surface/level-2` → `--surface-level-2`

### structure

- `shadow/sm` → `--shadow-sm`
- `layout/stack` → `--layout-stack`
- `layout/stack-tight` → `--layout-stack-tight`
- `focus/ring-width` → `--focus-ring-width`

### component

- `card/radius` → `--card-radius`
- `card/padding` → `--card-padding`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | default \| raised \| interactive | default | Elevation / interactivity. |
| `header` | ReactNode | — | Header slot. |
| `footer` | ReactNode | — | Footer slot. |
| `state` | design-review states | default | Design-review only (interactive). |

## Accessibility

- interactive cards need a clear accessible name and keyboard activation when used as buttons via asChild

## Do

- Nest default → raised to climb context
- Verify nested levels in light and dark

## Don't

- Don't hard-code context colours — let data-context resolve Surface tokens
