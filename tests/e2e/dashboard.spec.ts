import { test, expect } from '../fixtures/app';
import { Dashboard } from '../fixtures/Dashboard';

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

  test('has a create new PJ CTA that open an modal', async () => {
    await dashboard.elements().launchNewPJButton().click();
    await expect(dashboard.page.getByRole('dialog')).toBeVisible();
  });
});
