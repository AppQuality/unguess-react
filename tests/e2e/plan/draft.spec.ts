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
    await moduleBuilderPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await moduleBuilderPage.open();
  });

  test('has a list of saved modules and not the others, a save button and a request quote cta', async () => {
    await expect(moduleBuilderPage.elements().titleModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().tasksModule()).not.toBeVisible();
    await expect(moduleBuilderPage.elements().datesModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().submitButton()).toBeVisible();
    await expect(
      moduleBuilderPage.elements().descriptionModule()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().submitButton()
    ).not.toBeDisabled();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().quoteButton()).not.toBeDisabled();
  });
  test('Clicking save button calls the PATCH Plan', async () => {
    // todo
  });
  test('Clicking request quotation calls the PATCH Plan, then if ok the PATCH Status', async () => {
    // todo
  });
});
