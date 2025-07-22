import { type Page } from '@playwright/test';

export class AsideNavigation {
  readonly page: Page;

  readonly i18n: any;

  constructor(page: Page, i18n: any) {
    this.page = page;
    this.i18n = i18n;
  }

  elements() {
    return {
      plansNav: () => this.page.getByTestId('plans-nav'),
      addBlockButton: () =>
        this.page
          .getByTestId('plans-nav')
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_ADD_MODULE_BLOCK_BUTTON'),
          }),
      addBlockModal: () => this.page.getByTestId('plans-nav-add-block-dialog'),
    };
  }
}
