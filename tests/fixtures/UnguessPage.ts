import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class UnguessPage {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance();
  }

  async loggedIn() {
    await this.page.route('*/**/api/users/me', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/me/_get/200_Example_1.json',
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  elements() {
    return {};
  }
}
