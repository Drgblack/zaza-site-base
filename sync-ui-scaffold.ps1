# sync-ui-scaffold.ps1
# This script keeps the Claude UI scaffolding files in sync

Write-Host "Syncing Claude UI scaffold files..."

# Ensure directories exist
New-Item -ItemType Directory -Force -Path ".github/workflows" | Out-Null
New-Item -ItemType Directory -Force -Path "agents" | Out-Null
New-Item -ItemType Directory -Force -Path "docs/design" | Out-Null
New-Item -ItemType Directory -Force -Path "scripts" | Out-Null

# Copy template files (adjust paths if needed)
Copy-Item ".\templates\.github\workflows\ui-review.yml" ".github\workflows\ui-review.yml" -Force
Copy-Item ".\templates\agents\*" "agents\" -Recurse -Force
Copy-Item ".\templates\docs\design\*" "docs\design\" -Recurse -Force
Copy-Item ".\templates\scripts\ui-review.mjs" "scripts\ui-review.mjs" -Force

Write-Host "✅ UI scaffold sync complete."
