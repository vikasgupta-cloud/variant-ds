# Tooltip

Short contextual label on hover/focus. Uses bg/tooltip with text/on-inverse.

## When to use

- Help icons beside labels
- Icon-only control names
- Brief clarifying copy

## Variant / state matrix

- **side:** top | right | bottom | left

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Trigger
2. Content

## Tokens consumed

### role

- `bg/tooltip` → `--bg-tooltip`
- `text/on-inverse` → `--text-on-inverse`

### structure

- `control/padding-x` → `--control-padding-x`
- `control/padding-y` → `--control-padding-y`
- `control/radius` → `--control-radius`
- `shadow/sm` → `--shadow-sm`
- `z/modal` → `--z-modal`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | ReactNode | — | Tooltip body. |
| `side` | top \| right \| bottom \| left | top | Placement. |
| `delayDuration` | number | 200 | Open delay in ms. |

## Accessibility

- Opens on focus as well as hover
- Trigger must be focusable
- Prefer concise copy

## Do

- Use for supplemental help, not required instructions

## Don't

- Don't put interactive controls inside the tooltip
