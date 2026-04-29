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
    await employmentModule.elements().moduleInput().click();
    const unemployedOption = page.getByRole('option', {
      name: i18n.t('__PLAN_PAGE_MODULE_EMPLOYMENT_OPTION_UNEMPLOYED'),
    });
    await expect(unemployedOption).toBeVisible();
    await unemployedOption.click();
    await expect(
      employmentModule
        .elements()
        .module()
        .getByLabel(
          `${i18n.t(
            '__PLAN_PAGE_MODULE_EMPLOYMENT_OPTION_UNEMPLOYED'
          )}, press delete or`
        )
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
