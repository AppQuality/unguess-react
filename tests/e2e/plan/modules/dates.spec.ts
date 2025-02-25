import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';

test.describe('The date module defines when the user is ready to be tested.', () => {
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

  test('It should have an output of one date, the start date, and it is required to Request a Quote', async () => {
    // Todo
  });

  test('The "default variant" set a date at least one day in the future, except weekends', async () => {
    // Todo
  });

  test('The "free variant" can set whatever date', async () => {
    // Todo
  });

  test('you can change variant only if the use has the MODULES_CHANGE_ALL_VARIANTS feature flag.', async () => {
    // Todo
  });

  test("il formato della data deve comprendere anche l'ora (default le 9?) e in formato ISO", async () => {
    // Todo
  });

  test('It should have a datepicker that show the value of the module', async () => {
    // Todo
  });
});
