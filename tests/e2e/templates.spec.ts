import { test } from '../fixtures/app';
import { Templates } from '../fixtures/Templates';

test.describe('Templates page', () => {
  let templates: Templates;

  test.beforeEach(async ({ page }) => {
    templates = new Templates(page);
    await templates.loggedIn();
    await templates.mockPreferences();
    await templates.mockWorkspace();
    await templates.mockWorkspacesList();
    await templates.mockGetTemplatesList();
    await templates.open();
  });
  test('has title', async () => {
    // Todo
  });

  test('has a list of templates from the api', async () => {
    // Todo
  });

  test('clicking on a single template should call the POST template', async () => {
    // Todo
  });

  test('after clicking on a single template should redirect to the page to edit the newly created plan', async () => {
    // Todo
  });
});
