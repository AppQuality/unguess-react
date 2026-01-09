import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import apiPromoTemplates from '../../api/workspaces/wid/templates/_get/200_promo.json';

export class PromoList {
  readonly page: Page;

  readonly i18n: i18n;

  readonly promoItems = apiPromoTemplates.items;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      promoList: () => this.page.getByRole('list', { name: 'promo-templates' }),
      promoListItems: () => this.elements().promoList().getByRole('listitem'),
    };
  }

  async mockPromoTemplates() {
    // Mocks 2 requests:
    // - /workspaces/845/templates?orderBy=order&order=asc&filterBy[isPromo]=1
    // - /workspaces/845/templates?orderBy=order&order=asc
    await this.page.route('*/**/api/workspaces/1/templates*', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/templates/_get/200_promo.json',
      });
    });
  }
}
