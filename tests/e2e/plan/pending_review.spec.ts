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

  test('has only the confirm button visible', async () => {
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().confirmActivityCTA()
    ).toBeVisible();
    await expect(
      moduleBuilderPage.elements().confirmActivityCTA()
    ).toBeDisabled();
  });
  test('all inputs should be readonly', async () => {
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).not.toBeVisible();
  });

  // posso tornare indietro dal preventivo?
  test('there should be a cancel quotation button active', async () => {
    // Todo
  });
});
