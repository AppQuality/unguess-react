import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { GenderModule } from '../../../fixtures/pages/Plan/Module_gender';

test.describe('The digital literacy module defines the users digital skills.', () => {
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

  test('It should be visible if gender is set in the plan and show saved info correctly', async ({
    i18n,
  }) => {
    const { module, moduleInput, modulepercentageInput } =
      genderModule.elements();
    await expect(module()).toBeVisible();
    const genderCheckboxes = moduleInput();
    const checkedCount = await genderCheckboxes.evaluateAll(
      (elements) =>
        elements.filter((el) => el instanceof HTMLInputElement && el.checked)
          .length
    );
    const checkedFemaleCheckbox = await genderCheckboxes.evaluateAll(
      (elements) =>
        elements.filter(
          (el) =>
            el instanceof HTMLInputElement &&
            el.name == 'gender-female' &&
            el.checked
        )[0] as HTMLInputElement
    );
    expect(checkedCount).toBe(1);
    expect(checkedFemaleCheckbox).toBeDefined();
    await expect(modulepercentageInput()).not.toBeVisible();
  });
  test('It should have an output of an array of objects with gender and percentage, in the default variant percentages are 0', async ({
    i18n,
  }) => {
    // if we also check male options in variant default, the percentages should be 0
    const { module } = genderModule.elements();
    // check the male checkbox
  });
});
