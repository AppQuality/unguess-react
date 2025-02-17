import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/Plan';

test.describe('The module builder', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetPendingReviewPlan();
    await moduleBuilderPage.open();
  });

  test('has a list of saved modules and not the others, a save button and a request quote cta', async () => {
    await expect(moduleBuilderPage.elements().titleModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().tasksModule()).not.toBeVisible();
    // await expect(moduleBuilderPage.elements().datesModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().submitButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().submitButton()).toBeDisabled();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeDisabled();
    // to be continued
  });

  test('if mockGetPlan return a status of pending_review the quotation cta is disabled', async () => {
    // todo
  });
});
