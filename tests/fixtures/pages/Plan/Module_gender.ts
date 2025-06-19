import { expect, type Page } from '@playwright/test';
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
      modulepercentageInput: () =>
        this.elements().module().getByRole('textbox'),
      moduleError: () =>
        this.elements().module().getByTestId('gender-error-message'),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    const genderCheckbox = this.elements().moduleInput();
    const count = await genderCheckbox.count();
    const checks: Promise<void>[] = [];
    for (let i = 0; i < count; i += 1) {
      checks.push(
        expect(genderCheckbox.nth(i)).toHaveAttribute('disabled', '')
      );
    }
    await Promise.all(checks);
  }
}
