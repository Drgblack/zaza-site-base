import { test, expect } from "@playwright/test";

test("article uses ArticleLayout", async ({ page }) => {
  await page.goto("/en/blog/chatgpt-lesson-planning-guide");
  await expect(page.locator("main[data-article-layout='v1']")).toBeVisible();
  await expect(page.locator("text=Related posts")).toBeVisible();
});