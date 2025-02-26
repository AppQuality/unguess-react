import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';

test.describe('The title module defines the Plan title.', () => {
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

  test('It should have an output of a string, and it is required to Request a Quote', async () => {
    // Todo
  });

  test('It should have a text input that show the value of the module', async () => {
    // Todo
  });
});
