# Role token contrast report

Generated with `src/docs/contrast-pairing.ts` (same rules as the Token Browser), measured on **canvas** context unless a token has a dedicated fill pair.

### Pairing rules

- `text-on-strong` → `bg-info-strong` (chromatic strong; not canvas / warning / neutral-strong)
- `text-on-strong-warning` → `bg-warning-strong`
- `text-on-inverse` / `icon-on-inverse` → `bg-neutral-strong` (invert fill)
- `bg-neutral-strong` (+ hover/active) → `text-on-inverse` — neutral inverts, so it does **not** use `text-on-strong`
- `border-{role}` → `bg-{role}-soft` (banner chrome, not canvas)
- `border-subtle` → decorative trim; verdict **exempt** (fill + shadow/sm carry the card boundary)
- `border-neutral` → decorative hairlines at **1.5:1**
- `text-disabled` / `icon-disabled` / `text-tertiary` / `icon-tertiary` → measured on canvas, verdict **exempt** with reason

Generated: 2026-09-04

## light

| Token | Resolved value | Background | Ratio | Required | Pass/fail | Notes |
| --- | --- | --- | ---: | ---: | --- | --- |
| `bg-ai-soft` | `#ffe0f4` ({berry.100}) | fg `text-ai` (#84266c) on this token | 6.96:1 | 4.5:1 | pass | — |
| `bg-ai-strong` | `#a72686` ({berry.600}) | fg `text-on-strong` (#ffffff) on this token | 6.43:1 | 4.5:1 | pass | — |
| `bg-ai-strong-active` | `#661e53` ({berry.800}) | fg `text-on-strong` (#ffffff) on this token | 11.20:1 | 4.5:1 | pass | — |
| `bg-ai-strong-hover` | `#84266c` ({berry.700}) | fg `text-on-strong` (#ffffff) on this token | 8.49:1 | 4.5:1 | pass | — |
| `bg-canvas` | `#f6f3ed` ({neutral.50}) | fg `text-primary` (#1b1913) on this token | 15.87:1 | 4.5:1 | pass | — |
| `bg-danger-soft` | `#ffe2dc` ({cherry.100}) | fg `text-danger` (#92230d) on this token | 6.95:1 | 4.5:1 | pass | — |
| `bg-danger-strong` | `#b72200` ({cherry.600}) | fg `text-on-strong` (#ffffff) on this token | 6.48:1 | 4.5:1 | pass | — |
| `bg-danger-strong-active` | `#6f1c0a` ({cherry.800}) | fg `text-on-strong` (#ffffff) on this token | 11.37:1 | 4.5:1 | pass | — |
| `bg-danger-strong-hover` | `#92230d` ({cherry.700}) | fg `text-on-strong` (#ffffff) on this token | 8.51:1 | 4.5:1 | pass | — |
| `bg-disabled` | `#e5e0d6` ({neutral.100}) | fg `text-primary` (#1b1913) on this token | 13.36:1 | 4.5:1 | pass | — |
| `bg-info-soft` | `#dee9ff` ({ocean.100}) | fg `text-info` (#2846a0) on this token | 6.95:1 | 4.5:1 | pass | — |
| `bg-info-strong` | `#2f54cb` ({ocean.600}) | fg `text-on-strong` (#ffffff) on this token | 6.46:1 | 4.5:1 | pass | — |
| `bg-neutral-soft` | `#e5e0d6` ({neutral.100}) | fg `text-primary` (#1b1913) on this token | 13.36:1 | 4.5:1 | pass | — |
| `bg-neutral-strong` | `#1b1913` ({neutral.950}) | fg `text-on-inverse` (#f6f3ed) on this token | 15.87:1 | 4.5:1 | pass | Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong. |
| `bg-neutral-strong-active` | `#4f4d44` ({neutral.700}) | fg `text-on-inverse` (#f6f3ed) on this token | 7.65:1 | 4.5:1 | pass | Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong. |
| `bg-neutral-strong-hover` | `#3c3932` ({neutral.800}) | fg `text-on-inverse` (#f6f3ed) on this token | 10.40:1 | 4.5:1 | pass | Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong. |
| `bg-success-soft` | `#caf2dd` ({green.100}) | fg `text-success` (#00583a) on this token | 7.02:1 | 4.5:1 | pass | — |
| `bg-success-strong` | `#006f4b` ({green.600}) | fg `text-on-strong` (#ffffff) on this token | 6.22:1 | 4.5:1 | pass | — |
| `bg-surface` | `#ffffff` ({neutral.0}) | fg `text-primary` (#1b1913) on this token | 17.57:1 | 4.5:1 | pass | — |
| `bg-surface-raised` | `#ffffff` ({neutral.0}) | fg `text-primary` (#1b1913) on this token | 17.57:1 | 4.5:1 | pass | — |
| `bg-tooltip` | `#1b1913` ({neutral.950}) | fg `text-on-strong` (#ffffff) on this token | 17.57:1 | 4.5:1 | pass | — |
| `bg-warning-soft` | `#ffe4c8` ({amber.100}) | fg `text-warning` (#6f4300) on this token | 6.93:1 | 4.5:1 | pass | — |
| `bg-warning-strong` | `#e7a04c` ({amber.300}) | fg `text-on-strong-warning` (#1b1913) on this token | 7.97:1 | 4.5:1 | pass | — |
| `border-ai` | `#ffc6ea` ({berry.200}) | `bg-ai-soft` (#ffe0f4) | 1.19:1 | 3:1 | fail | State border on bg/ai/soft (banner / callout), not canvas. |
| `border-danger` | `#ffcabe` ({cherry.200}) | `bg-danger-soft` (#ffe2dc) | 1.19:1 | 3:1 | fail | State border on bg/danger/soft (banner / callout), not canvas. |
| `border-default` | `#79756b` ({neutral.500}) | `bg-canvas` (#f6f3ed) | 4.15:1 | 3:1 | pass | — |
| `border-focus` | `#1b1913` ({neutral.950}) | `bg-canvas` (#f6f3ed) | 15.87:1 | 3:1 | pass | — |
| `border-info` | `#c4d7ff` ({ocean.200}) | `bg-info-soft` (#dee9ff) | 1.19:1 | 3:1 | fail | State border on bg/info/soft (banner / callout), not canvas. |
| `border-neutral` | `#dbd6cb` ({neutral.200}) | `bg-canvas` (#f6f3ed) | 1.31:1 | 1.5:1 | fail | Decorative hairline (border/neutral) — not state-conveying chrome; threshold 1.5:1 instead of 3:1. |
| `border-strong` | `#5f5c53` ({neutral.600}) | `bg-canvas` (#f6f3ed) | 6.03:1 | 3:1 | pass | — |
| `border-subtle` | `#dbd6cb` ({neutral.200}) | `bg-canvas` (#f6f3ed) | 1.31:1 | 3:1 | exempt | Decorative trim. The card's fill contrast and shadow carry the container boundary; the outline is not load-bearing. |
| `border-success` | `#a4e4c3` ({green.200}) | `bg-success-soft` (#caf2dd) | 1.19:1 | 3:1 | fail | State border on bg/success/soft (banner / callout), not canvas. |
| `border-warning` | `#f5c896` ({amber.200}) | `bg-warning-soft` (#ffe4c8) | 1.26:1 | 3:1 | fail | State border on bg/warning/soft (banner / callout), not canvas. |
| `icon-disabled` | `#989388` ({neutral.400}) | `bg-canvas` (#f6f3ed) | 2.76:1 | 4.5:1 | exempt | Disabled appearance — intentionally below body-text contrast so the control reads as inactive. |
| `icon-on-inverse` | `#ffffff` ({neutral.0}) | `bg-neutral-strong` (#1b1913) | 17.57:1 | 4.5:1 | pass | On inverted neutral-strong (and similar inverse fills); not canvas. Neutral strong inverts, so this is the matching ink. |
| `icon-primary` | `#1b1913` ({neutral.950}) | `bg-canvas` (#f6f3ed) | 15.87:1 | 4.5:1 | pass | — |
| `icon-secondary` | `#5f5c53` ({neutral.600}) | `bg-canvas` (#f6f3ed) | 6.03:1 | 4.5:1 | pass | — |
| `icon-tertiary` | `#79756b` ({neutral.500}) | `bg-canvas` (#f6f3ed) | 4.15:1 | 4.5:1 | exempt | Tertiary hierarchy — quieter than secondary by design; not held to 4.5:1 body-text. |
| `selected-bg` | `#eeff6d` ({yellow.accent}) | — | — | — | n/a | No browser pairing |
| `selected-bg-hover` | `#e5f669` ({yellow.accent-hover}) | — | — | — | n/a | No browser pairing |
| `selected-edge` | `#1b1913` ({neutral.950}) | — | — | — | n/a | No browser pairing |
| `selected-field-hover` | `#f1f9c7` ({yellow.tint}) | — | — | — | n/a | No browser pairing |
| `selected-indicator` | `#727b00` ({yellow.deep}) | — | — | — | n/a | No browser pairing |
| `selected-text` | `#1b1913` ({neutral.950}) | — | — | — | n/a | No browser pairing |
| `text-ai` | `#84266c` ({berry.700}) | `bg-canvas` (#f6f3ed) | 7.66:1 | 4.5:1 | pass | — |
| `text-danger` | `#92230d` ({cherry.700}) | `bg-canvas` (#f6f3ed) | 7.68:1 | 4.5:1 | pass | — |
| `text-disabled` | `#989388` ({neutral.400}) | `bg-canvas` (#f6f3ed) | 2.76:1 | 4.5:1 | exempt | Disabled appearance — intentionally below body-text contrast so the control reads as inactive. |
| `text-info` | `#2846a0` ({ocean.700}) | `bg-canvas` (#f6f3ed) | 7.66:1 | 4.5:1 | pass | — |
| `text-link` | `#2f54cb` ({ocean.600}) | `bg-canvas` (#f6f3ed) | 5.83:1 | 4.5:1 | pass | — |
| `text-link-hover` | `#2846a0` ({ocean.700}) | `bg-canvas` (#f6f3ed) | 7.66:1 | 4.5:1 | pass | — |
| `text-neutral` | `#4f4d44` ({neutral.700}) | `bg-canvas` (#f6f3ed) | 7.65:1 | 4.5:1 | pass | — |
| `text-on-inverse` | `#f6f3ed` ({neutral.50}) | `bg-neutral-strong` (#1b1913) | 15.87:1 | 4.5:1 | pass | On inverted neutral-strong (and similar inverse fills); not canvas. Neutral strong inverts, so this is the matching ink. |
| `text-on-strong` | `#ffffff` ({neutral.0}) | `bg-info-strong` (#2f54cb) | 6.46:1 | 4.5:1 | pass | On chromatic strong fills (info/success/danger/ai); not canvas, not warning, not neutral-strong. |
| `text-on-strong-warning` | `#1b1913` ({neutral.950}) | `bg-warning-strong` (#e7a04c) | 7.97:1 | 4.5:1 | pass | — |
| `text-primary` | `#1b1913` ({neutral.950}) | `bg-canvas` (#f6f3ed) | 15.87:1 | 4.5:1 | pass | — |
| `text-secondary` | `#5f5c53` ({neutral.600}) | `bg-canvas` (#f6f3ed) | 6.03:1 | 4.5:1 | pass | — |
| `text-success` | `#00583a` ({green.700}) | `bg-canvas` (#f6f3ed) | 7.72:1 | 4.5:1 | pass | — |
| `text-tertiary` | `#79756b` ({neutral.500}) | `bg-canvas` (#f6f3ed) | 4.15:1 | 4.5:1 | exempt | Tertiary hierarchy — quieter than secondary by design; not held to 4.5:1 body-text. |
| `text-warning` | `#6f4300` ({amber.700}) | `bg-canvas` (#f6f3ed) | 7.65:1 | 4.5:1 | pass | — |

## dark

| Token | Resolved value | Background | Ratio | Required | Pass/fail | Notes |
| --- | --- | --- | ---: | ---: | --- | --- |
| `bg-ai-soft` | `#48163a` ({berry.900}) | fg `text-ai` (#f87fd8) on this token | 6.21:1 | 4.5:1 | pass | — |
| `bg-ai-strong` | `#cb37a4` ({berry.500}) | fg `text-on-strong` (#ffffff) on this token | 4.54:1 | 4.5:1 | pass | — |
| `bg-ai-strong-active` | `#84266c` ({berry.700}) | fg `text-on-strong` (#ffffff) on this token | 8.49:1 | 4.5:1 | pass | — |
| `bg-ai-strong-hover` | `#a72686` ({berry.600}) | fg `text-on-strong` (#ffffff) on this token | 6.43:1 | 4.5:1 | pass | — |
| `bg-canvas` | `#1b1913` ({neutral.950}) | fg `text-primary` (#f6f3ed) on this token | 15.87:1 | 4.5:1 | pass | — |
| `bg-danger-soft` | `#4f150a` ({cherry.900}) | fg `text-danger` (#fb937d) on this token | 6.63:1 | 4.5:1 | pass | — |
| `bg-danger-strong` | `#de2d02` ({cherry.500}) | fg `text-on-strong` (#ffffff) on this token | 4.69:1 | 4.5:1 | pass | — |
| `bg-danger-strong-active` | `#92230d` ({cherry.700}) | fg `text-on-strong` (#ffffff) on this token | 8.51:1 | 4.5:1 | pass | — |
| `bg-danger-strong-hover` | `#b72200` ({cherry.600}) | fg `text-on-strong` (#ffffff) on this token | 6.48:1 | 4.5:1 | pass | — |
| `bg-disabled` | `#3c3932` ({neutral.800}) | fg `text-primary` (#f6f3ed) on this token | 10.40:1 | 4.5:1 | pass | — |
| `bg-info-soft` | `#152656` ({ocean.900}) | fg `text-info` (#8badff) on this token | 6.59:1 | 4.5:1 | pass | — |
| `bg-info-strong` | `#406bed` ({ocean.500}) | fg `text-on-strong` (#ffffff) on this token | 4.62:1 | 4.5:1 | pass | — |
| `bg-neutral-soft` | `#3c3932` ({neutral.800}) | fg `text-primary` (#f6f3ed) on this token | 10.40:1 | 4.5:1 | pass | — |
| `bg-neutral-strong` | `#f6f3ed` ({neutral.50}) | fg `text-on-inverse` (#1b1913) on this token | 15.87:1 | 4.5:1 | pass | Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong. |
| `bg-neutral-strong-active` | `#b2ada1` ({neutral.300}) | fg `text-on-inverse` (#1b1913) on this token | 7.85:1 | 4.5:1 | pass | Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong. |
| `bg-neutral-strong-hover` | `#dbd6cb` ({neutral.200}) | fg `text-on-inverse` (#1b1913) on this token | 12.13:1 | 4.5:1 | pass | Neutral strong inverts (near-black ↔ near-white) instead of the chromatic strong pattern, so it pairs with text/on-inverse — not text/on-strong. |
| `bg-success-soft` | `#00301e` ({green.900}) | fg `text-success` (#07c787) on this token | 6.61:1 | 4.5:1 | pass | — |
| `bg-success-strong` | `#00865b` ({green.500}) | fg `text-on-strong` (#ffffff) on this token | 4.60:1 | 4.5:1 | pass | — |
| `bg-surface` | `#2b2923` ({neutral.900}) | fg `text-primary` (#f6f3ed) on this token | 13.13:1 | 4.5:1 | pass | — |
| `bg-surface-raised` | `#3c3932` ({neutral.800}) | fg `text-primary` (#f6f3ed) on this token | 10.40:1 | 4.5:1 | pass | — |
| `bg-tooltip` | `#4f4d44` ({neutral.700}) | fg `text-on-strong` (#ffffff) on this token | 8.48:1 | 4.5:1 | pass | — |
| `bg-warning-soft` | `#3e2300` ({amber.900}) | fg `text-warning` (#e7a04c) on this token | 6.59:1 | 4.5:1 | pass | — |
| `bg-warning-strong` | `#e7a04c` ({amber.300}) | fg `text-on-strong-warning` (#1b1913) on this token | 7.97:1 | 4.5:1 | pass | — |
| `border-ai` | `#84266c` ({berry.700}) | `bg-ai-soft` (#48163a) | 1.71:1 | 3:1 | fail | State border on bg/ai/soft (banner / callout), not canvas. |
| `border-danger` | `#92230d` ({cherry.700}) | `bg-danger-soft` (#4f150a) | 1.71:1 | 3:1 | fail | State border on bg/danger/soft (banner / callout), not canvas. |
| `border-default` | `#79756b` ({neutral.500}) | `bg-canvas` (#1b1913) | 3.82:1 | 3:1 | pass | — |
| `border-focus` | `#f6f3ed` ({neutral.50}) | `bg-canvas` (#1b1913) | 15.87:1 | 3:1 | pass | — |
| `border-info` | `#2846a0` ({ocean.700}) | `bg-info-soft` (#152656) | 1.71:1 | 3:1 | fail | State border on bg/info/soft (banner / callout), not canvas. |
| `border-neutral` | `#4f4d44` ({neutral.700}) | `bg-canvas` (#1b1913) | 2.07:1 | 1.5:1 | pass | Decorative hairline (border/neutral) — not state-conveying chrome; threshold 1.5:1 instead of 3:1. |
| `border-strong` | `#b2ada1` ({neutral.300}) | `bg-canvas` (#1b1913) | 7.85:1 | 3:1 | pass | — |
| `border-subtle` | `#4f4d44` ({neutral.700}) | `bg-canvas` (#1b1913) | 2.07:1 | 3:1 | exempt | Decorative trim. The card's fill contrast and shadow carry the container boundary; the outline is not load-bearing. |
| `border-success` | `#00583a` ({green.700}) | `bg-success-soft` (#00301e) | 1.70:1 | 3:1 | fail | State border on bg/success/soft (banner / callout), not canvas. |
| `border-warning` | `#6f4300` ({amber.700}) | `bg-warning-soft` (#3e2300) | 1.72:1 | 3:1 | fail | State border on bg/warning/soft (banner / callout), not canvas. |
| `icon-disabled` | `#79756b` ({neutral.500}) | `bg-canvas` (#1b1913) | 3.82:1 | 4.5:1 | exempt | Disabled appearance — intentionally below body-text contrast so the control reads as inactive. |
| `icon-on-inverse` | `#1b1913` ({neutral.950}) | `bg-neutral-strong` (#f6f3ed) | 15.87:1 | 4.5:1 | pass | On inverted neutral-strong (and similar inverse fills); not canvas. Neutral strong inverts, so this is the matching ink. |
| `icon-primary` | `#f6f3ed` ({neutral.50}) | `bg-canvas` (#1b1913) | 15.87:1 | 4.5:1 | pass | — |
| `icon-secondary` | `#b2ada1` ({neutral.300}) | `bg-canvas` (#1b1913) | 7.85:1 | 4.5:1 | pass | — |
| `icon-tertiary` | `#989388` ({neutral.400}) | `bg-canvas` (#1b1913) | 5.74:1 | 4.5:1 | exempt | Tertiary hierarchy — quieter than secondary by design; not held to 4.5:1 body-text. |
| `selected-bg` | `#eeff6d` ({yellow.accent}) | — | — | — | n/a | No browser pairing |
| `selected-bg-hover` | `#e5f669` ({yellow.accent-hover}) | — | — | — | n/a | No browser pairing |
| `selected-edge` | `#eeff6d` ({yellow.accent}) | — | — | — | n/a | No browser pairing |
| `selected-field-hover` | `#333718` ({yellow.field-shade}) | — | — | — | n/a | No browser pairing |
| `selected-indicator` | `#eeff6d` ({yellow.accent}) | — | — | — | n/a | No browser pairing |
| `selected-text` | `#1b1913` ({neutral.950}) | — | — | — | n/a | No browser pairing |
| `text-ai` | `#f87fd8` ({berry.300}) | `bg-canvas` (#1b1913) | 7.55:1 | 4.5:1 | pass | — |
| `text-danger` | `#fb937d` ({cherry.300}) | `bg-canvas` (#1b1913) | 8.01:1 | 4.5:1 | pass | — |
| `text-disabled` | `#79756b` ({neutral.500}) | `bg-canvas` (#1b1913) | 3.82:1 | 4.5:1 | exempt | Disabled appearance — intentionally below body-text contrast so the control reads as inactive. |
| `text-info` | `#8badff` ({ocean.300}) | `bg-canvas` (#1b1913) | 7.97:1 | 4.5:1 | pass | — |
| `text-link` | `#8badff` ({ocean.300}) | `bg-canvas` (#1b1913) | 7.97:1 | 4.5:1 | pass | — |
| `text-link-hover` | `#c4d7ff` ({ocean.200}) | `bg-canvas` (#1b1913) | 12.14:1 | 4.5:1 | pass | — |
| `text-neutral` | `#b2ada1` ({neutral.300}) | `bg-canvas` (#1b1913) | 7.85:1 | 4.5:1 | pass | — |
| `text-on-inverse` | `#1b1913` ({neutral.950}) | `bg-neutral-strong` (#f6f3ed) | 15.87:1 | 4.5:1 | pass | On inverted neutral-strong (and similar inverse fills); not canvas. Neutral strong inverts, so this is the matching ink. |
| `text-on-strong` | `#ffffff` ({neutral.0}) | `bg-info-strong` (#406bed) | 4.62:1 | 4.5:1 | pass | On chromatic strong fills (info/success/danger/ai); not canvas, not warning, not neutral-strong. |
| `text-on-strong-warning` | `#1b1913` ({neutral.950}) | `bg-warning-strong` (#e7a04c) | 7.97:1 | 4.5:1 | pass | — |
| `text-primary` | `#f6f3ed` ({neutral.50}) | `bg-canvas` (#1b1913) | 15.87:1 | 4.5:1 | pass | — |
| `text-secondary` | `#b2ada1` ({neutral.300}) | `bg-canvas` (#1b1913) | 7.85:1 | 4.5:1 | pass | — |
| `text-success` | `#07c787` ({green.300}) | `bg-canvas` (#1b1913) | 7.97:1 | 4.5:1 | pass | — |
| `text-tertiary` | `#989388` ({neutral.400}) | `bg-canvas` (#1b1913) | 5.74:1 | 4.5:1 | exempt | Tertiary hierarchy — quieter than secondary by design; not held to 4.5:1 body-text. |
| `text-warning` | `#e7a04c` ({amber.300}) | `bg-canvas` (#1b1913) | 7.97:1 | 4.5:1 | pass | — |

## Summary

| Result | Count |
| --- | ---: |
| pass | 85 |
| fail | 11 |
| exempt | 10 |
| n/a | 12 |
| total rows | 118 |
