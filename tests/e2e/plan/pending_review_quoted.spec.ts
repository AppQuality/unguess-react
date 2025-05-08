import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';

test.describe('A Plan page in pending request with a quote from us', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetPendingReviewPlan_WithQuote();
    await moduleBuilderPage.open();
  });

  test('has the summary tab visible and the confirm button is now enabled', async ({
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
    ).toBeEnabled();
    await expect(
      page
        .getByRole('status')
        .filter({ hasText: i18n.t('PLAN_GLOBAL_ALERT_AWATING_STATE_TITLE') })
    ).toBeVisible();
    await expect(
      page.getByText(
        i18n.t('__PLAN_PAGE_INTRODUCTION_CARD_AWAITING_REVIEW_TITLE')
      )
    ).toBeVisible();
  });

  test('all inputs should be readonly', async () => {
    await moduleBuilderPage.expectAllModulesToBeReadonly();
  });
});
