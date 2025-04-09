import { test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';

test.describe('The tasks module defines a list of activities.', () => {
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

  test('It should have an output of an array of task objects, and it is required to have at least 1 item to Request a Quote', async () => {
    // Todo
  });

  test(`The single task object have mandatory kind radio/select (bug, video or survey),
        a mandatory title input text,
        and an optional description text area`, async () => {
    // Todo
  });
  test('It should have a list of tasks that show the value of the module', async () => {});
  test('There should be a cta to add a task that append an empty task to the list. No limits', async () => {});
  test('There should be a cta to remove a task that remove the item from the list', async () => {});
});
