import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class Campaign extends UnguessPage {
  readonly page: Page;

  readonly url = 'campaigns/1';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      inviteUsersButton: () =>
        this.page
          .getByRole('button')
          .filter({ hasText: this.i18n.t('__CAMPAIGN_SETTINGS_CTA_TEXT') }),
    };
  }
}
