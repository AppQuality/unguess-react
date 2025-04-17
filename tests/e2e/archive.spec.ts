import { test, expect } from '../fixtures/app';
import { Archive } from '../fixtures/pages/Archive';

test.describe('Archive page with some campaigns', () => {
  let archive: Archive;

  test.beforeEach(async ({ page }) => {
    archive = new Archive(page);

    await archive.loggedIn();
    await archive.mockPreferences();
    await archive.mockWorkspace();
    await archive.mockArchive();
    await archive.mockProjectCampaigns();
    await archive.mockWorkspacesList();
    await archive.open();
  });

  test('Should only display the campaigns table', async () => {});
});

test.describe('Archive page without campaigns', () => {
  let archive: Archive;

  test.beforeEach(async ({ page }) => {
    archive = new Archive(page);

    await archive.loggedIn();
    await archive.mockPreferences();
    await archive.mockWorkspace();
    await archive.mockEmptyArchive();
    await archive.mockProjectCampaigns();
    await archive.mockWorkspacesList();
    await archive.open();
  });

  test('Should display an empty state', async () => {
    await expect(archive.elements().emptyState1()).toBeVisible();
    await expect(archive.elements().emptyState2()).toBeVisible();
    await expect(archive.elements().title()).toHaveText(
      archive.emptyArchive.name
    );
  });
});
