import draft from '../../../api/plans/pid/_get/200_draft_complete.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';

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

  test('It should have a text area that show the value of the module', async () => {
    const goal = PlanPage.getGoalFromPlan(draft);
    await expect(planPage.elements().goalModule()).toBeVisible();
    await expect(planPage.elements().goalModuleInput()).toHaveValue(goal);
  });

  test('It should have a text area that show the value of the module and a way to change it', async () => {
    const goal = PlanPage.getGoalFromPlan(draft);
    await expect(planPage.elements().goalModule()).toBeVisible();
    await expect(planPage.elements().goalModuleInput()).toHaveValue(goal);
    await planPage.elements().goalModuleInput().click();
    await planPage.elements().goalModuleInput().fill('New Goal');
    await expect(planPage.elements().goalModuleInput()).toHaveValue('New Goal');
  });

  test('It should show an error if the textArea is empty', async () => {
    await planPage.elements().goalModuleInput().click();
    await planPage.elements().goalModuleInput().fill('');
    await planPage.elements().goalModuleInput().blur();
    await expect(planPage.elements().goalModuleError()).toBeVisible();
    await expect(planPage.elements().goalModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_GOAL_SIZE_ERROR_REQUIRED')
    );
  });

  test('It should show an error if the textArea is too long', async () => {
    await planPage.elements().goalModuleInput().click();
    await planPage.elements().goalModuleInput().fill('a'.repeat(257));
    await planPage.elements().goalModuleInput().blur();
    await expect(planPage.elements().goalModuleError()).toBeVisible();
    await expect(planPage.elements().goalModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_GOAL_SIZE_ERROR_TOO_LONG')
    );
  });
});
