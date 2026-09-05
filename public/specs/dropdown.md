# Dropdown

Select (form value) and Menu (actions) built on Radix. Menus/select content use surface-raised + dropdown component tokens.

## When to use

- Select for choosing a value in a form
- Menu for action lists, including multi checkbox items

## Variant / state matrix

- **kind:** select | menu
- **state:** default | closed | open | item-hover | item-selected | item-disabled

> `state` is a design-review affordance — leave at `default` in production.

## Anatomy

1. Trigger
2. Content / viewport
3. Item
4. Separator / group / label

## Tokens consumed

### role

- `text/primary` → `--text-primary`
- `text/secondary` → `--text-secondary`
- `text/disabled` → `--text-disabled`
- `border/default` → `--border-default`
- `border/subtle` → `--border-subtle`
- `border/focus` → `--border-focus`
- `bg/surface-raised` → `--bg-surface-raised`
- `selected/field-hover` → `--selected-field-hover`

### surface

- `surface/field` → `--surface-field`
- `surface/level-1` → `--surface-level-1`
- `surface/level-2` → `--surface-level-2`

### structure

- `control/radius` → `--control-radius`
- `control/padding-x` → `--control-padding-x`
- `control/padding-y` → `--control-padding-y`
- `shadow/sm` → `--shadow-sm`
- `focus/ring-width` → `--focus-ring-width`

### component

- `dropdown/menu-radius` → `--dropdown-menu-radius`
- `dropdown/menu-padding-y` → `--dropdown-menu-padding-y`
- `dropdown/item-padding-x` → `--dropdown-item-padding-x`
- `dropdown/item-padding-y` → `--dropdown-item-padding-y`

### overlay

- `overlay/scrim` → `--overlay-scrim`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `Select.value` | string | — | Controlled select value. |
| `state` | design-review states | default | Design-review only. |

## Accessibility

- Combobox/listbox patterns from Radix Select
- Menu uses menu/menuitem roles
- Typeahead supported by Radix

## Do

- Use Select for values; Menu for commands
- Group long lists

## Don't

- Don't put destructive navigation behind an unlabeled icon-only trigger
