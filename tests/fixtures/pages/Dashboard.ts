import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';
import apiPromoTemplates from '../../api/workspaces/wid/templates/_get/200_promo.json';
export class Dashboard extends UnguessPage {
  readonly page: Page;
  readonly promoItems = apiPromoTemplates.items;

  readonly url = '/';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      launchNewPJButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__DASHBOARD_CREATE_NEW_PROJECT'),
        }),
      createPJModal: () => {
        this.page.getByRole('dialog', {
          name: this.i18n.t('__DASHBOARD_CREATE_NEW_PROJECT_TITLE'),
        });
      },
      promoList: () =>
        this.page.getByRole('list', { name: 'dashboard-promo-templates' }),
      promoListItems: () => this.elements().promoList().getByRole('listitem'),
      planCreationInterface: () =>
        this.page.getByTestId('plan-creation-interface'),
      moreInfoButton: () =>
        this.elements()
          .planCreationInterface()
          .getByRole('button', {
            name: this.i18n.t('__TEMPLATES_DRAWER_FOOTER_INFO_BUTTON'),
          }),
    };
  }

  async mockPromoTemplates() {
    await this.page.route('*/**/api/workspaces/1/templates*', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/templates/_get/200_promo.json',
      });
    });
  }
}
