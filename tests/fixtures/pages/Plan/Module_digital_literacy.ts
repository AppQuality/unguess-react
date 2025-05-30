import { expect, type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class DigitalLiteracyModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      tab: () => this.page.getByTestId('target-tab'),
      module: () => this.page.getByTestId('digital-literacy-module'),
      moduleInput: () => this.elements().module().getByRole('checkbox'),
      digitalLiteracyModuleErrorMessage: () =>
        this.page.getByTestId('literacy-error'),
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
    const digitalLiteracyCheckbox = this.elements().moduleInput();
    const count = await digitalLiteracyCheckbox.count();
    const checks: Promise<void>[] = [];
    for (let i = 0; i < count; i += 1) {
      checks.push(
        expect(digitalLiteracyCheckbox.nth(i)).toHaveAttribute('disabled', '')
      );
    }
    await Promise.all(checks);
  }
}
