import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';
import apiPromoTemplates from '../../api/workspaces/wid/templates/_get/200_promo.json';

export class Project extends UnguessPage {
  readonly page: Page;

  readonly promoItems = apiPromoTemplates.items;

  readonly url = 'projects/1';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
    };
  }

  async mockEmptyProject() {
    await this.page.route('*/**/api/projects/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/pid/_get/200_Example_1.json',
      });
    });
  }
}
