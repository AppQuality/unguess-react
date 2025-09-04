import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';

test.describe('A Plan page in paying state', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);

    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetPayingPlan();
    await moduleBuilderPage.open();
  });

  test('all inputs should be readonly', async () => {
    await moduleBuilderPage.expectAllModulesToBeReadonly();
  });
});
