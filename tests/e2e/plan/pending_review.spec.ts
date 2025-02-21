import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/Plan';

test.describe('A Plan page in pending request', () => {
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

  test('has the quotation cta and the save button disabled', async () => {
    await expect(moduleBuilderPage.elements().submitButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().submitButton()).toBeDisabled();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeDisabled();
  });
});
