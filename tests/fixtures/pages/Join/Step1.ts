import { Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class Step1 {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      container: () => this.page.getByTestId('step-1'),
      emailInput: () => this.page.getByRole('textbox', { name: 'Email' }),
      emailError: () => this.page.getByTestId('message-error-email'),
      passwordInput: () => this.page.getByRole('textbox', { name: 'Password' }),
      passwordError: () => this.page.getByTestId('message-error-password'),
      buttonGoToStep2: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_GO_TO_STEP_2'),
        }),
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

  async goToNextStepAsInvitedUser() {
    await this.fillValidPassword();
    await this.elements().buttonGoToStep2().click();
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
