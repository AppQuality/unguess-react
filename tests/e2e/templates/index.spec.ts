import { test, expect } from '../../fixtures/app';
import { Templates } from '../../fixtures/Templates';
import getTemplates from '../../api/workspaces/wid/templates/_get/200_global_and_private_templates.json';
// import postPlans from '../../api/workspaces/wid/plans/_post/201_Example_1.json';

test.describe('Templates page', () => {
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
});

test.describe('If i dont have workspace access', () => {
  let templates: Templates;

  test.beforeEach(async ({ page }) => {
    templates = new Templates(page);
    await templates.loggedIn();
    await templates.mockPreferences();
    await templates.mockWorkspace();
    await templates.mocksharedWorkspacesList();
    await templates.mockGetTemplates();
    await templates.mockGetProjects();
    await templates.mockPostPlans();
  });

  test('I should not see the menu item', async ({ page }) => {
    await page.goto('/');
    // await expect(templates.elements().menuTemplates()).not.toBeVisible();
  });

  test('The Templates page should redirect to the 404 /oops', async ({
    page,
  }) => {
    await templates.open();
    await expect(page).toHaveURL(/\/oops/);
  });
});

/**
 *
 * - se ho accesso di livello workspace vedo la lista altrimenti Oops (anche la voce di menù)
 * - elenco di card divise per tue e globali, potresti non avere le tue
 * - i globali sono quelli senza workspace id, gli altri sono tailored
 * - il tag user prende i dati dalla config, modulo target (opzionale)
 */
