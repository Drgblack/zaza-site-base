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
    md.push(`- âœ… Loaded and screenshot saved: ${outPng}`);
    md.push("");
  } catch (e) {
    md.push(`#### ${pagePath}`);
    md.push(`- âŒ Error: ${e.message}`);
    md.push("");
  } finally {
    await page.close();
  }
}

await browser.close();

fs.writeFileSync("ui-review.md", md.join("\n"), "utf8");
console.log("UI review complete. Summary written to ui-review.md");
