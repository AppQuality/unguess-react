import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';
import draft from '../../../api/workspaces/wid/plans/pid/_get/200_draft_complete.json';

test.describe('The title module defines the Plan title.', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
  });
  test('It should exist on the tab screen target', async () => {
    await planPage.elements().targetTab().click();
    await expect(planPage.elements().targetModule()).toBeVisible();
  });
  test('It should have a target input that show the current value of the module and a way to change that value', async () => {
    const target = PlanPage.getTargetFromPlan(draft);
    await planPage.elements().targetTab().click();
    await expect(planPage.elements().targetModule()).toBeVisible();
    await expect(planPage.elements().targetModuleInput()).toBeVisible();
    await expect(planPage.elements().targetModuleInput()).toHaveValue(
      target.toString()
    );
    await planPage.fillInputTarget('8');
    await expect(planPage.elements().targetModuleInput()).toHaveValue('8');
  });

  test('It should have an output of a number', async () => {
    await planPage.elements().targetTab().click();
    await planPage.fillInputTarget('');
    await expect(planPage.elements().targetModuleError()).toBeVisible();
    await expect(planPage.elements().targetModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_TARGET_SIZE_ERROR_REQUIRED')
    );
  });

  test('It should have a number > 0 as an output', async () => {
    await planPage.elements().targetTab().click();
    await planPage.fillInputTarget('0');
    await expect(planPage.elements().targetModuleError()).toBeVisible();
    await expect(planPage.elements().targetModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_TARGET_SIZE_ERROR_REQUIRED')
    );
  });
});
