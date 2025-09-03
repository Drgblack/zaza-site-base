import { test, expect } from "@playwright/test";

test("article uses ArticleLayout", async ({ page }) => {
  await page.goto("/en/blog/chatgpt-lesson-planning-guide");
  await expect(page.locator("main[data-article-layout='v1']")).toBeVisible();
  await expect(page.locator("text=Related posts")).toBeVisible();
});

test("article 404 fix - ai-grading-feedback-tools", async ({ page }) => {
  await page.goto("/en/blog/ai-grading-feedback-tools");
  await expect(page.locator("main[data-article-layout='v1']")).toBeVisible();
  await expect(page.locator("h1")).toContainText("AI Grading");
});

test("share rail visible on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 }); // Desktop size
  await page.goto("/en/blog/ai-vs-chatgpt-for-teachers");
  await expect(page.locator("[data-share-rail]")).toBeVisible();
});

// Blog2 tests
test("blog2 index loads and shows cards", async ({ page }) => {
  await page.goto("/en/blog2");
  await expect(page.locator("h1")).toContainText("AI Teaching Blog v2");
  await expect(page.locator("a[href*='/blog2/']")).toHaveCount({ moreThan: 0 });
});

test("blog2 article loads with v2 layout", async ({ page }) => {
  await page.goto("/en/blog2/chatgpt-lesson-planning-guide");
  await expect(page.locator("main[data-article-layout='v2']")).toBeVisible();
  await expect(page.locator("h1")).toBeVisible();
});

test("blog2 share rail visible on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/en/blog2/ai-vs-chatgpt-for-teachers");
  await expect(page.locator("[data-share-rail]")).toBeVisible();
});