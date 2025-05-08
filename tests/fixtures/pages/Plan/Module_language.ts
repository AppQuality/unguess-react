import { expect, type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class LanguageModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      tab: () => this.page.getByTestId('target-tab'),
      module: () => this.page.getByTestId('language-module'),
      languageRadioInput: () => this.elements().module().getByRole('radio'),
    };
  }

  static getLanguageFromPlan(plan: any) {
    const languageModule = plan.config.modules.find(
      (module) => module.type === 'language'
    );
    if (!languageModule) {
      throw new Error('No language module found in plan');
    }
    if (!(typeof languageModule.output === 'string')) {
      throw new Error('Invalid language module output');
    }
    const language = languageModule.output;
    return language;
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    const languageRadioInputs = this.elements().languageRadioInput();
    for (let i = 0; i < (await languageRadioInputs.count()); i++) {
      await expect(languageRadioInputs.nth(i)).toHaveAttribute('disabled', '');
    }
  }
}
