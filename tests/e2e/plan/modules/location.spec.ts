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
    const countryRadios = locationModule.elements().countryRadioInput();
    const areaRadios = locationModule.elements().areaRadioInput();
    const regionCheckboxes = locationModule.elements().regionSelectionInput();
    await expect(countryRadios).toHaveCount(3);
    await expect(countryRadios.nth(0)).toBeChecked();
    await expect(areaRadios).toHaveCount(2);
    await expect(areaRadios.nth(0)).toBeChecked();
    await expect(regionCheckboxes).toHaveCount(20);
    await expect(
      regionCheckboxes.locator('input[value="lombardia"]')
    ).toBeChecked();
  });
});
