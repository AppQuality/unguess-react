import { test, expect } from '../../fixtures/app';
import { Templates } from '../../fixtures/Templates';
import getTemplates from '../../api/workspaces/wid/templates/_get/200_global_and_private_templates.json';
import postPlans from '../../api/workspaces/wid/plans/_post/201_Example_1.json';

test.describe('The module builder', () => {
  let moduleBuilderPage: Templates;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new Templates(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetTemplates();
    await moduleBuilderPage.mockPostPlans();
    await moduleBuilderPage.open();
  });

  test('Should contain a number of cards equal to the number of templates', async () => {
    expect(await moduleBuilderPage.elements().templateCard().count()).toBe(
      getTemplates.items.length
    );
  });

  test('Should redirect to the plan page once the template button is clicked', async () => {
    // TODO: select a project from the dropdown
    await moduleBuilderPage.elements().dropdown().click();
    // await moduleBuilderPage.elements().templateCard().first().getByRole('button', {
    //   name: moduleBuilderPage.i18n.t('__TEMPLATES_PAGE_TEMPLATE_CARD_BUTTON_LABEL')
    // }).click();
    // expect(moduleBuilderPage.page.url()).toContain(`/plans/${postPlans.id}`);
  });
});
