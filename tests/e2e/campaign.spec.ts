import { test, expect } from '../fixtures/app';
import { Campaign } from '../fixtures/pages/Campaign';

test.describe('campaign page', () => {
  let campaign: Campaign;

  test.beforeEach(async ({ page }) => {
    campaign = new Campaign(page);

    await campaign.loggedIn();
    await campaign.mockPreferences();
    await campaign.mockWorkspace();
    await campaign.mockExperientialCampaign();
    await campaign.mockWorkspacesList();
    await campaign.open();
  });

  test('the invite users button should be visible', async () => {
    await expect(campaign.elements().inviteUsersButton()).toBeVisible();
  });
});

test.describe('Campaign page on a shared workspace', () => {
  let campaign: Campaign;

  test.beforeEach(async ({ page }) => {
    campaign = new Campaign(page);

    await campaign.loggedIn();
    await campaign.mockPreferences();
    await campaign.mockWorkspace();
    await campaign.mockExperientialCampaign();
    await campaign.mocksharedWorkspacesList();
    await campaign.open();
  });

  test('should hide the invite users button', async () => {
    await expect(campaign.elements().inviteUsersButton()).not.toBeVisible();
  });
});
