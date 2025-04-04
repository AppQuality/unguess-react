import { test, expect } from '../../fixtures/app';
import { BugPage } from '../../fixtures/pages/Bug';

test.describe('Bug page', () => {
  let bugPage: BugPage;

  // open json mocked response

  test.beforeEach(async ({ page }) => {
    bugPage = new BugPage(page);
    await bugPage.loggedIn();
    await bugPage.mockPreferences();
    await bugPage.mockWorkspace();
    await bugPage.mockWorkspacesList();
    await bugPage.mockFunctionalCampaign();
    await bugPage.mockCustomStatuses();
    await bugPage.mockSeverities();
    await bugPage.mockUsecases();
    await bugPage.mockBugtypes();
    await bugPage.mockBugs();
    await bugPage.mockBug();
    await bugPage.open();
  });

  test('shows the page header with a breadcrumb to go back to the buglist and bug id as title', async () => {
    await expect(bugPage.elements().pageHeader()).toBeVisible();
    await expect(bugPage.elements().breadcrumb()).toBeVisible();
    await expect(bugPage.elements().linkToBugCollection()).toHaveAttribute(
      'href',
      '/campaigns/4997/bugs/'
    );
    await expect(bugPage.elements().pageHeader()).toContainText(
      `Bug ID: ${bugPage.bugIds.default}`
    );
  });

  test('does not show the full header with filter recap and pagination', async () => {
    await expect(bugPage.elements().filtersDetailsButton()).not.toBeVisible();
    await expect(bugPage.elements().usecaseSelect()).not.toBeVisible();
    await expect(bugPage.elements().pagination()).not.toBeVisible();
  });
});
