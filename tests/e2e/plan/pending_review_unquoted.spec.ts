import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';

test.describe('A Plan page in pending request', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);

    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetPendingReviewPlan_WithoutQuote();
    await moduleBuilderPage.open();
  });

  test('has the summary tab visible and the confirm button is disabled', async ({
    page,
    i18n,
  }) => {
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().confirmActivityCTA()
    ).toBeDisabled();
    await expect(
      moduleBuilderPage.elements().goToDashboardCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().extraActionsMenu()
    ).not.toBeVisible();
    await expect(
      page
        .getByRole('status')
        .filter({ hasText: i18n.t('PLAN_GLOBAL_ALERT_SUBMITTED_STATE_TITLE') })
    ).toBeVisible();
    await expect(
      page.getByText(i18n.t('__PLAN_PAGE_INTRODUCTION_CARD_SUBMITTED_TITLE'))
    ).toBeVisible();
  });
  test('all inputs should be readonly', async () => {
    await moduleBuilderPage.expectAllModulesToBeReadonly();
  });
});
