# Alert

Inline status message. Optional actions are always ghost Dismiss + secondary primary-action, coloured by the Alert role (danger → destructive).

## When to use

- Inline feedback
- Non-blocking warnings
- Status callouts

## Variant / state matrix

- **role:** neutral | info | success | warning | danger
- **emphasis:** soft | strong
- **state:** default

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Title
3. Body
4. Actions (Dismiss + primary)

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
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/info` → `--text-info`
- `text/success` → `--text-success`
- `text/warning` → `--text-warning`
- `text/danger` → `--text-danger`
- `text/on-strong` → `--text-on-strong`
- `text/on-strong-warning` → `--text-on-strong-warning`
- `text/on-inverse` → `--text-on-inverse`
- `border/subtle` → `--border-subtle`
- `border/info` → `--border-info`
- `border/success` → `--border-success`
- `border/warning` → `--border-warning`
- `border/danger` → `--border-danger`

### structure

- `layout/stack` → `--layout-stack`
- `layout/stack-tight` → `--layout-stack-tight`

### component

- `alert/radius` → `--alert-radius`
- `alert/padding` → `--alert-padding`
- `alert/icon-gap` → `--alert-icon-gap`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `role` | neutral \| info \| success \| warning \| danger | — | Status colour. Neutral soft uses text/primary + text/secondary + border/subtle. |
| `emphasis` | soft \| strong | soft | Fill weight. |
| `actions` | { primaryLabel, onPrimary?, onDismiss? } | — | Standard action pair. |
| `dismissible` | boolean | false | Ghost Dismiss only. |

## Accessibility

- role=status for live updates
- Actions are real Buttons

## Do

- Inherit Alert role onto action Button colours
- Use soft for most inline alerts

## Don't

- Never put a primary default button inside a coloured alert
