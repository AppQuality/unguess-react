import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { GenderModule } from '../../../fixtures/pages/Plan/Module_gender';

test.describe('The gender module defines the user gender.', () => {
  let moduleBuilderPage: PlanPage;
  let genderModule: GenderModule;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    genderModule = new GenderModule(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftPlan();
    await moduleBuilderPage.mockPatchPlan();
    await moduleBuilderPage.open();
    await moduleBuilderPage.elements().tabTarget().click();
  });

  test('It should be visible if gender is set in the plan and show saved info correctly', async () => {
    const { module, moduleInput, modulepercentageInput } =
      genderModule.elements();
    await expect(module()).toBeVisible();
    const genderCheckboxes = moduleInput();
    const checkedCount = await genderCheckboxes.evaluateAll(
      (elements) =>
        elements.filter(
          (el) =>
            el instanceof HTMLInputElement &&
            el.type === 'checkbox' &&
            el.checked
        ).length
    );
    const femaleCheckbox = module().locator('input[value="female"]');
    expect(checkedCount).toBe(1);
    expect(femaleCheckbox).toBeChecked();
    await expect(modulepercentageInput()).not.toBeVisible();
  });
  test('It should have an output of an array of objects with gender and percentage, in the default variant percentages are 0', async () => {
    /*
    this testcase test the following:
    - initial state of the plan is only female checked (100%)
    - click on male checkbox
    - the output should be male female with 0 percentages (not an explicit percentage choice) and variant default
    */
    const { module } = genderModule.elements();
    // check the male checkbox
    await module().locator('label[for="gender-male"]').check();
    const response = await moduleBuilderPage.saveConfiguration();
    const data = response.request().postDataJSON();
    // Find the gender module and check its output
    const genderModuleData = data.config.modules.find(
      (m: any) => m.type === 'gender'
    );
    expect(genderModuleData).toEqual(
      expect.objectContaining({
        type: 'gender',
        output: [
          { gender: 'female', percentage: 0 },
          { gender: 'male', percentage: 0 },
        ],
        variant: 'default',
      })
    );
  });

  test('It should have an output of an array of objects with gender and percentage, in the percentage variant percentages values are setted', async () => {
    /*
    this testcase test the following:
    - initial state of the plan is only female checked (100%)
    - click on percentage variant
    - click on male checkbox
    - an error should be shown to the user to prompt to set the percentage for male
    - click on male percentage input and set it to 100 and female to 0
    - an error should be shown to the user to prompt to set the percentage for female
    - click on female percentage input and set it to 50
    - an error should be shown to the user to prompt to set the percentage sum to 100
    - input into male percentage input 50
    - the output should be male female with 50 percentages (explicit percentage choice) and variant percentage and without any error
    */

    const { module, moduleInput, moduleChangeVariantButton } =
      genderModule.elements();
    await expect(module()).toBeVisible();
    const genderCheckboxes = moduleInput();
    const checkedCount = await genderCheckboxes.evaluateAll(
      (elements) =>
        elements.filter(
          (el) =>
            el instanceof HTMLInputElement &&
            el.type === 'checkbox' &&
            el.checked
        ).length
    );
    const femaleCheckbox = module().locator('input[value="female"]');
    expect(checkedCount).toBe(1);
    expect(femaleCheckbox).toBeChecked();
    await moduleChangeVariantButton().click();
    await module().locator('label[for="gender-male"]').check();
    await expect(
      module().getByTestId('gender-unassigned-percentage-error')
    ).toBeVisible();
    // write into female percentage input
    await genderModule.fillFemalePercentageInput('0');
    await genderModule.fillMalePercentageInput('100');
    await expect(
      module().getByTestId('gender-unassigned-percentage-error')
    ).toBeVisible();
    await genderModule.fillFemalePercentageInput('50');
    await expect(module().getByTestId('gender-percentage-error')).toBeVisible();
    await genderModule.fillMalePercentageInput('50');
    await expect(
      module().getByTestId('gender-unassigned-percentage-error')
    ).not.toBeVisible();
    await expect(
      module().getByTestId('gender-percentage-error')
    ).not.toBeVisible();

    const response = await moduleBuilderPage.saveConfiguration();
    const data = response.request().postDataJSON();
    // Find the gender module and check its output
    const genderModuleData = data.config.modules.find(
      (m: any) => m.type === 'gender'
    );
    expect(genderModuleData).toEqual(
      expect.objectContaining({
        type: 'gender',
        output: [
          { gender: 'female', percentage: 50 },
          { gender: 'male', percentage: 50 },
        ],
        variant: 'percentage',
      })
    );
  });

  test('It should be possible to remove the module from the plan', async () => {
    /*
    this testcase test the following:
    - initial state of the plan is only female checked (100%)
    - click on remove module button
    - the module should not be visible anymore
    - the output should not contain the module gender
    */
    const { module, moduleInput, removeButton } = genderModule.elements();
    await expect(module()).toBeVisible();
    const genderCheckboxes = moduleInput();
    const checkedCount = await genderCheckboxes.evaluateAll(
      (elements) =>
        elements.filter(
          (el) =>
            el instanceof HTMLInputElement &&
            el.type === 'checkbox' &&
            el.checked
        ).length
    );
    const femaleCheckbox = module().locator('input[value="female"]');
    expect(checkedCount).toBe(1);
    expect(femaleCheckbox).toBeChecked();

    await removeButton().click();
    await moduleBuilderPage.elements().removeModuleModalConfirm().click();
    await expect(module()).not.toBeVisible();
    // Assert: the module is removed from the plan output
    const response = await moduleBuilderPage.saveConfiguration();
    const data = response.request().postDataJSON();
    expect(data.config.modules).not.toContainEqual(
      expect.objectContaining({ type: 'gender' })
    );
  });
  test('It should be possible to add the module at the plan if is not already', async () => {
    /*
    this testcase test the following:
    - initial state of the plan is only female checked (100%)
    - click on remove module button
    - click on add module button
    - the module should be visible with default values
    - the output should ????
    */
  });
});
