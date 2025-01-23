import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class BugPage extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = 'campaigns/1/bugs/1';
  }

  elements() {
    return {
      ...super.elements(),
      bugHeader: () => this.page.getByTestId('page-header'),
      bugContainer: () => this.page.locator('#container'),
    };
  }

  async mockBug() {
    await this.page.route('*/**/api/campaigns/1/bugs/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/bugs/bid/_get/200_bug.json',
      });
    });
  }

  async mockBugs() {
    await this.page.route('*/**/api/campaigns/1/bugs', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/bugs/_get/200_allbugs.json',
      });
    });
  }

  async mockCustomStatuses() {
    await this.page.route(
      '*/**/api/campaigns/1/custom_statuses',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/custom_statuses/_get/200_custom_statuses.json',
        });
      }
    );
  }

  async mockSeverities() {
    await this.page.route('*/**/api/campaigns/1/severities', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/severities/_get/200_severities.json',
      });
    });
  }

  async mockUsecases() {
    await this.page.route(
      '*/**/api/campaigns/1/usecases?filterBy=bugs',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/usecases/_get/200_usecases_filterByBugs.json',
        });
      }
    );
  }

  async mockBugtypes() {
    await this.page.route('*/**/api/campaigns/1/bugTypes', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/bugTypes/_get/200_bugtypes.json',
      });
    });
  }
}
