import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class OutOfScopeModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('out-of-scope-module'),
      moduleError: () =>
        this.elements().module().getByTestId('out-of-scope-error'),
      moduleInput: () => this.elements().module().getByRole('textbox'),
    };
  }

  static getOutOfScopeFromPlan(plan: any) {
    const outOfScopeModule = plan.config.modules.find(
      (module) => module.type === 'out_of_scope'
    );
    if (!outOfScopeModule) {
      throw new Error('No outOfScope found in plan');
    }
    const outOfScopeValue = outOfScopeModule.output;
    return outOfScopeValue;
  }
}
