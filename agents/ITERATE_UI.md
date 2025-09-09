# ITERATE_UI.md

## Goal
Apply the smallest possible edits to satisfy DESIGN_REVIEW checks, verify visually, and stop.

## Process - max 3 iterations
1) Apply up to 3 minimal edits (className spacing/size/contrast).
2) Refresh page after rebuild.
3) Re-screenshot -> /visual/runs/{timestamp}/{slug}_iter{n}.png
4) Re-run the checks - success = all pass or iteration cap reached.

## Safety
- No dependency changes or refactors.
- If new console errors appear, revert last edit and stop with notes.
