# Badge

Compact status or metadata chip. Soft vs strong emphasis; optional dot, count, or icon.

## When to use

- Status labels
- Counts on tabs/nav
- Non-interactive metadata

## Variant / state matrix

- **role:** neutral | info | success | warning | danger | ai
- **emphasis:** soft | strong
- **size:** sm | md | lg
- **state:** default | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Optional dot
3. Optional icon
4. Label
5. Optional count

## Tokens consumed

### role

- `bg/neutral/soft` → `--bg-neutral-soft`
- `bg/neutral/strong` → `--bg-neutral-strong`
- `bg/info/soft` → `--bg-info-soft`
- `bg/info/strong` → `--bg-info-strong`
- `bg/success/soft` → `--bg-success-soft`
- `bg/success/strong` → `--bg-success-strong`
- `bg/warning/soft` → `--bg-warning-soft`
- `bg/warning/strong` → `--bg-warning-strong`
- `bg/danger/soft` → `--bg-danger-soft`
- `bg/danger/strong` → `--bg-danger-strong`
- `bg/ai/soft` → `--bg-ai-soft`
- `bg/ai/strong` → `--bg-ai-strong`
- `text/neutral` → `--text-neutral`
- `text/info` → `--text-info`
- `text/success` → `--text-success`
- `text/warning` → `--text-warning`
- `text/danger` → `--text-danger`
- `text/ai` → `--text-ai`
- `text/on-strong` → `--text-on-strong`
- `text/on-strong-warning` → `--text-on-strong-warning`
- `text/on-inverse` → `--text-on-inverse`
- `border/neutral` → `--border-neutral`
- `border/info` → `--border-info`
- `border/success` → `--border-success`
- `border/warning` → `--border-warning`
- `border/danger` → `--border-danger`
- `border/ai` → `--border-ai`

### structure

- `chip/padding-x` → `--chip-padding-x`
- `chip/padding-y` → `--chip-padding-y`
- `chip/gap` → `--chip-gap`

### component

- `badge/radius` → `--badge-radius`
- `badge/dot-size` → `--badge-dot-size`
- `badge/count-size` → `--badge-count-size`
- `badge/count-radius` → `--badge-count-radius`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `role` | neutral \| info \| success \| warning \| danger \| ai | neutral | Status colour. |
| `emphasis` | soft \| strong | soft | Fill weight. |
| `size` | sm \| md \| lg | md | Chip size. |
| `dot` | boolean | false | Leading status dot. |
| `count` | number \| string | — | Trailing count pill. |

## Accessibility

- Decorative dots are aria-hidden
- Prefer text content that names the status

## Do

- Use soft for inline metadata
- Use strong sparingly for high emphasis

## Don't

- Don't make badges the only affordance for a critical action
