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
    await planPage.mockPatchPlan();
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
  test('should display the correct data', async ({ page }) => {
    // Arrange: get all relevant elements
    const {
      countryRadioInput,
      areaRadioInput,
      regionSelectionInput,
      regionSelectionPanel,
    } = locationModule.elements();

    // Assert: country radios
    await expect(countryRadioInput()).toHaveCount(3);
    await expect(countryRadioInput().nth(0)).toBeChecked();

    // Assert: area radios
    await expect(areaRadioInput()).toHaveCount(3);
    await expect(areaRadioInput().nth(1)).toBeChecked();

    // Assert: region checkboxes (20 regions + 4 market areas)
    await expect(regionSelectionInput()).toHaveCount(24);
    // Assert: Lombardia is checked
    await expect(
      regionSelectionPanel().locator(
        'input[type="checkbox"][value="Lombardia"]'
      )
    ).toBeChecked();
  });
  test('if a different area or state is selected, the region selection goes back to default', async ({
    page,
    i18n,
  }) => {
    const { countryRadioPanel, areaRadioPanel, regionSelectionPanel } =
      locationModule.elements();

    await countryRadioPanel().locator('label[for="country-radio-FR"]').click();
    await expect(
      countryRadioPanel().locator('input[value="FR"]')
    ).toBeChecked();

    await expect(areaRadioPanel()).not.toBeVisible();
    await expect(regionSelectionPanel()).not.toBeVisible();

    await countryRadioPanel().locator('label[for="country-radio-IT"]').click();
    await expect(
      countryRadioPanel().locator('input[value="IT"]')
    ).toBeChecked();
    await expect(areaRadioPanel()).toBeVisible();
    await expect(regionSelectionPanel()).not.toBeVisible();
  });
  // now let's check the output of the location module
  test('should update the output when changing country, area, or region', async ({
    page,
    i18n,
  }) => {
    const { countryRadioPanel, areaRadioPanel, regionSelectionPanel } =
      locationModule.elements();

    await countryRadioPanel().locator('label[for="country-radio-FR"]').click();
    await expect(
      countryRadioPanel().locator('input[value="FR"]')
    ).toBeChecked();
    await expect(areaRadioPanel()).not.toBeVisible();
    await expect(regionSelectionPanel()).not.toBeVisible();

    // now save plan and check output
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();
    expect(data.config.modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'location',
          output: [{ type: 'country', values: ['FR'] }],
        }),
      ])
    );
  });
});
