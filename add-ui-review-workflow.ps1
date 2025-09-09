# add-ui-review-workflow.ps1
# Run this once from repo root:  .\add-ui-review-workflow.ps1

$RepoRoot   = (Get-Location).Path
$ScriptsDir = Join-Path $RepoRoot "scripts"
$WorkflowDir = Join-Path $RepoRoot ".github\workflows"

New-Item -ItemType Directory $ScriptsDir,$WorkflowDir -Force | Out-Null

# --- Write scripts/ui-review.mjs ---
@'
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const PAGES = (process.env.PAGES || "/").split(",").map(s => s.trim()).filter(Boolean);
const VISUAL_DIR = process.env.VISUAL_DIR || "visual/runs/local";
const VIEWPORT = { width: 1280, height: 900 };

fs.mkdirSync(VISUAL_DIR, { recursive: true });

const md = [];
md.push("### UI Review");
md.push(`Base: ${BASE_URL}`);
md.push(`Pages: ${PAGES.join(", ")}`);
md.push("");

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT });

for (const pagePath of PAGES) {
  const page = await context.newPage();
  const url = `${BASE_URL}${pagePath}`;
  const slug = pagePath === "/" ? "home" : pagePath.replace(/[^\w]+/g, "_");
  const outPng = path.join(VISUAL_DIR, `${slug}.png`);

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.screenshot({ path: outPng, fullPage: true });
    md.push(`#### ${pagePath}`);
    md.push(`- ✅ Loaded and screenshot saved: ${outPng}`);
    md.push("");
  } catch (e) {
    md.push(`#### ${pagePath}`);
    md.push(`- ❌ Error: ${e.message}`);
    md.push("");
  } finally {
    await page.close();
  }
}

await browser.close();

fs.writeFileSync("ui-review.md", md.join("\n"), "utf8");
console.log("UI review complete. Summary written to ui-review.md");
'@ | Set-Content (Join-Path $ScriptsDir "ui-review.mjs") -Encoding UTF8

# --- Write .github/workflows/ui-review.yml ---
@'
name: UI Review

on:
  pull_request:
    paths:
      - "app/**"
      - "components/**"
      - "pages/**"
      - "styles/**"

jobs:
  review:
    runs-on: ubuntu-latest
    env:
      PAGES: "/,/blog"
      BASE_URL: "http://localhost:3000"
      VISUAL_DIR: "visual/runs/${{ github.sha }}"

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install deps
        run: npm ci || npm install

      - name: Build
        run: npm run build

      - name: Start Next.js server
        run: |
          npm run start -- -p 3000 &
          npx wait-on http://localhost:3000

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run UI review script
        run: node scripts/ui-review.mjs

      - name: Upload screenshots
        uses: actions/upload-artifact@v4
        with:
          name: ui-screenshots
          path: ${{ env.VISUAL_DIR }}

      - name: Post PR comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require("fs");
            let body = "UI Review ran but no summary file.";
            if (fs.existsSync("ui-review.md")) {
              body = fs.readFileSync("ui-review.md", "utf8");
            }
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.payload.pull_request.number,
              body
            });
'@ | Set-Content (Join-Path $WorkflowDir "ui-review.yml") -Encoding UTF8

# Ensure dev deps
npm i -D @playwright/test wait-on | Out-Host
npx playwright install | Out-Host

Write-Host "`n✅ UI review workflow and script added. Commit + push to GitHub to activate."
