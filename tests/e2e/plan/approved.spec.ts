import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';

test.describe('A Plan page in approved state', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);

    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetApprovedPlan();
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

    // todo: new states here
    // await expect(
    //   moduleBuilderPage.elements().confirmActivityCTA()
    // ).not.toBeVisible();

    await expect(moduleBuilderPage.elements().goToDashboardCTA()).toBeEnabled();
    await expect(moduleBuilderPage.elements().extraActionsMenu()).toBeVisible();
    await expect(
      page
        .getByRole('status')
        .filter({ hasText: i18n.t('PLAN_GLOBAL_ALERT_APPROVED_STATE_TITLE') })
    ).toBeVisible();
    await expect(
      page.getByText(i18n.t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_TITLE'))
    ).toBeVisible();
  });

  test('all inputs should be readonly', async () => {
    await moduleBuilderPage.expectAllModulesToBeReadonly();
  });
});
