import { test, expect } from '../fixtures/app';
import { Insights } from '../fixtures/Insights';

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
    await expect(insightsPage.elements().drawer()).toBeVisible();
  });
});
