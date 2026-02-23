import { expect, type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class GoalModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    const module = this.page.locator('[data-qa="plan_page_module_goal"]');
    return {
      module: () => module,
      tab: () => this.page.getByTestId('setup-tab'),
      moduleError: () => module.locator('[data-qa="goal-error"]'),
      moduleInput: () =>
        module
          .locator('[data-qa="goal-input"]')
          .locator('[contenteditable="true"]'),
      aiButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('GENERATE_WITH_AI_CTA_LABEL'),
        }),
      aiModal: () => this.page.locator('[role="dialog"]'),
      aiModalAcceptButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t(
            'PLAN_PAGE_MODULE_GOAL_AI_SUGGESTION_ACCEPT_BUTTON'
          ),
        }),
    };
  }

  static getGoalFromPlan(plan: any) {
    const goalModule = plan.config.modules.find(
      (module: any) => module.type === 'goal'
    );
    if (!goalModule) {
      throw new Error('No goal found in plan');
    }
    if (typeof goalModule.output !== 'string') {
      throw new Error('Invalid goal module output');
    }
    return goalModule.output;
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    await expect(this.elements().moduleInput()).not.toBeEditable();
  }
}
