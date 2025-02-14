import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/Plan';

test.describe('The module builder', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftPlan();
    await moduleBuilderPage.open();
  });

  test('has a list of available modules and not others, a save button and a request quote cta', async () => {
    await expect(moduleBuilderPage.elements().titleModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().tasksModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().datesModule()).not.toBeVisible();
    await expect(moduleBuilderPage.elements().submitButton()).toBeVisible();
    await expect(
      moduleBuilderPage.elements().submitButton()
    ).not.toBeDisabled();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().quoteButton()).not.toBeDisabled();
  });
  test('cliccando save button devo chiamare la patch plan', async () => {
    // todo
  });
  test('cliccando request quotation devo chiamare la patch plan, e poi se ok la patch status', async () => {
    // todo
  });
});
