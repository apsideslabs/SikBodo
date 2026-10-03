# Accessibility

SikBodo is meant to be usable by learners regardless of how they read, navigate or
perceive the page. Accessibility is treated as a baseline requirement of the project, not
an enhancement: the commitments below are the standard the code is held to, and this
document explains how to preserve them when you change something.

The project targets **WCAG 2.1 Level AA** for the content it controls.

## Commitments

| Area | Commitment |
| --- | --- |
| Document structure | One `<h1>` per page; heading levels never skipped |
| Navigation | A skip link on every page; sidebar marks the current page |
| Focus | A visible focus ring on every interactive element |
| Display panel | Correct dialog semantics and toggle states |
| Colour | Body text meets 4.5:1 contrast in both themes |
| Text size | Body text is never smaller than 1rem |
| Motion | Animations respect `prefers-reduced-motion` |
| Keyboard | Every control is operable without a pointer; Esc closes the panel |
| Print | A dedicated print stylesheet produces clean, readable output |

## Document structure and headings

- **One `<h1>` per page.** The page owns it; renderers and content fragments must not
  emit another. Lesson and section bodies start at `<h2>`.
- **No skipped levels.** A page that goes `h1 → h2 → h3` is correct; `h1 → h3` is not.
  Screen-reader users rely on the heading outline as a table of contents, and a gap
  breaks it.
- **Landmarks.** Each page uses `<header>`, `<main id="main">` and `<footer>` as real
  landmarks. `#main` is the target of the skip link.
- **The in-page table of contents is generated** by `js/ui/toc.js` from the rendered
  headings, so a correct heading order automatically yields a correct contents list.

How to preserve it: when you add content, add headings in order, and never reach for a
visual style (bold text, a coloured paragraph) where a heading level is what the outline
needs.

## Skip link

Every page begins with a skip link that targets the main content:

```html
<a class="skip-link" href="#main">Skip to content</a>
```

The link is visually hidden until it receives keyboard focus, at which point it becomes
visible and the user can jump past the header and sidebar with a single Tab press. Do not
remove it, and keep its `href` pointing at `#main`.

## Focus visibility

- Every interactive element — links, buttons, the panel toggle, form controls — shows a
  visible focus indicator, driven by the `:focus-visible` styles in `css/components.css`.
- Focus rings are never removed with `outline: none` without an equally visible
  replacement.
- The focus ring must have sufficient contrast against the surface behind it in **both**
  the light and dark themes; because the ring is a token, changing it in one place
  updates every component.

## The display panel (ARIA)

The display panel is the most interaction-heavy component, so its semantics matter most.

| Element | Required semantics |
| --- | --- |
| Panel container | `role="dialog"` with an accessible name (`aria-label` or `aria-labelledby`) |
| Panel visibility | `aria-hidden="true"` when closed; focus is moved into the panel on open and returned to the trigger on close |
| FAB (toggle button) | `aria-expanded` reflecting whether the panel is open |
| Theme / romanisation / reduced-motion toggles | `aria-pressed="true"` or `"false"` reflecting the current state |
| Text-scale and line-height controls | Labelled inputs (native `<input type="range">` or labelled buttons), each with an accessible name |

Rules to keep when editing the panel:

- A toggle is a *button with `aria-pressed`*, not a styled `<div>`. If it can be clicked,
  it must be focusable and operable from the keyboard.
- `aria-expanded` on the FAB must always match the panel's actual state; do not let them
  drift.
- When the panel opens, focus moves into it; when it closes, focus returns to the FAB.
- Esc closes the panel (see "Keyboard operation").

## Colour and contrast

- **Body text meets 4.5:1** against its background in both themes (WCAG 2.1 AA). Larger
  text and UI components meet the 3:1 requirement.
- Colour is never the only carrier of meaning: the current sidebar entry, for example,
  uses `aria-current="page"` in addition to any visual treatment, and states are not
  signalled by hue alone.
- Both themes are defined as tokens in `css/tokens.css`. Change a colour there, not in a
  component, so contrast can be audited in one place.

When you introduce a new colour pairing, check the contrast ratio before committing it.
Both light and dark themes must pass.

## Text size

- Body text is never rendered below **1rem**. The reading measure is controlled by
  layout, not by shrinking type.
- The text-scale preference increases the root size; because components size themselves
  in `rem`, the whole interface scales with it and nothing clips.
- Avoid fixed pixel heights on text containers; let them grow with the type.

## Motion

- Animations and transitions are suppressed or reduced under
  `@media (prefers-reduced-motion: reduce)`. The panel offers an explicit reduced-motion
  preference as well, for users whose OS setting does not cover their intent.
- No animation is essential to understanding content. Nothing important should depend on
  a transition completing.

## Keyboard operation

Every feature is reachable and operable with the keyboard alone:

- **Tab / Shift+Tab** move focus through links, the FAB, the sidebar and the panel
  controls in a logical order.
- **Enter / Space** activate buttons and toggles.
- **Esc** closes the display panel and returns focus to the FAB.
- **Arrow keys** adjust range-style controls (text scale, line height).
- Focus order follows the visual order; there are no positive `tabindex` values.

When adding a control, verify it can be reached, activated and dismissed without a
pointer, and that focus never becomes trapped or lost.

## Print

`css/print.css` is loaded with `media="print"` and produces a clean printout:

- The header, sidebar, display panel and other chrome are hidden; only the prose column
  prints.
- Link targets are not lost: printed prose remains readable and self-contained.
- Colour is not relied upon; the print stylesheet uses black on white.

Keep the print stylesheet in mind when you add a component — a component that only makes
sense on screen should be hidden in print.

## Manual test checklist

Run this before opening a pull request that touches markup, CSS or the panel. It takes a
few minutes and catches the majority of regressions.

- [ ] **Keyboard-only pass:** reach and operate every interactive control with Tab,
      Enter/Space and the arrow keys — no pointer.
- [ ] **Esc closes the panel** and focus returns to the FAB.
- [ ] **Skip link:** Tab once from the top of the page; the skip link appears and jumps to
      `#main`.
- [ ] **Focus ring** is visible on links, buttons and controls, in light **and** dark
      themes.
- [ ] **Heading order:** exactly one `<h1>`; no skipped levels, checked in the browser's
      accessibility tree or a heading outline tool.
- [ ] **Contrast:** body text reads at 4.5:1 or better in both themes (use a contrast
      checker).
- [ ] **Text scale:** increase it to the maximum; nothing clips, overlaps or is cut off.
- [ ] **Zoom to 200%** at a narrow viewport; the layout reflows without loss of content.
- [ ] **Reduced motion:** with the preference on, no non-essential animation plays.
- [ ] **Screen reader spot-check:** the panel announces as a dialog, toggles announce
      pressed/not-pressed, and the sidebar announces the current page.
- [ ] **Print preview:** chrome is hidden and the article prints legibly.

## Automated checks

CI (`.github/workflows/ci.yml`) enforces what can be checked mechanically:

- every page has exactly one `<h1>` and the required landmarks,
- a skip link targeting `#main` is present,
- the boot scripts and `data-page` attribute are present,
- every local link resolves (`tools/check-links.mjs`).

Automated checks cannot judge contrast, focus order or screen-reader output. Those remain
the job of the manual checklist above.
