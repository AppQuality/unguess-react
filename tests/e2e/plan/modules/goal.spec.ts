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
    await expect(goalModule.elements().moduleInput()).toHaveText(goal);
  });

  test('It should have a text area that show the value of the module and a way to change it', async () => {
    const goal = GoalModule.getGoalFromPlan(draft);
    await expect(goalModule.elements().module()).toBeVisible();
    await expect(goalModule.elements().moduleInput()).toHaveText(goal);
    await goalModule.elements().moduleInput().click();
    await goalModule.elements().moduleInput().fill('New Goal');
    await expect(goalModule.elements().moduleInput()).toHaveText('New Goal');
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

  test('It should show the correct label', async () => {
    await expect(goalModule.elements().moduleLabel()).toContainText(
      planPage.i18n.t('__PLAN_PAGE_MODULE_GOAL_LABEL')
    );
  });

  test('It should show the placeholder when the input is empty', async () => {
    await goalModule.elements().moduleInput().click();
    await goalModule.elements().moduleInput().press('Meta+a');
    await goalModule.elements().moduleInput().press('Backspace');
    await expect(goalModule.elements().editorParagraph()).toHaveAttribute(
      'data-placeholder',
      planPage.i18n.t('__PLAN_PAGE_MODULE_GOAL_PLACEHOLDER')
    );
  });

  test('It should show the info button next to the label', async () => {
    await expect(goalModule.elements().infoButton()).toBeVisible();
  });

  test('It should show a tooltip when hovering the info button', async () => {
    await goalModule.elements().infoButton().hover();
    await expect(goalModule.elements().tooltipTitle()).toBeVisible();
  });

  test('It should allow improving the goal with AI only when word count >= 4', async ({
    page,
  }) => {
    const aiSuggestionText = 'This is a better goal suggested by AI';

    await planPage.mockAiSuggestion(aiSuggestionText);

    await goalModule.elements().moduleInput().click();
    await goalModule.elements().moduleInput().press('Meta+a');
    await goalModule.elements().moduleInput().pressSequentially('test this ecommerce');
    await expect(goalModule.elements().aiButton()).toBeDisabled();

    await goalModule.elements().moduleInput().press('Meta+a');
    await goalModule
      .elements()
      .moduleInput()
      .pressSequentially('test this ecommerce website');
    await expect(goalModule.elements().aiButton()).toBeEnabled();

    await goalModule.elements().aiButton().click();
    await expect(goalModule.elements().aiModal()).toBeVisible();
    await expect(page.getByText(aiSuggestionText)).toBeVisible();

    await goalModule.elements().aiModalAcceptButton().click();
    await expect(goalModule.elements().aiModal()).toBeHidden();
    await expect(goalModule.elements().moduleInput()).toHaveText(
      aiSuggestionText
    );
  });
});
