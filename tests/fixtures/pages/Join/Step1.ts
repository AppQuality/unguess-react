import { Page } from '@playwright/test';

export class Step1 {
  readonly page: Page;

  readonly stepNumber = 1;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      container: () => this.page.getByRole('tabpanel', { name: 'Step 1' }),
      emailInput: () => this.page.getByRole('textbox', { name: 'Email' }),
      passwordInput: () => this.page.getByLabel('Password'),
      goToStep2: () =>
        this.page.getByRole('tab', { name: 'SIGNUP_FORM_GO_TO_STEP_2' }),
    };
  }

  async mockMailExist({ email }: { email: string }) {
    await this.page.route(`*/**/api/users/by-email/${email}`, async (route) => {
      await route.fulfill({
        body: '{}',
        status: 200,
      });
    });
  }

  async mockMailDoesNotExist({ email }: { email: string }) {
    await this.page.route(`*/**/api/users/by-email/${email}`, async (route) => {
      await route.fulfill({
        body: '{}',
        status: 404,
      });
    });
  }
}
