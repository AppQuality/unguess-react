import { test, expect } from '../fixtures/app';
import { Dashboard } from '../fixtures/Dashboard';
import { JOTFORM_URL } from '../../src/pages/Dashboard/const';

test.describe('Home page', () => {
  let dashboard: Dashboard;

  test.beforeEach(async ({ page }) => {
    dashboard = new Dashboard(page);
    await dashboard.loggedIn();
    await dashboard.mockPreferences();
    await dashboard.mockWorkspace();
    await dashboard.mockWorkspacesList();
    await dashboard.open();
  });
  test('has title', async ({ i18n }) => {
    const title = dashboard.elements().title();
    await expect(title).toBeVisible();
    await expect(title).toHaveText(i18n.t('__PAGE_TITLE_PRIMARY_DASHBOARD'));
  });

  test('has a launch new CP CTA that open an external link', async ({
    context,
  }) => {
    const pagePromise = context.waitForEvent('page');
    await dashboard.elements().launchNewCPButton().click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(JOTFORM_URL);
  });
});
