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
    await bugPage.mockBugDifferentMediaCreationDates();
    await bugPage.open();
  });

  test('shows the two grouped media titles containing different creation dates', async () => {
    await expect(bugPage.elements().filtersDetailsButton()).not.toBeVisible();
    await expect(bugPage.elements().usecaseSelect()).not.toBeVisible();
    await expect(bugPage.elements().pagination()).not.toBeVisible();
    const locator = bugPage.elements().uploadedMediaDateTitle();
    await expect(locator).toHaveCount(2);
    const titles = await locator.allTextContents();
    expect(titles[0]).not.toEqual(titles[1]);
    await expect(locator.nth(0)).toHaveCSS('font-size', '14px');
    await expect(locator.nth(1)).toHaveCSS('font-size', '14px');
  });
});
