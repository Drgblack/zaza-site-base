# Zaza Promptly - CLAUDE.md

## Mission
Design teacher-friendly UI that ships fast, reads clearly, and builds trust. Keep it calm, accessible, and easy to scan.

## Guardrails (enforce in reviews)
- Max content width: 720-960px on desktop. Paragraphs 60-80ch.
- Type ramp: H1 40-48, H2 32-36, H3 24-28, body 16-18. Leading 1.45-1.6.
- Spacing scale: base 4/8. Section blocks 48 / 64 / 80.
- CTA: 44x44 target minimum, contrast >= 4.5:1, visible focus.
- No ad-hoc colors - use brand tokens in STYLE.md.
- No layout shift on first interaction. No console errors.

## Definition of Done (per page)
1) Container and grid consistent across breakpoints.
2) Headings follow the type ramp. No skipped levels.
3) Links and buttons are keyboard and screen-reader friendly.
4) Primary CTA is clear, single per section, and accessible.
5) Screenshots saved to /visual/runs/... for each review.
6) Proposed changes are minimal and reversible (≤ 3 edits per run).

## Docs and references
- Style: [/docs/design/STYLE.md](docs/design/STYLE.md)
- Accessibility: [/docs/design/ACCESS.md](docs/design/ACCESS.md)
- Review heuristics: [/docs/design/REVIEW.md](docs/design/REVIEW.md)
- Subagents:
  - Design review: [/agents/DESIGN_REVIEW.md](agents/DESIGN_REVIEW.md)
  - Iterate UI:   [/agents/ITERATE_UI.md](agents/ITERATE_UI.md)
- Visual context: [/visual/](visual/)

## Brand tokens - Promptly
- Fonts: Inter, ui-sans-serif
- Colors:
  - Primary 600: #7E3AF2
  - Primary 700: #6C2BD9
  - Accent Pink: #F472B6
  - Neutral 900: #0F172A
  - Neutral 600: #475569
  - Surface: #FFFFFF
  - Dark surface: #0B1220
- Radius 16-20, subtle shadows

## Tailwind notes
Prefer recipes in STYLE.md. Avoid inline styles.

## Pilot pages
/ (home), /blog, /resources, /press

> Claude - use Playwright MCP to open pages, probe DOM, screenshot, and propose minimal diffs. Store artifacts under /visual/runs/YYYY-MM-DD_HH-mm/.
