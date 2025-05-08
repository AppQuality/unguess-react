import draft from '../../../api/plans/pid/_get/200_draft_complete.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { TargetModule } from '../../../fixtures/pages/Plan/Module_target';

test.describe('The title module defines the Plan title.', () => {
  let planPage: PlanPage;
  let targetModule: TargetModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    targetModule = new TargetModule(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
    await planPage.elements().tabTarget().click();
  });
  test('It should exist on the tab screen target', async () => {
    await expect(targetModule.elements().module()).toBeVisible();
  });
  test('It should have a target input that show the current value of the module and a way to change that value', async () => {
    const target = TargetModule.getTargetFromPlan(draft);
    await expect(targetModule.elements().module()).toBeVisible();
    await expect(targetModule.elements().moduleInput()).toBeVisible();
    await expect(targetModule.elements().moduleInput()).toHaveValue(
      target.toString()
    );
    await targetModule.fillInputTarget('8');
    await expect(targetModule.elements().moduleInput()).toHaveValue('8');
  });

  test('It should have an output of a number', async () => {
    await targetModule.fillInputTarget('');
    await expect(targetModule.elements().moduleError()).toBeVisible();
    await expect(targetModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_TARGET_SIZE_ERROR_REQUIRED')
    );
  });

  test('It should have a number > 0 as an output', async () => {
    await targetModule.fillInputTarget('0');
    await expect(targetModule.elements().moduleError()).toBeVisible();
    await expect(targetModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_TARGET_SIZE_ERROR_REQUIRED')
    );
  });
});
