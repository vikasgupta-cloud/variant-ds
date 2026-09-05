# Modal

Dialog with Overlay scrim and z/modal stacking. Panel is surface-raised so nested Cards resolve correctly.

## When to use

- Confirmations
- Focused forms
- Destructive confirms

## Variant / state matrix

- **size:** sm | md | lg
- **state:** default

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Trigger
2. Overlay (scrim)
3. Content panel
4. Title
5. Description
6. Body
7. Footer
8. Close

## Tokens consumed

### role

- `bg/surface-raised` → `--bg-surface-raised`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `border/subtle` → `--border-subtle`
- `border/focus` → `--border-focus`
- `icon/secondary` → `--icon-secondary`
- `icon/primary` → `--icon-primary`

### surface

- `surface/level-1` → `--surface-level-1`

### structure

- `shadow/sm` → `--shadow-sm`
- `layout/stack` → `--layout-stack`
- `layout/stack-tight` → `--layout-stack-tight`
- `z/modal` → `--z-modal`
- `focus/ring-width` → `--focus-ring-width`

### overlay

- `overlay/scrim` → `--overlay-scrim`
- `overlay/scrim-opacity` → `--overlay-scrim-opacity`

### component

- `modal/radius` → `--modal-radius`
- `modal/padding` → `--modal-padding`
- `modal/max-width-sm` → `--modal-max-width-sm`
- `modal/max-width` → `--modal-max-width`
- `modal/max-width-lg` → `--modal-max-width-lg`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | sm \| md \| lg | md | Max width token. |
| `title` | string | — | Dialog title (required). |
| `open` | boolean | — | Controlled open state. |
| `trigger` | ReactNode | — | Element that opens the dialog. |
| `footer` | ReactNode | — | Action row. |

## Accessibility

- dialog role from Radix
- Focus trapped while open
- Escape closes
- Title required for accessible name

## Do

- Put destructive confirms in the footer with primary destructive
- Nest Card inside for complex content

## Don't

- Don't skip the title
- Don't use Modal for non-blocking inline messages — use Alert
