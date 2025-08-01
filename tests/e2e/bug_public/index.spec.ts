import { test, expect } from '../../fixtures/app';
import { PublicBugPage } from '../../fixtures/pages/BugPublic';

test.describe('Public Bug page - logged in', () => {
  let publicBugPage: PublicBugPage;

  test.beforeEach(async ({ page }) => {
    publicBugPage = new PublicBugPage(page);
    await publicBugPage.loggedIn();
    await publicBugPage.mockWorkspacesList();
    await publicBugPage.mockGetPublicBugData();
    await publicBugPage.mockBug();
    await publicBugPage.open();
  });

  test('Shows the page header and bug container card', async () => {
    await expect(publicBugPage.elements().pageHeader()).toBeVisible();
    await expect(publicBugPage.elements().bugContainer()).toBeVisible();
  });
  test('Renders properly campaigns Id and title', async () => {
    // Campaign ID
    await expect(publicBugPage.elements().campaignInfo()).toContainText(
      'Activity ID 22222'
    );
    // Campaign Title
    await expect(publicBugPage.elements().campaignInfo()).toContainText(
      'Campaign Customer Title'
    );
  });
});

test.describe('Public Bug page - logged out', () => {
  let publicBugPage: PublicBugPage;

  test.beforeEach(async ({ page }) => {
    publicBugPage = new PublicBugPage(page);
    await publicBugPage.mockGetPublicBugData();
    await publicBugPage.mockBug();
    await publicBugPage.open();
  });

  test('Shows the page header and bug container card', async () => {
    await expect(publicBugPage.elements().pageHeader()).toBeVisible();
    await expect(publicBugPage.elements().bugContainer()).toBeVisible();
  });

  test('Renders properly campaigns Id and title', async () => {
    // Campaign ID
    await expect(publicBugPage.elements().campaignInfo()).toContainText(
      'Activity ID 22222'
    );
    // Campaign Title
    await expect(publicBugPage.elements().campaignInfo()).toContainText(
      'Campaign Customer Title'
    );
  });
});
