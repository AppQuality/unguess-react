import { expect, type Page } from '@playwright/test';
import { PlanModule } from '.';

export class AgeModule implements PlanModule {
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
    const ageCheckbox = this.elements().moduleInput();
    for (let i = 0; i < (await ageCheckbox.count()); i++) {
      await expect(ageCheckbox.nth(i)).toHaveAttribute('disabled', '');
    }
  }
}
