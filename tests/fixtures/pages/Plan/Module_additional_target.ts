import { expect, type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class AdditionalTargetModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    const module = this.page.getByTestId('additional-target-module');
    return {
      module: () => module,
      tab: () => this.page.getByTestId('target-tab'),
      moduleError: () => module.getByTestId('additional-target-error'),
      moduleInput: () =>
        module.getByTestId('additional-target-input').getByRole('textbox'),
      aiButton: () =>
        module.getByRole('button', {
          name: this.i18n.t('GENERATE_WITH_AI_CTA_LABEL'),
        }),
      aiModal: () => this.page.getByRole('dialog'),
      aiModalAcceptButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t(
            'PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ACCEPT_BUTTON'
          ),
        }),
    };
  }

  static getAdditionalTargetFromPlan(plan: any) {
    const additionalTargetModule = plan.config.modules.find(
      (module: any) => module.type === 'additional_target'
    );
    if (!additionalTargetModule) {
      throw new Error('No additionalTarget found in plan');
    }
    if (typeof additionalTargetModule.output !== 'string') {
      throw new Error('Invalid additionalTarget module output');
    }
    return additionalTargetModule.output;
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    await expect(this.elements().moduleInput()).toBeVisible();
    await expect(
      this.elements().moduleInput().locator('[contenteditable="true"]')
    ).toBeHidden();
  }
}
