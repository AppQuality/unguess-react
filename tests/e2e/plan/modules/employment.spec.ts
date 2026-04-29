import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { EmploymentModule } from '../../../fixtures/pages/Plan/Module_employment';

test.describe('The employment module defines the screen participants employments.', () => {
  let planPage: PlanPage;
  let employmentModule: EmploymentModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    employmentModule = new EmploymentModule(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.mockPatchPlan();
    await planPage.open();
    await planPage.elements().tabTarget().click();
  });
  test('It should exist on the tab screen participants', async () => {
    await expect(employmentModule.elements().module()).toBeVisible();
  });

  test('It should return an error if the multiselect is empty', async ({
    i18n,
  }) => {
    await employmentModule
      .elements()
      .module()
      .getByLabel(
        `${i18n.t(
          '__PLAN_PAGE_MODULE_EMPLOYMENT_OPTION_EMPLOYEE'
        )}, press delete or`
      )
      .getByLabel('Remove')
      .click();
    await employmentModule
      .elements()
      .module()
      .getByLabel(
        `${i18n.t(
          '__PLAN_PAGE_MODULE_EMPLOYMENT_OPTION_STUDENT'
        )}, press delete or`
      )
      .getByLabel('Remove')
      .click();
    await planPage.saveConfiguration();
    await expect(employmentModule.elements().moduleError()).toBeVisible();
    await expect(employmentModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_EMPLOYMENT_SIZE_ERROR_REQUIRED')
    );
  });

  test('It should have a number > 0 as an output', async ({ i18n, page }) => {
    const optionLabel = i18n.t(
      '__PLAN_PAGE_MODULE_EMPLOYMENT_OPTION_UNEMPLOYED'
    );

    // Open the dropdown by clicking the trigger
    await employmentModule.elements().moduleInput().click();

    // The actual input element (hidden initially, visible after dropdown opens)
    const comboboxInput = employmentModule
      .elements()
      .module()
      .locator('input[role="combobox"]');
    await comboboxInput.waitFor({ state: 'visible' });

    // Fill the input directly to ensure focus lands on the right element and
    // triggers input:change, so matchingOptions filters down to only UNEMPLOYED
    await comboboxInput.fill(optionLabel);

    // Verify the filtered option is visible in the portal listbox
    const unemployedOption = page.getByRole('option', { name: optionLabel });
    await expect(unemployedOption).toBeVisible();

    // Select via keyboard on the input element - avoids mousedown/blur race
    // condition that occurs when clicking a portal-rendered option
    await comboboxInput.press('ArrowDown');
    await comboboxInput.press('Enter');

    await expect(
      employmentModule
        .elements()
        .module()
        .getByLabel(`${optionLabel}, press delete or`)
    ).toBeVisible();
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();
    const localityModuleData = data.config.modules.find(
      (m: any) => m.type === 'employment'
    );
    expect(localityModuleData.output).toBeDefined();
    expect(localityModuleData.output).toEqual([
      'EMPLOYEE',
      'STUDENT',
      'UNEMPLOYED',
    ]);
  });
});
