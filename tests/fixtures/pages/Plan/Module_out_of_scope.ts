import { expect, type Page } from '@playwright/test';
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
    const module = this.page.getByTestId('out-of-scope-module');
    return {
      module: () => module,
      tab: () => this.page.getByTestId('instructions-tab'),
      moduleError: () => module.getByTestId('out-of-scope-error'),
      moduleInput: () => module.locator('[role="textbox"]').first(),
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

  static getOutOfScopeFromPlan(plan: any) {
    const outOfScopeModule = plan.config.modules.find(
      (module: any) => module.type === 'out_of_scope'
    );
    if (!outOfScopeModule) {
      throw new Error('No outOfScope found in plan');
    }
    if (typeof outOfScopeModule.output !== 'string') {
      throw new Error('Invalid outOfScope module output');
    }
    return outOfScopeModule.output;
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    const moduleCount = await this.elements().module().count();
    if (moduleCount === 0) {
      return;
    }

    await expect(this.elements().module()).toBeVisible();

    await expect(
      this.elements().module().locator('[contenteditable="true"]')
    ).toHaveCount(0);
  }
}
