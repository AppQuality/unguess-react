import { expect, type Page } from '@playwright/test';

export class AgeModule {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('age-module'),
      tab: () => this.page.getByTestId('target-tab'),
      moduleInput: () => this.elements().module().getByRole('checkbox'),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    await this.elements().module().waitFor({ state: 'visible' });
    const bankCheckbox = this.elements().moduleInput();
    const count = await bankCheckbox.count();
    const checks: Promise<void>[] = [];
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      checks.push(expect(bankCheckbox.nth(i)).toHaveAttribute('disabled', ''));
    }
    await Promise.all(checks);
  }
}
