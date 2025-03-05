import { test, expect } from '../../fixtures/app';
import { Templates } from '../../fixtures/Templates';
import getTemplates from '../../api/workspaces/wid/templates/_get/200_global_and_private_templates.json';
import postPlans from '../../api/workspaces/wid/plans/_post/201_Example_1.json';

test.describe('The module builder', () => {
  let templates: Templates;

  test.beforeEach(async ({ page }) => {
    templates = new Templates(page);
    await templates.loggedIn();
    await templates.mockPreferences();
    await templates.mockWorkspace();
    await templates.mockWorkspacesList();
    await templates.mockGetTemplates();
    await templates.mockGetProjects();
    await templates.mockPostPlans();
    await templates.open();
  });

  test('Should contain a number of cards equal to the number of templates', async () => {
    await expect(templates.elements().templateCard()).toHaveCount(
      getTemplates.items.length
    );
  });

  test('Should redirect to the plan page once the template button is clicked', async ({
    page,
  }) => {
    // todo: add a test to check if the button is clicked and the page is redirected
  });
});
