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
    const outOfScope = PlanPage.getOutOfScopeFromPlan(draft);
    await planPage.elements().instructionsTab().click();
    await expect(planPage.elements().outOfScopeModule()).toBeVisible();
    await expect(planPage.elements().outOfScopeModuleInput()).toHaveValue(
      outOfScope
    );
  });

  test('It should have a text area that show the value of the module and a way to change it', async () => {
    const outOfScope = PlanPage.getOutOfScopeFromPlan(draft);
    await planPage.elements().instructionsTab().click();
    await expect(planPage.elements().outOfScopeModule()).toBeVisible();
    await expect(planPage.elements().outOfScopeModuleInput()).toHaveValue(
      outOfScope
    );
    await planPage.elements().outOfScopeModuleInput().click();
    await planPage.elements().outOfScopeModuleInput().fill('New out of scope');
    await expect(planPage.elements().outOfScopeModuleInput()).toHaveValue(
      'New out of scope'
    );
  });

  test('It should not show an error if the textArea is empty', async () => {
    await planPage.elements().instructionsTab().click();
    await planPage.elements().outOfScopeModuleInput().click();
    await planPage.elements().outOfScopeModuleInput().fill('');
    await planPage.elements().outOfScopeModuleInput().blur();
    await expect(planPage.elements().outOfScopeModuleError()).not.toBeVisible();
  });

  test('It should show an error if the textArea is too long', async () => {
    await planPage.elements().instructionsTab().click();
    await planPage.elements().outOfScopeModuleInput().click();
    await planPage.elements().outOfScopeModuleInput().fill('a'.repeat(517));
    await planPage.elements().outOfScopeModuleInput().blur();
    await expect(planPage.elements().outOfScopeModuleError()).toBeVisible();
    await expect(planPage.elements().outOfScopeModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_OUT_OF_SCOPE_SIZE_ERROR_TOO_LONG')
    );
  });
});
