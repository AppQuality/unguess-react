import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class PublicBugPage extends UnguessPage {
  readonly page: Page;

  readonly bugId: string;

  readonly defectId: string;

  readonly token: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.bugId = '274852';
    this.defectId = '2805';
    this.token = 'e0985e5a713095c9866638e2335a0736'; // md5 hash of the defectId

    this.url = `defect/${this.defectId}/${this.token}`;
  }

  elements() {
    return {
      ...super.elements(),
      pageHeader: () => this.page.getByTestId('public-bug-page-header'),
      bugContainer: () => this.page.getByTestId('public-bug-container-card'),
      campaignInfo: () => this.page.getByTestId('public-bug-campaign-info'),
    };
  }

  async mockGetPublicBugData() {
    await this.page.route(
      `*/**/api/public/bugs/${this.defectId}/tokens/${this.token}`,
      async (route) => {
        await route.fulfill({
          path: 'tests/api/public/bugs/defectId/tokens/token/_get/200_Example_1.json',
        });
      }
    );
  }

  async mockBug() {
    await this.page.route(
      '*/**/api/campaigns/22222/bugs/11111',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_274852.json',
        });
      }
    );
  }
}
