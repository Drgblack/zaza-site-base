<# 
  sync-ui-scaffold.ps1
  - Fetches Patrick Ellis's Markdown docs and syncs Claude scaffolding.
  - Safe-by-default: downloads Patrick's .md files to docs/patrick/ but does NOT overwrite your live agents/ or docs/design/ unless -OverlayPatrick is used.
  - You can run this from any repo that should receive the scaffolding (zaza-site-base, promptly-website, realtyclose-website, etc.)
#>

param(
  [switch]$OverlayPatrick,     # if set, overlays Patrick's .md into agents/ and docs/design/
  [switch]$OverwriteLocal,     # if set with -OverlayPatrick, allows overwriting existing local files (use carefully)
  [string]$PatrickRepoUrl = "https://github.com/OneRedOak/claude-code-workflows.git"
)

function Ensure-Dir($p) { if (!(Test-Path $p)) { New-Item -ItemType Directory -Force -Path $p | Out-Null } }

$RepoRoot   = (Get-Location).Path
$TmpRoot    = Join-Path $RepoRoot "..\_patrick_workflows"
$PatrickDir = $TmpRoot  # clone/pull destination

# --- Ensure folders in current repo ---
$DocsDesign  = Join-Path $RepoRoot "docs\design"
$DocsPatrick = Join-Path $RepoRoot "docs\patrick"
$AgentsDir   = Join-Path $RepoRoot "agents"
$ScriptsDir  = Join-Path $RepoRoot "scripts"
$WfDir       = Join-Path $RepoRoot ".github\workflows"
$VisualGolden= Join-Path $RepoRoot "visual\golden"
$VisualRuns  = Join-Path $RepoRoot "visual\runs"

$AllEnsure = @($DocsDesign,$DocsPatrick,$AgentsDir,$ScriptsDir,$WfDir,$VisualGolden,$VisualRuns)
$AllEnsure | ForEach-Object { Ensure-Dir $_ }

Write-Host "🔎 Fetching Patrick's repo to $PatrickDir ..."
if (!(Test-Path $PatrickDir)) {
  git clone $PatrickRepoUrl $PatrickDir | Out-Null
} else {
  git -C $PatrickDir pull | Out-Null
}

if (!(Test-Path $PatrickDir)) {
  Write-Error "Could not clone/pull $PatrickRepoUrl"
  exit 1
}

# --- Gather Patrick's Markdown files ---
$PatrickMd = Get-ChildItem -Path $PatrickDir -Include *.md -Recurse -File
if ($PatrickMd.Count -eq 0) {
  Write-Warning "No .md files found in Patrick's repo. Check the repo structure."
} else {
  Write-Host "📥 Copying Patrick's .md files into docs/patrick/ (reference-only) ..."
  foreach ($f in $PatrickMd) {
    # preserve relative folder structure under docs/patrick/
    $rel = Resolve-Path $f.FullName | ForEach-Object { $_.Path.Replace((Resolve-Path $PatrickDir).Path + [IO.Path]::DirectorySeparatorChar, "") }
    $dest = Join-Path $DocsPatrick $rel
    Ensure-Dir (Split-Path $dest -Parent)
    Copy-Item $f.FullName $dest -Force
  }
}

# --- Optional overlay into live agents/ and docs/design/ ---
if ($OverlayPatrick) {
  Write-Host "🧩 Overlay mode ON: applying relevant Patrick docs into live folders..."

  # Heuristics: copy files with names suggesting agents/workflows/design into the right places.
  # We'll prefer files that live in folders named 'agents', 'workflows', 'design', 'docs', 'prompts'.
  $agentCandidates = Get-ChildItem -Path $PatrickDir -Recurse -File -Include *.md | Where-Object {
    $_.DirectoryName -match "(agents|subagents|workflows|prompts)" -or $_.Name -match "(agent|review|iterate|design_review|iterate_ui)"
  }
  $designCandidates = Get-ChildItem -Path $PatrickDir -Recurse -File -Include *.md | Where-Object {
    $_.DirectoryName -match "(design|style|docs)" -or $_.Name -match "(style|access|review|claude\.md|claude)"
  }

  # Helper to copy with optional overwrite safeguard
  function Copy-Safe($srcFile, $dstFile) {
    Ensure-Dir (Split-Path $dstFile -Parent)
    if ((Test-Path $dstFile) -and -not $OverwriteLocal) {
      Write-Host "   ↪️  Skipped (exists): $dstFile (use -OverwriteLocal to replace)"
    } else {
      Copy-Item $srcFile $dstFile -Force
      Write-Host "   ✅ Copied: $dstFile"
    }
  }

  if ($agentCandidates.Count -gt 0) {
    Write-Host "➡️  Syncing agent-ish files into: $AgentsDir"
    foreach ($f in $agentCandidates) {
      $name = $f.Name
      # Map common names to our expected agent file names if possible
      if ($name -match "design_review") { Copy-Safe $f.FullName (Join-Path $AgentsDir "DESIGN_REVIEW.md"); continue }
      if ($name -match "iterate_ui")    { Copy-Safe $f.FullName (Join-Path $AgentsDir "ITERATE_UI.md"); continue }
      # Otherwise, copy as-is under agents/patrick/
      $dst = Join-Path $AgentsDir "patrick\$name"
      Copy-Safe $f.FullName $dst
    }
  }

  if ($designCandidates.Count -gt 0) {
    Write-Host "➡️  Syncing design-ish files into: $DocsDesign"
    foreach ($f in $designCandidates) {
      $name = $f.Name.ToUpper()
      if ($name -eq "STYLE.MD")  { Copy-Safe $f.FullName (Join-Path $DocsDesign "STYLE.md");  continue }
      if ($name -eq "ACCESS.MD") { Copy-Safe $f.FullName (Join-Path $DocsDesign "ACCESS.md"); continue }
      if ($name -eq "REVIEW.MD") { Copy-Safe $f.FullName (Join-Path $DocsDesign "REVIEW.md"); continue }
      # CLAUDE.md often lives at repo root in Patrick's examples; if found, place at project root but don't overwrite by default
      if ($f.Name -match "^CLAUDE\.md$") {
        if ($OverwriteLocal) { Copy-Item $f.FullName (Join-Path $RepoRoot "CLAUDE.md") -Force; Write-Host "   ✅ Copied: CLAUDE.md" }
        else { Write-Host "   ↪️  Found CLAUDE.md in Patrick repo; skipping (use -OverwriteLocal to replace your CLAUDE.md)" }
        continue
      }
      # Otherwise park under docs/design/patrick/
      $dst = Join-Path $DocsDesign "patrick\$($f.Name)"
      Copy-Safe $f.FullName $dst
    }
  }

  Write-Host "🟣 Overlay complete. Review diffs before committing."
} else {
  Write-Host "ℹ️ Overlay OFF. Patrick's files are available under docs/patrick/ for reference."
}

# --- Friendly summary ---
Write-Host ""
Write-Host "✅ Done."
Write-Host "   - Patrick docs mirrored under: $DocsPatrick"
if ($OverlayPatrick) {
  Write-Host "   - Overlays applied to: $AgentsDir and $DocsDesign"
  if (-not $OverwriteLocal) { Write-Host "   - Existing local files were preserved (use -OverwriteLocal to replace)" }
}
Write-Host ""
Write-Host "Next:"
Write-Host "  1) git add ."
Write-Host "  2) git commit -m 'chore: sync Patrick docs (+ optional overlay)'"
Write-Host "  3) git push (open a PR to trigger the UI Review workflow)"
