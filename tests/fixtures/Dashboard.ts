import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class HomePage extends UnguessPage {
  readonly page: Page;

  readonly url = '/';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      title: () => this.page.getByRole('heading', { level: 1 }),
      launchNewCPButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__DASHBOARD_SKY_JOTFORM_LAUNCH_CP_BUTTON'),
        }),
    };
  }

  async open() {
    await this.page.goto(this.url);
  }
}
