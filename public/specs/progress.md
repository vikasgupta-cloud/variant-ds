# Progress

Determinate or indeterminate progress bar with role colour on the indicator.

## When to use

- Upload/download progress
- Step completion
- Indeterminate loading when duration is unknown

## Variant / state matrix

- **variant:** neutral | success | danger
- **mode:** determinate | indeterminate
- **state:** default

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Root
2. Track
3. Indicator
4. Optional label / value

## Tokens consumed

### role

- `bg/neutral/strong` → `--bg-neutral-strong`
- `bg/success/strong` → `--bg-success-strong`
- `bg/danger/strong` → `--bg-danger-strong`
- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`

### component

- `progress/track-height` → `--progress-track-height`
- `progress/radius` → `--progress-radius`
- `progress/label-gap` → `--progress-label-gap`
- `progress/track-bg` → `--progress-track-bg`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | neutral \| success \| danger | neutral | Indicator colour. |
| `value` | number \| null | — | 0–100; null = indeterminate. |
| `label` | string | — | Visible label. |
| `showValue` | boolean | false | Show numeric value. |

## Accessibility

- progressbar role
- aria-valuenow when determinate
- Indeterminate omits valuemin/max as appropriate

## Do

- Prefer determinate when you know progress
- Respect reduced motion on indeterminate

## Don't

- Don't use danger variant for ordinary loading
