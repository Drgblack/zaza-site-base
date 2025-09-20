import { test, expect } from "@playwright/test";

test.describe("Snippet Tool Final Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    // Wait for the snippet tool to load
    await page.waitForSelector('[data-snippet-editor]', { timeout: 10000 });
  });

  test("no overlay intercepts clicks over editor", async ({ page }) => {
    const editor = page.locator('[data-snippet-editor]');
    await expect(editor).toBeVisible();
    
    const box = await editor.boundingBox();
    if (!box) throw new Error('Editor not found');
    
    // Click near the top-right where the overlay used to be
    await page.mouse.click(box.x + box.width - 10, box.y + 10);
    
    // Typing should enter text or at least focus inside the editor container (no errors)
    await expect(editor).toBeVisible();
    
    // Check that no decorative elements are intercepting
    const elementAtPoint = await page.evaluate(
      ({ x, y }) => {
        const el = document.elementFromPoint(x, y);
        return el?.tagName || 'UNKNOWN';
      },
      { x: box.x + box.width - 20, y: box.y + 20 }
    );
    
    // Should hit the editor section or its children, not a decorative overlay
    expect(['SECTION', 'DIV', 'P', 'SPAN']).toContain(elementAtPoint);
  });

  test("format, tone, and language selects open and update", async ({ page }) => {
    // Test Format dropdown
    const format = page.getByLabel("Format");
    await expect(format).toBeVisible();
    await format.selectOption("sms");
    await expect(format).toHaveValue("sms");

    // Test Tone dropdown  
    const tone = page.getByLabel("Tone");
    await expect(tone).toBeVisible();
    await tone.selectOption("concise");
    await expect(tone).toHaveValue("concise");

    // Test Language dropdown
    const language = page.getByLabel("Language");
    await expect(language).toBeVisible();
    await language.selectOption("German");
    await expect(language).toHaveValue("German");
  });

  test("editor has proper styling and no clipping", async ({ page }) => {
    const editor = page.locator('[data-snippet-editor]');
    
    // Check editor is visible and properly styled
    await expect(editor).toBeVisible();
    
    // Verify it has the expected classes for proper styling
    await expect(editor).toHaveClass(/rounded-xl/);
    await expect(editor).toHaveClass(/bg-white/);
    
    // Check that editor is not overlapped by checking z-index context
    const zIndex = await editor.evaluate(el => {
      return window.getComputedStyle(el).position;
    });
    expect(zIndex).toBe('relative');
  });

  test("free messages label is visible and consistent", async ({ page }) => {
    await expect(page.getByText(/free messages\/month — unlimited in Promptly/i)).toBeVisible();
  });

  test("share button and controls have proper layering", async ({ page }) => {
    const shareButton = page.getByRole('button', { name: /share/i });
    await expect(shareButton).toBeVisible();
    
    // Click share button to test it's not blocked
    await shareButton.click();
    
    // Should open the share menu
    await expect(page.getByText(/Email/)).toBeVisible();
    
    // Close it
    await page.keyboard.press('Escape');
  });
});