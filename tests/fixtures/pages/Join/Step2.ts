import { Page } from '@playwright/test';

export class Step2 {
  readonly page: Page;

  readonly stepNumber = 2;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      container: () => this.page.getByRole('tabpanel', { name: 'Step 1' }),
      emailInput: () => this.page.getByRole('textbox', { name: 'Email' }),
      passwordInput: () => this.page.getByLabel('Password'),
      backToStep1: () =>
        this.page.getByRole('button', { name: 'SIGNUP_FORM_BACK_TO_STEP_1' }),
      goToStep3: () =>
        this.page.getByRole('button', { name: 'SIGNUP_FORM_GO_TO_STEP_3' }),
    };
  }
}
