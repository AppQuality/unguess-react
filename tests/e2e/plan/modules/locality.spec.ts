import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { LocalityModule } from '../../../fixtures/pages/Plan/Module_locality';

test.describe('Locality Module', () => {
  let planPage: PlanPage;
  let localityModule: LocalityModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    localityModule = new LocalityModule(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.mockPatchPlan();
    await planPage.open();
    await localityModule.goToTab();
  });
  test('should display the module on the Plan page and relative nav item', async ({
    i18n,
  }) => {
    await expect(localityModule.elements().module()).toBeVisible();
    await expect(planPage.elements().targetNavigation()).toContainText(
      i18n.t('__PLAN_PAGE_MODULE_LOCALITY_TITLE')
    );
    await expect(planPage.elements().targetNavigation()).toContainText(
      i18n.t('__ASIDE_NAVIGATION_MODULE_LOCALITY_SUBTITLE')
    );
  });
  test('it should be possible to remove the module, the output should be removed', async () => {
    const { module, removeButton } = localityModule.elements();
    await expect(module()).toBeVisible();
    await removeButton().click();
    await planPage.elements().removeModuleModalConfirm().click();
    await expect(module()).not.toBeVisible();
    // Assert: the module is removed from the plan output
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();
    expect(data.config.modules).not.toContainEqual(
      expect.objectContaining({ type: 'locality' })
    );
  });
  test('it should be possible to add the module', async () => {
    const { module, removeButton } = localityModule.elements();
    await removeButton().click();
    await planPage.elements().removeModuleModalConfirm().click();
    await expect(module()).not.toBeVisible();

    // Add the module back
    // await planPage.addModule('locality');
    // await expect(module()).toBeVisible();
  });
  test('should display the correct saved data', async () => {
    const {
      countryRadioInput,
      areaRadioInput,
      regionSelectionInput,
      regionSelectionPanel,
    } = localityModule.elements();

    // Assert: country radios
    await expect(countryRadioInput()).toHaveCount(3);
    await expect(countryRadioInput().nth(0)).toBeChecked();

    // Assert: area radios
    await expect(areaRadioInput()).toHaveCount(3);
    await expect(areaRadioInput().nth(1)).toBeChecked();

    // 4 market areas + only 4 other regions are visible because market areas details without selected regions are hidden
    await expect(regionSelectionInput()).toHaveCount(8);
    // Assert: Lombardia is checked
    await expect(
      regionSelectionPanel().locator(
        'input[type="checkbox"][value="Lombardia"]'
      )
    ).toBeChecked();
  });
  test('if a different area or state is selected, the region selection goes back to default', async () => {
    const { countryRadioPanel, areaRadioPanel, regionSelectionPanel } =
      localityModule.elements();

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
  test('should update the output when changing country that does not allow further refinement', async () => {
    const { countryRadioPanel, areaRadioPanel, regionSelectionPanel } =
      localityModule.elements();

    await countryRadioPanel().locator('label[for="country-radio-FR"]').click();
    await expect(
      countryRadioPanel().locator('input[value="FR"]')
    ).toBeChecked();
    await expect(areaRadioPanel()).not.toBeVisible();
    await expect(regionSelectionPanel()).not.toBeVisible();

    // now save plan and check output
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();
    // Find the locality module and check its output
    const localityModuleData = data.config.modules.find(
      (m: any) => m.type === 'locality'
    );
    expect(localityModuleData.output).toEqual([
      { type: 'country', values: ['FR'] },
    ]);
  });
  test('should allow selecting cities and update output accordingly', async ({
    page,
    i18n,
  }) => {
    /*
      This test covers the following scenario:
      - Select Italy as country
      - Select the city area ("Province e grossi centri")
      - Click outside to trigger validation (no city selected): expect error message
      - Select two cities: error should disappear
      - Save and check output: output should contain country and selected cities
    */
    const {
      countryRadioPanel,
      areaRadioPanel,
      citySelectionPanel,
      errorMessage,
    } = localityModule.elements();

    // Select Italy as country
    await countryRadioPanel().locator('label[for="country-radio-IT"]').click();
    await expect(areaRadioPanel()).toBeVisible();

    // Select city area
    await areaRadioPanel().locator('label[for="area-radio-city"]').click();
    await expect(citySelectionPanel()).toBeVisible();

    // Click outside to trigger validation (no city selected)
    await page.click('body', { position: { x: 0, y: 0 } });
    await expect(errorMessage()).toBeVisible();
    await expect(errorMessage()).toContainText(
      i18n.t('__PLAN_PAGE_MODULE_LOCALITY_CITY_ERROR')
    );

    // Select again a city
    await citySelectionPanel().locator('label[for="city-checkbox-RM"]').click();

    // Error should disappear
    await expect(errorMessage()).not.toBeVisible();

    // Save and check output
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();
    // Find the locality module and check its output
    const localityModuleData = data.config.modules.find(
      (m: any) => m.type === 'locality'
    );
    expect(localityModuleData.output).toEqual([
      { type: 'country', values: ['IT'] },
      { type: 'city', values: ['RM'] },
    ]);
  });
  test('should allow selecting regions and update output accordingly', async ({
    page,
    i18n,
  }) => {
    /*
      This test covers the following scenario:
      - Add a region (Piemonte) to the panel
      - Save and check output: output should contain country and selected regions
      - Double click to uncheck all Nord Ovest market area (removes all regions in that area)
      - Click outside to trigger validation: expect error message for missing region
      - Re-check Nord Ovest market area (all regions in that area are selected again)
      - Error should disappear
      - Uncheck Lombardia (leaving only Piemonte selected)
      - Save and check output: output should contain country and other nord ovest regions
    */
    const { regionSelectionPanel, errorMessage } = localityModule.elements();

    // Add a Region to the panel
    await regionSelectionPanel()
      .locator('label[for="region-checkbox-Piemonte"]')
      .click();

    // Save and check output
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();

    // Find the locality module and check its output
    const localityModuleData = data.config.modules.find(
      (m: any) => m.type === 'locality'
    );
    expect(localityModuleData.output).toEqual([
      { type: 'country', values: ['IT'] },
      { type: 'region', values: ['Lombardia', 'Piemonte'] },
    ]);

    // Double click to uncheck all Nord Ovest market area that is originally checked
    await regionSelectionPanel()
      .locator('label[for="market-checkbox-nord-ovest"]')
      .click();
    await regionSelectionPanel()
      .locator('label[for="market-checkbox-nord-ovest"]')
      .click();

    // Click outside to trigger validation
    await page.click('body', { position: { x: 0, y: 0 } });
    await expect(errorMessage()).toBeVisible();
    await expect(errorMessage()).toContainText(
      i18n.t('__PLAN_PAGE_MODULE_LOCALITY_REGION_ERROR')
    );

    // open market area Nord Ovest, this check all regions
    await regionSelectionPanel()
      .locator('label[for="market-checkbox-nord-ovest"]')
      .click();
    // Error should disappear
    await expect(errorMessage()).not.toBeVisible();

    // and then uncheck Lombardia
    await regionSelectionPanel()
      .locator('label[for="region-checkbox-Lombardia"]')
      .click();

    // save and check output again
    const response2 = await planPage.saveConfiguration();
    const data2 = response2.request().postDataJSON();
    // Find the locality module and check its output
    const localityModuleData2 = data2.config.modules.find(
      (m: any) => m.type === 'locality'
    );
    expect(localityModuleData2.output).toEqual([
      { type: 'country', values: ['IT'] },
      { type: 'region', values: ['Piemonte', 'Liguria', "Valle d'Aosta"] },
    ]);
  });
});
