import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';

test.describe('The date module', () => {
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

  test('should have 3 variants', async () => {
    // Todo
  });
  test('should save a default value of today for the start date, and today +5gg for the end date', async () => {
    // Todo
  });
  test('should format the date correctly', async () => {
    // Todo
  });
});
