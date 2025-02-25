import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class Templates extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `workspaces/1/templates`;
  }

  elements() {
    return {
      ...super.elements(),
    };
  }

  async mockGetTemplatesList() {
    await this.page.route('*/**/api/workspaces/1/templates', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/templates/_get/200_list.json',
      });
    });
  }
}
