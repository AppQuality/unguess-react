import { Page } from '@playwright/test';

export class Step1 {
  readonly page: Page;

  readonly stepNumber = 1;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      container: () => this.page.getByRole('tabpanel'),
      emailInput: () => this.page.getByRole('textbox', { name: 'Email' }),
      passwordInput: () => this.page.getByRole('textbox', { name: 'Password' }),
      buttonGoToStep2: () =>
        this.page.getByRole('tab', { name: 'SIGNUP_FORM_GO_TO_STEP_2' }),
      firstStepContainer: () => this.page.getByTestId('signup-fisrt-step'),
      passwordRequirements: () =>
        this.page.getByTestId('password-requirements'),
      termsLink: () => this.page.getByTestId('terms-and-conditions'),
    };
  }

  expectToBeVisible() {
    const tab = this.elements().container();
    return tab.isVisible();
  }

  async goToNextStep() {
    await this.fillValidEmail();
    await this.fillValidPassword();
    await this.elements().buttonGoToStep2().click();
  }

  async fillPassword(pass: string) {
    const passwordInput = this.elements().passwordInput();
    await passwordInput.fill(pass);
    await passwordInput.blur();
  }

  async fillValidPassword() {
    const passwordInput = this.elements().passwordInput();
    await passwordInput.fill('ValidPassword123');
    await passwordInput.blur();
  }

  async fillEmail(email: string) {
    const emailInput = this.elements().emailInput();
    await emailInput.fill(email);
    await emailInput.blur();
  }

  async fillRegisteredEmail() {
    await this.mockMailExist();
    const emailInput = this.elements().emailInput();
    await emailInput.fill('user.registerd@example.com');
    await emailInput.blur();
  }

  async fillValidEmail() {
    await this.mockMailDoesNotExist();
    const emailInput = this.elements().emailInput();
    await emailInput.fill('new.user@example.com');
    await emailInput.blur();
  }

  async mockMailExist() {
    await this.page.route(
      `*/**/api/users/by-email/user.registerd@example.com`,
      async (route) => {
        await route.fulfill({
          body: '{}',
          status: 200,
        });
      }
    );
  }

  async mockMailDoesNotExist() {
    await this.page.route(
      `*/**/api/users/by-email/new.user@example.com`,
      async (route) => {
        await route.fulfill({
          body: '{}',
          status: 404,
        });
      }
    );
  }
}
