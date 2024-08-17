import { test, expect } from '../fixtures/app';
import { Insights } from '../fixtures/Insights';
import insightsData from '../api/campaigns/cid/insights/_get/200_Example_1.json';

test.describe('Insights page', () => {
  let insightsPage: Insights;

  test.beforeEach(async ({ page }) => {
    insightsPage = new Insights(page);
    await insightsPage.loggedIn();
    await insightsPage.insideWorkspace();
    await insightsPage.mockCampaign();
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
});
