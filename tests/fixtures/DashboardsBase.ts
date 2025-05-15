import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import { UnguessPage } from './UnguessPage';

// This is a base class for the various dashboard pages.
// It contains common methods and properties that can be used by the
// specific dashboard pages that extend this class, like Insights, Bugs and Video.
export class DashboardBase extends UnguessPage {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
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
