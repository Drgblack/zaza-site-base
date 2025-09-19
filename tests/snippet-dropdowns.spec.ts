import { test, expect } from "@playwright/test";

test.describe("Snippet Tool Dropdowns", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    // Wait for the snippet tool to load
    await page.waitForSelector('[aria-label="Format"]', { timeout: 10000 });
  });

  test("all selects are clickable, open, and update value", async ({ page }) => {
    // Test Format dropdown
    const format = page.getByLabel("Format");
    await expect(format).toBeVisible();
    await format.click();
    await page.getByRole("option", { name: /SMS/i }).click();
    await expect(format).toContainText(/SMS/i);

    // Test Tone dropdown
    const tone = page.getByLabel("Tone");
    await expect(tone).toBeVisible();
    await tone.click();
    await page.getByRole("option", { name: /Concise/i }).click();
    await expect(tone).toContainText(/Concise/i);

    // Test Language dropdown
    const lang = page.getByLabel("Language");
    await expect(lang).toBeVisible();
    await lang.click();
    await page.getByRole("option", { name: /German/i }).click();
    await expect(lang).toContainText(/German/i);
  });

  test("free messages label is visible and consistent", async ({ page }) => {
    await expect(page.getByText(/free messages\/month — unlimited in Promptly/i)).toBeVisible();
  });

  test("dropdowns are not blocked by preview area", async ({ page }) => {
    // Ensure the preview area doesn't intercept clicks
    const previewArea = page.locator('[data-noninteractive]');
    if (await previewArea.isVisible()) {
      // Verify preview area has pointer-events: none
      const pointerEvents = await previewArea.evaluate(el => 
        window.getComputedStyle(el).pointerEvents
      );
      expect(pointerEvents).toBe('none');
    }

    // Test that Format dropdown still works even if preview is visible
    const format = page.getByLabel("Format");
    await format.click();
    await expect(page.getByRole("option", { name: /Email/i })).toBeVisible();
    await page.getByRole("option", { name: /Email/i }).click();
  });

  test("keyboard navigation works for dropdowns", async ({ page }) => {
    // Test keyboard navigation on Tone dropdown
    const tone = page.getByLabel("Tone");
    await tone.focus();
    await tone.press("Enter");
    await expect(page.getByRole("option", { name: /Supportive/i })).toBeVisible();
    await page.press("Escape");
    
    // Verify dropdown closed
    await expect(page.getByRole("option", { name: /Supportive/i })).not.toBeVisible();
  });

  test("dropdowns have proper z-index and are not clipped", async ({ page }) => {
    // Open Format dropdown and check it's fully visible
    const format = page.getByLabel("Format");
    await format.click();
    
    const dropdown = page.getByRole("option", { name: /Email/i });
    await expect(dropdown).toBeVisible();
    
    // Check that dropdown is positioned correctly and not clipped
    const boundingBox = await dropdown.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0);
    expect(boundingBox!.x).toBeGreaterThan(0);
  });
});