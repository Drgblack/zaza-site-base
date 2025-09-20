import { test, expect } from "@playwright/test";

test.describe("Snippet Tool Dropdowns - Rock Solid", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
    // Wait for the snippet tool to load
    await page.waitForSelector('[data-snippet-editor]', { timeout: 10000 });
  });

  test("native selects open and update", async ({ page }) => {
    // Test Format select
    const format = page.getByLabel("Format");
    await expect(format).toBeVisible();
    await format.selectOption("sms");
    await expect(format).toHaveValue("sms");

    // Test Tone select
    const tone = page.getByLabel("Tone");
    await expect(tone).toBeVisible();
    await tone.selectOption("supportive");
    await expect(tone).toHaveValue("supportive");

    // Test Language select
    const language = page.getByLabel("Language");
    await expect(language).toBeVisible();
    await language.selectOption("German");
    await expect(language).toHaveValue("German");
  });

  test("share menu positions correctly and stays above editor", async ({ page }) => {
    const shareBtn = page.getByRole("button", { name: /share/i });
    await expect(shareBtn).toBeVisible();
    
    // Click share button
    await shareBtn.click();
    
    // Check that menu appears
    const emailOption = page.getByText("Email").first();
    await expect(emailOption).toBeVisible();
    
    // Verify menu is positioned correctly (should be visible and not clipped)
    const menuBounds = await emailOption.boundingBox();
    expect(menuBounds).toBeTruthy();
    expect(menuBounds!.y).toBeGreaterThan(0); // Not clipped at top
    expect(menuBounds!.x).toBeGreaterThan(0); // Not clipped at left
    
    // Click somewhere on the editor area; menu should close
    const editor = page.locator('[data-snippet-editor]');
    const editorBounds = await editor.boundingBox();
    if (editorBounds) {
      await page.mouse.click(
        editorBounds.x + editorBounds.width / 2, 
        editorBounds.y + editorBounds.height / 2
      );
    }
    
    // Menu should be hidden after outside click
    await expect(emailOption).toBeHidden();
  });

  test("share menu keyboard navigation works", async ({ page }) => {
    const shareBtn = page.getByRole("button", { name: /share/i });
    
    // Focus and open with keyboard
    await shareBtn.focus();
    await shareBtn.press("Enter");
    
    // Menu should be open
    await expect(page.getByText("Email").first()).toBeVisible();
    
    // Escape should close
    await page.keyboard.press("Escape");
    await expect(page.getByText("Email").first()).toBeHidden();
  });

  test("native selects have proper styling and behavior", async ({ page }) => {
    const format = page.getByLabel("Format");
    
    // Check that select has proper classes and styling
    await expect(format).toHaveClass(/rounded-md/);
    await expect(format).toHaveClass(/border/);
    
    // Test keyboard navigation
    await format.focus();
    await format.press("ArrowDown");
    await format.press("Enter");
    
    // Should still be focused and functional
    await expect(format).toBeFocused();
  });

  test("no overlay blocks dropdowns or share menu", async ({ page }) => {
    // Test that Format select is not blocked
    const format = page.getByLabel("Format");
    await format.click();
    
    // Should be able to select an option
    await format.selectOption("email");
    await expect(format).toHaveValue("email");
    
    // Test that Share button is not blocked
    const shareBtn = page.getByRole("button", { name: /share/i });
    await shareBtn.click();
    
    // Menu should appear without issues
    await expect(page.getByText("Email").first()).toBeVisible();
    
    // Click outside to close
    await page.mouse.click(100, 100);
    await expect(page.getByText("Email").first()).toBeHidden();
  });

  test("share menu functions work correctly", async ({ page }) => {
    // Generate some content first
    const generateBtn = page.getByRole("button", { name: /generate/i });
    await generateBtn.click();
    
    // Wait for content to be generated
    await page.waitForTimeout(2000);
    
    // Open share menu
    const shareBtn = page.getByRole("button", { name: /share/i });
    await shareBtn.click();
    
    // Test copy link function (most testable)
    const copyBtn = page.getByText("Copy link");
    await expect(copyBtn).toBeVisible();
    
    // Note: We can't easily test the actual clipboard or mailto/whatsapp opening
    // in Playwright, but we can verify the buttons are clickable
    await expect(copyBtn).toBeEnabled();
    await expect(page.getByText("Email")).toBeEnabled();
    await expect(page.getByText("WhatsApp")).toBeEnabled();
  });

  test("editor is not overlapped by share menu or other elements", async ({ page }) => {
    const editor = page.locator('[data-snippet-editor]');
    const editorBounds = await editor.boundingBox();
    
    if (!editorBounds) throw new Error('Editor not found');
    
    // Test click in various parts of the editor
    const testPoints = [
      { x: editorBounds.x + 20, y: editorBounds.y + 20 }, // top-left
      { x: editorBounds.x + editorBounds.width - 20, y: editorBounds.y + 20 }, // top-right
      { x: editorBounds.x + editorBounds.width / 2, y: editorBounds.y + editorBounds.height / 2 }, // center
    ];
    
    for (const point of testPoints) {
      await page.mouse.click(point.x, point.y);
      
      // Should not trigger any unexpected behavior
      // Editor should remain visible and functional
      await expect(editor).toBeVisible();
    }
  });
});