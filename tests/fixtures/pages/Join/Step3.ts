import { Page } from '@playwright/test';

export class Step3 {
  readonly page: Page;

  readonly stepNumber = 3;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      container: () => this.page.getByRole('tabpanel', { name: 'Step 3' }),
      buttonBackToStep2: () =>
        this.page.getByRole('tab', { name: 'SIGNUP_FORM_GO_TO_STEP_2' }),
    };
  }
}
