import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class VideoPage extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `campaigns/1/videos/1`;
  }

  elements() {
    return {
      ...super.elements(),
      paragraphContent: () =>
        this.page.getByTestId('transcript-paragraph').locator('.content'),
      sentimentWrapper: () => this.page.getByTestId('transcript-sentiment'),
      sentimentItem: () =>
        this.page
          .getByTestId('transcript-sentiment')
          .locator('[data-garden-id="tags.tag_view"]'),
    };
  }

  async mockGetCampaign() {
    await this.page.route('*/**/api/campaigns/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/_get/200_Example_1.json',
      });
    });
  }

  async mockGetVideo() {
    await this.page.route('*/**/api/videos/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/videos/vid/_get/200_consistency_paragraphs_sentiments.json',
      });
    });
  }

  async mockGetVideoObservations() {
    await this.page.route('*/**/api/videos/1/observations', async (route) => {
      await route.fulfill({
        path: 'tests/api/videos/vid/observations/_get/200_Example_1.json',
      });
    });
  }
}
