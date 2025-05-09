import { test, expect } from '../fixtures/app';
import { Insights } from '../fixtures/pages/Insights';
import insightsData from '../api/campaigns/cid/insights/_get/200_Example_1.json';

test.describe('Insights page', () => {
  let insightsPage: Insights;

  test.beforeEach(async ({ page }) => {
    insightsPage = new Insights(page);
    await insightsPage.loggedIn();
    await insightsPage.mockPreferences();
    await insightsPage.mockWorkspace();
    await insightsPage.mockWorkspacesList();
    await insightsPage.mockExperientialCampaign();
    await insightsPage.mockInsights();
    await insightsPage.open();
  });

  test('has a drawer button that open a sidebar with saved insights', async () => {
    await insightsPage.showSavedInsightsSection();
    const drawer = insightsPage.elements().drawer();
    await expect(drawer).toBeVisible();
    expect(await insightsPage.elements().insights().count()).toBe(
      insightsData.length
    );
  });

  test('should display a invite users btn', async () => {
    await expect(insightsPage.elements().inviteUsersButton()).toBeVisible();
  });
});

test.describe('Insights page on a shared workspace', () => {
  let insightsPage: Insights;

  test.beforeEach(async ({ page }) => {
    insightsPage = new Insights(page);
    await insightsPage.loggedIn();
    await insightsPage.mockPreferences();
    await insightsPage.mockWorkspace();
    await insightsPage.mockExperientialCampaign();
    await insightsPage.mocksharedWorkspacesList();
    await insightsPage.open();
  });

  test('should hide the invite users button', async () => {
    await expect(insightsPage.elements().inviteUsersButton()).not.toBeVisible();
  });
});
