import { test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
// import { OutOfScopeModule } from '../../../fixtures/pages/Plan/Module_out_of_scope';

test.describe('The title module defines the Plan title.', () => {
  let planPage: PlanPage;
  // let module: OutOfScopeModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    // module = new OutOfScopeModule(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
    await planPage.elements().tabInstructions().click();
  });

  // it is not possible to test this field anymore, because the input is now a tiptap editor
  // and the way to interact with it is different from a normal textarea
  // test('It should have a text area that show the value of the module', async () => {
  //   const outOfScope = OutOfScopeModule.getOutOfScopeFromPlan(draft);
  //   await expect(module.elements().module()).toBeVisible();
  //   await expect(module.elements().moduleInput()).toHaveValue(outOfScope);
  // });

  // test('It should have a text area that show the value of the module and a way to change it', async () => {
  //   const outOfScope = OutOfScopeModule.getOutOfScopeFromPlan(draft);
  //   await expect(module.elements().module()).toBeVisible();
  //   await expect(module.elements().moduleInput()).toHaveValue(outOfScope);
  //   await module.elements().moduleInput().click();
  //   await module.elements().moduleInput().fill('New out of scope');
  //   await expect(module.elements().moduleInput()).toHaveValue(
  //     'New out of scope'
  //   );
  // });

  // test('It should not show an error if the textArea is empty', async () => {
  //   await module.elements().moduleInput().click();
  //   await module.elements().moduleInput().fill('');
  //   await module.elements().moduleInput().blur();
  //   await expect(module.elements().moduleError()).not.toBeVisible();
  // });

  // test('It should show an error if the textArea is too long', async () => {
  //   await module.elements().moduleInput().click();
  //   await module.elements().moduleInput().fill('a'.repeat(517));
  //   await module.elements().moduleInput().blur();
  //   await expect(module.elements().moduleError()).toBeVisible();
  //   await expect(module.elements().moduleError()).toHaveText(
  //     planPage.i18n.t('__PLAN_OUT_OF_SCOPE_SIZE_ERROR_TOO_LONG')
  //   );
  // });
});
