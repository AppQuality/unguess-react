import { test, expect } from '@playwright/test';

// E2E tests for the Location module

test.describe('Location Module', () => {
  test('should display the Location module on the Plan page', async ({
    page,
  }) => {
    // TODO: Update the URL and selector as needed for your app
    await page.goto('/plan');
    await expect(
      page.locator('text=Location module coming soon')
    ).toBeVisible();
  });
});
