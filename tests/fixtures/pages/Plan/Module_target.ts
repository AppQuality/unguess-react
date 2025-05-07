import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class TargetModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('target-module'),
      moduleError: () => this.elements().module().getByTestId('target-error'),
      moduleInput: () => this.page.getByTestId('target-input'),
    };
  }

  async fillInputTarget(value: string) {
    await this.elements().moduleInput().click();
    await this.elements().moduleInput().fill(value);
    await this.elements().moduleInput().blur();
  }

  static getTargetFromPlan(plan: any): number {
    const targetModule = plan.config.modules.find(
      (module) => module.type === 'target'
    );
    if (!targetModule) {
      throw new Error('No target module found in plan');
    }
    if (typeof targetModule.output !== 'number') {
      throw new Error('Invalid target module output');
    }
    return targetModule.output;
  }
}
