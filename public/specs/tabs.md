# Tabs

Section switching with underline or button (segmented) variants.

## When to use

- In-page navigation between related views
- Settings panels

## Variant / state matrix

- **variant:** underline | button
- **size:** sm | md | lg
- **state:** default | active | disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Tabs
2. TabsList
3. TabsTrigger
4. TabsContent
5. Optional icon/badge

## Tokens consumed

### role

- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/disabled` → `--text-disabled`
- `border/subtle` → `--border-subtle`
- `border/focus` → `--border-focus`
- `selected/indicator` → `--selected-indicator`
- `bg/surface` → `--bg-surface`

### surface

- `surface/level-1` → `--surface-level-1`

### structure

- `focus/ring-width` → `--focus-ring-width`
- `focus/ring-offset` → `--focus-ring-offset`
- `icon/size` → `--icon-size`

### component

- `tab/item-spacing` → `--tab-item-spacing`
- `tab/content-gap` → `--tab-content-gap`
- `tab/indicator-weight` → `--tab-indicator-weight`
- `tab/container-radius` → `--tab-container-radius`
- `tab/container-padding` → `--tab-container-padding`
- `tab/radius` → `--tab-radius`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | underline \| button | underline | Visual style. |
| `size` | sm \| md \| lg | md | Trigger size. |

## Accessibility

- tablist / tab / tabpanel roles
- Arrow keys move between tabs

## Do

- Keep tab labels short
- Use Badge for counts, not as the only label

## Don't

- Don't nest interactive tabs inside each other
