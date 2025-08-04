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
    return {
      module: () => this.page.getByTestId('plan_page_module_goal'),
      tab: () => this.page.getByTestId('setup-tab'),
      moduleError: () => this.elements().module().getByTestId('goal-error'),
      moduleInput: () => this.elements().module().getByRole('textbox'),
    };
  }

  static getGoalFromPlan(plan: any) {
    const goalModule = plan.config.modules.find(
      (module) => module.type === 'goal'
    );
    if (!goalModule) {
      throw new Error('No goal found in plan');
    }
    if (!(typeof goalModule.output === 'string')) {
      throw new Error('Invalid goal module output');
    }
    const goalValue = goalModule.output;
    return goalValue;
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    await expect(this.elements().moduleInput()).toHaveAttribute('readonly', '');
  }
}
