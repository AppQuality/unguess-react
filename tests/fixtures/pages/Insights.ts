import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';
import { DashboardBase } from '../DashboardsBase';

export class Insights extends DashboardBase {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = 'campaigns/1/insights';
  }

  elements() {
    return {
      ...super.elements(),
      openDrawerButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__INSIGHTS_PAGE_OPEN_DRAWER_BUTTON'),
        }),
      closeDrawerButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__INSIGHTS_PAGE_CLOSE_DRAWER_BUTTON'),
        }),
      drawer: () =>
        this.page.getByRole('list', {
          name: this.i18n.t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_TITLE'),
        }),
      insights: () => this.elements().drawer().getByRole('listitem'),
    };
  }

  async showSavedInsightsSection() {
    await this.elements().openDrawerButton().click();
  }

  async hideSavedInsightsSection() {
    await this.elements().closeDrawerButton().click();
  }

  async mockInsights() {
    await this.page.route('*/**/api/campaigns/1/insights', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/insights/_get/200_Example_1.json',
      });
    });
  }
}
