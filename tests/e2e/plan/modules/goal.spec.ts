import draft from '../../../api/plans/pid/_get/200_draft_complete.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { GoalModule } from '../../../fixtures/pages/Plan/Module_goal';

test.describe('The title module defines the Plan title.', () => {
  let planPage: PlanPage;
  let goalModule: GoalModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    goalModule = new GoalModule(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
  });

  test('It should have a text area that show the value of the module', async () => {
    const goal = GoalModule.getGoalFromPlan(draft);
    await expect(goalModule.elements().module()).toBeVisible();
    await expect(goalModule.elements().moduleInput()).toHaveValue(goal);
  });

  test('It should have a text area that show the value of the module and a way to change it', async () => {
    const goal = GoalModule.getGoalFromPlan(draft);
    await expect(goalModule.elements().module()).toBeVisible();
    await expect(goalModule.elements().moduleInput()).toHaveValue(goal);
    await goalModule.elements().moduleInput().click();
    await goalModule.elements().moduleInput().fill('New Goal');
    await expect(goalModule.elements().moduleInput()).toHaveValue('New Goal');
  });

  test('It should show an error if the textArea is empty', async () => {
    await goalModule.elements().moduleInput().click();
    await goalModule.elements().moduleInput().fill('');
    await goalModule.elements().moduleInput().blur();
    await expect(goalModule.elements().moduleError()).toBeVisible();
    await expect(goalModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_GOAL_SIZE_ERROR_REQUIRED')
    );
  });

  test('It should show an error if the textArea is too long', async () => {
    await goalModule.elements().moduleInput().click();
    await goalModule.elements().moduleInput().fill('a'.repeat(257));
    await goalModule.elements().moduleInput().blur();
    await expect(goalModule.elements().moduleError()).toBeVisible();
    await expect(goalModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_GOAL_SIZE_ERROR_TOO_LONG')
    );
  });
});
