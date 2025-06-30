import { expect, type Page } from '@playwright/test';

export class ElectricityModule {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('electricity-module'),
      tab: () => this.page.getByTestId('target-tab'),
      moduleCheckboxes: () => this.elements().module().getByRole('checkbox'),
      otherElementTextArea: () =>
        this.elements()
          .module()
          .locator('textarea[name="other-electricity-name"]'),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    await this.elements().module().waitFor({ state: 'visible' });
    const ageCheckbox = this.elements().moduleCheckboxes();
    const count = await ageCheckbox.count();
    const checks: Promise<void>[] = [];
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      checks.push(expect(ageCheckbox.nth(i)).toHaveAttribute('disabled', ''));
    }
    checks.push(
      expect(this.elements().otherElementTextArea()).toHaveAttribute(
        'readonly',
        ''
      )
    );
    await Promise.all(checks);
  }
}
