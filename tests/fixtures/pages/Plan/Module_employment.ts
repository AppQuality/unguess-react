import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class EmploymentModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      tab: () => this.page.getByTestId('target-tab'),
      module: () => this.page.getByTestId('employment-module'),
      moduleError: () =>
        this.elements().module().getByTestId('employment-error'),
      moduleInput: () => this.page.getByTestId('employment-input'),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }
}
