import draft from '../../../api/plans/pid/_get/200_draft_complete.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { OutOfScopeModule } from '../../../fixtures/pages/Plan/Module_out_of_scope';

test.describe('The out of scope module defines the areas excluded from the activity.', () => {
  let planPage: PlanPage;
  let outOfScopeModule: OutOfScopeModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    outOfScopeModule = new OutOfScopeModule(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
    await planPage.elements().tabInstructions().click();
    await expect(outOfScopeModule.elements().module()).toBeVisible();
  });

  test('It should have a text area that show the value of the module', async () => {
    const outOfScope = OutOfScopeModule.getOutOfScopeFromPlan(draft);
    await expect(outOfScopeModule.elements().module()).toBeVisible();
    await expect(outOfScopeModule.elements().moduleInput()).toHaveText(
      outOfScope
    );
  });

  test('It should have a text area that show the value of the module and a way to change it', async () => {
    const outOfScope = OutOfScopeModule.getOutOfScopeFromPlan(draft);
    await expect(outOfScopeModule.elements().module()).toBeVisible();
    await expect(outOfScopeModule.elements().moduleInput()).toHaveText(
      outOfScope
    );
    await outOfScopeModule.elements().moduleInput().click();
    await outOfScopeModule.elements().moduleInput().fill('New out of scope');
    await expect(outOfScopeModule.elements().moduleInput()).toHaveText(
      'New out of scope'
    );
  });

  test('It should show an error if the textArea is too long', async () => {
    await outOfScopeModule.elements().moduleInput().click();
    await outOfScopeModule.elements().moduleInput().fill('a'.repeat(513));
    await outOfScopeModule.elements().moduleInput().blur();
    await expect(outOfScopeModule.elements().moduleError()).toBeVisible();
    await expect(outOfScopeModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_OUT_OF_SCOPE_SIZE_ERROR_TOO_LONG')
    );
  });

  test('It should allow improving the out of scope with AI only when word count >= 4', async ({
    page,
  }) => {
    const aiSuggestionText = 'This is a better out of scope suggested by AI';

    await planPage.mockAiSuggestion(aiSuggestionText);

    await outOfScopeModule.elements().moduleInput().click();

    await outOfScopeModule.elements().moduleInput().fill('test this ecommerce');
    await expect(outOfScopeModule.elements().aiButton()).toBeDisabled();

    await outOfScopeModule
      .elements()
      .moduleInput()
      .fill('test this ecommerce website');
    await expect(outOfScopeModule.elements().aiButton()).toBeEnabled();

    await outOfScopeModule.elements().aiButton().click();
    await expect(outOfScopeModule.elements().aiModal()).toBeVisible();
    await expect(page.getByText(aiSuggestionText)).toBeVisible();

    await outOfScopeModule.elements().aiModalAcceptButton().click();
    await expect(outOfScopeModule.elements().aiModal()).toBeHidden();
    await expect(outOfScopeModule.elements().moduleInput()).toHaveText(
      aiSuggestionText
    );
  });
});
