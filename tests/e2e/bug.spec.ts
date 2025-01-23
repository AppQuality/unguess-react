import { test, expect } from '../fixtures/app';
import { BugPage } from '../fixtures/Bug';

test.describe('Insights page', () => {
  let bugPage: BugPage;

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

  test('shows the bugPageHeader that shows a breadcrumb and bug id', async () => {
    await expect(bugPage.elements().bugHeader()).toBeVisible();
    await expect(bugPage.elements().bugHeader()).toContainText('Bug ID: 1');
  });
});
