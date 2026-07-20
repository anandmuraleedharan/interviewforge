import { test, expect } from '@playwright/test';

test.describe('InterviewForge Visual & Functional E2E Suite', () => {
  test('Desktop Viewport - Landing Hub & Feature Cards', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3007');

    // Verify title & heading
    await expect(page).toHaveTitle(/InterviewForge/i);
    const heading = page.locator('h1');
    await expect(heading).toContainText(/InterviewForge/i);

    // Capture Desktop Hub Screenshot
    await page.screenshot({ path: '../../brain/ddab28fd-b435-4e92-a7d3-930d55ff1a7d/.tempmediaStorage/interviewforge_desktop_hub.png', fullPage: true });
  });

  test('Desktop Viewport - ATS Resume Matcher Page (/tailor)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3007/tailor');

    const heading = page.locator('h1');
    await expect(heading).toContainText(/ATS Resume Matcher/i);

    await page.screenshot({ path: '../../brain/ddab28fd-b435-4e92-a7d3-930d55ff1a7d/.tempmediaStorage/interviewforge_desktop_tailor.png', fullPage: true });
  });

  test('Mobile Viewport - Responsive Layout & Mobile View', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3007');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    await page.screenshot({ path: '../../brain/ddab28fd-b435-4e92-a7d3-930d55ff1a7d/.tempmediaStorage/interviewforge_mobile_hub.png', fullPage: true });
  });
});
