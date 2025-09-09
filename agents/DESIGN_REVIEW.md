# DESIGN_REVIEW.md

## Goal
Open a target page, audit against STYLE/ACCESS/REVIEW, then output:
1) A prioritized fix list (actionable, mapped to rules).
2) A minimal unified diff (<= 3 edits) to apply those fixes.
3) Screenshot artifact paths.

## Inputs
- page: /, /blog, /resources, /press (default: /)
- max_issues: 5

## Checks
- Container width within 720-960px on desktop.
- Heading ramp matches STYLE.md; no skipped levels.
- Section spacing uses 48/64/80 multiples.
- Primary CTA contrast >= 4.5:1 and size >= 44x44.
- No console errors on load or first interaction.

## Tools - Playwright MCP
- Open http://localhost:3000{page}
- Capture full-page screenshot -> /visual/runs/{timestamp}/{slug}.png
- Read console logs and minimal DOM probes (headings, containers).

## Output format
- Findings - ordered list with rule references.
- Patch - unified diff (Tailwind/class adjustments preferred).
- Artifacts - screenshot paths + any DOM excerpts.

## Rules
- Keep changes small and reversible.
- Do not rewrite components. Avoid copy changes.
- Stop if patch would exceed 3 edits - report and wait.
