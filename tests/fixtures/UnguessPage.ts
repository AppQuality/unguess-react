import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class UnguessPage {
  readonly page: Page;

  readonly i18n: i18n;

  url = '/';

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance();
  }

  async open() {
    await this.page.goto(this.url);
  }

  async loggedIn() {
    await this.page.route('*/**/api/users/me', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/me/_get/200_Example_1.json',
      });
    });
  }

  async mockWorkspace() {
    await this.page.route('*/**/api/workspaces/38', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/_get/200_demo_internal.json',
      });
    });
  }

  async mockWorkspacesList() {
    await this.page.route('*/**/api/workspaces', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/_get/200_ordeby_company.json',
      });
    });
  }

  async insideWorkspace() {
    await this.mockWorkspacesList();
    await this.mockWorkspace();
  }

  // eslint-disable-next-line class-methods-use-this
  elements() {
    return {
      title: () => this.page.getByRole('heading', { level: 1 }),
    };
  }
}
