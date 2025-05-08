import { expect, type Page } from '@playwright/test';
import { table } from 'console';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class GenderModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      tab: () => this.page.getByTestId('target-tab'),
      module: () => this.page.getByTestId('gender-module'),
      moduleInput: () => this.elements().module().getByRole('checkbox'),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    const genderCheckbox = this.elements().moduleInput();
    for (let i = 0; i < (await genderCheckbox.count()); i++) {
      await expect(genderCheckbox.nth(i)).toHaveAttribute('disabled', '');
    }
  }
}
