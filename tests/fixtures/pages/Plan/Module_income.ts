import { expect, type Page } from '@playwright/test';

export class IncomeModule {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('income-module'),
      tab: () => this.page.getByTestId('target-tab'),
      moduleInput: () => this.elements().module().getByRole('checkbox'),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    const incomeCheckbox = this.elements().moduleInput();
    const count = await incomeCheckbox.count();
    const checks: Promise<void>[] = [];
    for (let i = 0; i < count; i += 1) {
      checks.push(
        expect(incomeCheckbox.nth(i)).toHaveAttribute('disabled', '')
      );
    }
    await Promise.all(checks);
  }
}
