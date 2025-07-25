import { test, expect } from '../../fixtures/app';
import { PublicBugPage } from '../../fixtures/pages/BugPublic';

test.describe('Public Bug page - logged in', () => {
  let publicBugPage: PublicBugPage;

  test.beforeEach(async ({ page }) => {
    publicBugPage = new PublicBugPage(page);
    //
    await publicBugPage.loggedIn();
    await publicBugPage.mockWorkspacesList();
    //
    await publicBugPage.mockGetPublicBugData();
    await publicBugPage.mockBug();
    await publicBugPage.open();
  });

  test('Shows the page header and bug container card', async () => {
    await expect(publicBugPage.elements().pageHeader()).toBeVisible();
    await expect(publicBugPage.elements().bugContainer()).toBeVisible();
  });

  // test('does not show the full header with filter recap and pagination', async () => {
  //   await expect(bugPage.elements().filtersDetailsButton()).not.toBeVisible();
  //   await expect(bugPage.elements().usecaseSelect()).not.toBeVisible();
  //   await expect(bugPage.elements().pagination()).not.toBeVisible();
  // });
});
