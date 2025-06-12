import draft from '../../../api/plans/pid/_get/200_draft_complete.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { LocationModule } from '../../../fixtures/pages/Plan/Module_location';

test.describe('Location Module', () => {
  let planPage: PlanPage;
  let locationModule: LocationModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    locationModule = new LocationModule(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
    await locationModule.goToTab();
  });
  test('should display the Location module on the Plan page and relative nav item', async ({
    page,
    i18n,
  }) => {
    await expect(locationModule.elements().module()).toBeVisible();
    await expect(planPage.elements().targetNavigation()).toContainText(
      i18n.t('__PLAN_PAGE_MODULE_LOCATION_TITLE')
    );
    await expect(planPage.elements().targetNavigation()).toContainText(
      i18n.t('__ASIDE_NAVIGATION_MODULE_LOCATION_SUBTITLE')
    );
  });
  test('should display the Location module with correct data', async () => {
    const radioButtons = locationModule.elements().countryRadioInput();
    const checkedCount = await radioButtons.evaluateAll(
      (elements) =>
        elements.filter((el) => el instanceof HTMLInputElement && el.checked)
          .length
    );
    expect(checkedCount).toBe(1);
    const checkedRadio = locationModule
      .elements()
      .module()
      .getByRole('radio', { checked: true });
  });
});
