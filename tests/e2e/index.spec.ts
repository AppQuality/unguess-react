import { test, expect } from '../fixtures/app';
import { HomePage } from '../fixtures/Dashboard';
import { JOTFORM_URL } from '../../src/pages/Dashboard/const';

test.describe('Home page', () => {
  let homepage: HomePage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    await homepage.loggedIn();
    await homepage.open();
  });
  test('has title', async ({ page, i18n }) => {
    // Expect a title "to contain" a substring.
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();
    await expect(title).toHaveText(i18n.t('__PAGE_TITLE_PRIMARY_DASHBOARD'));
  });

  test('has a launch new CP CTA that open an external link', async ({
    page,
    context,
  }) => {
    const pagePromise = context.waitForEvent('page');
    await homepage.elements().launchNewCPButton().click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(JOTFORM_URL);
  });
});
