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
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).toBeVisible();
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).toBeDisabled();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).toBeVisible();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).toBeDisabled();
  });
  test('all inputs should be readonly', async () => {
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).toBeVisible();
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).toBeDisabled();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).toBeVisible();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).toBeDisabled();
  });

  // posso tornare indietro dal preventivo?
  test('there should be a cancel quotation button active', async () => {
    // Todo
  });
});
