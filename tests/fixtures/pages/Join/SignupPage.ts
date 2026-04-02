import { Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class SignupPage {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  signupFormElements() {
    return {
      emailInput: () => this.page.getByRole('textbox', { name: /email/i }),
      emailError: () => this.page.getByTestId('signup-email-error'),
      passwordInput: () =>
        this.page.getByRole('textbox', { name: /password/i }),
      passwordError: () => this.page.getByTestId('signup-password-error'),
      termsCheckbox: () =>
        this.page.getByTestId('terms-and-conditions').getByRole('checkbox'),
      privacyCheckbox: () =>
        this.page.getByTestId('privacy-policy').getByRole('checkbox'),
      submitButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_SUBMIT'),
        }),
      passwordRequirements: () =>
        this.page.getByTestId('password-requirements'),
    };
  }

  confirmEmailFormElements() {
    return {
      codeInput: () =>
        this.page.getByRole('textbox', { name: /Digit 1/i }),
      codeLabel: () =>
        this.page.getByText(this.i18n.t('CONFIRM_EMAIL_CODE_LABEL')),
      codeError: () => this.page.getByTestId('confirm-code-error'),
      confirmButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('CONFIRM_EMAIL_BUTTON'),
        }),
    };
  }

  async fillEmail(email: string) {
    const emailInput = this.signupFormElements().emailInput();
    await emailInput.fill(email);
    await emailInput.blur();
  }

  async fillPassword(password: string) {
    const passwordInput = this.signupFormElements().passwordInput();
    await passwordInput.fill(password);
    await passwordInput.blur();
  }

  async acceptTerms() {
    await this.signupFormElements().termsCheckbox().click({ force: true });
    await this.signupFormElements().privacyCheckbox().click({ force: true });
  }

  async fillValidSignupForm() {
    await this.fillEmail('new.user@example.com');
    await this.fillPassword('ValidPassword123');
    await this.acceptTerms();
  }

  async submitSignupForm() {
    await this.signupFormElements().submitButton().click();
  }

  async fillConfirmationCode(code: string) {
    const codeInput = this.confirmEmailFormElements().codeInput();
    await codeInput.fill(code);
    await codeInput.blur();
  }

  async submitConfirmationCode() {
    await this.confirmEmailFormElements().confirmButton().click();
  }

  // Mock per Cognito signup
  async mockCognitoSignup() {
    // Mock delle chiamate HTTP a Cognito
    // Cognito usa HTTPS POST a cognito-idp.<region>.amazonaws.com
    await this.page.route('**/cognito-idp.*.amazonaws.com/', async (route) => {
      const request = route.request();
      const headers = request.headers();
      const target = headers['x-amz-target'];

      // SignUp operation
      if (target?.includes('SignUp')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/x-amz-json-1.1',
          body: JSON.stringify({
            CodeDeliveryDetails: {
              AttributeName: 'email',
              DeliveryMedium: 'EMAIL',
              Destination: 'n***@e***.com',
            },
            UserConfirmed: false,
            UserSub: 'mock-user-sub-12345',
          }),
        });
      } else {
        await route.fallback();
      }
    });
  }

  // Mock per Cognito confirm signup
  async mockCognitoConfirmSignup() {
    await this.page.route('**/cognito-idp.*.amazonaws.com/', async (route) => {
      const request = route.request();
      const headers = request.headers();
      const target = headers['x-amz-target'];

      // ConfirmSignUp operation
      if (target?.includes('ConfirmSignUp')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/x-amz-json-1.1',
          body: JSON.stringify({}),
        });
      } else {
        await route.fallback();
      }
    });
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
}
