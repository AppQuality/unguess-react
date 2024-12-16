import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class Dashboard extends UnguessPage {
  readonly page: Page;

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
    };
  }
}
