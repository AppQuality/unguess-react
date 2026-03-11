import { Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import validInvitedUser from '../../../api/invites/profile/token/_get/200_Example_1.json';

export class InvitedUserPage {
  readonly page: Page;

  readonly i18n: i18n;

  readonly profileId = '1';

  readonly token = 'token123';

  readonly validInvitedUser = validInvitedUser;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  get url() {
    return `/join/invites/${this.profileId}/${this.token}`;
  }

  elements() {
    return {
      // Error state
      errorState: () => this.page.getByTestId('join-page-error'),

      // SetPasswordForm elements
      emailDisplay: () => this.page.getByRole('textbox', { name: /email/i }),
      passwordInput: () =>
        this.page.getByPlaceholder(this.i18n.t('SET_PASSWORD_PLACEHOLDER')),
      passwordError: () => this.page.getByTestId('set-password-error'),
      confirmPasswordInput: () =>
        this.page.getByPlaceholder(this.i18n.t('CONFIRM_PASSWORD_PLACEHOLDER')),
      confirmPasswordError: () =>
        this.page.getByTestId('confirm-password-error'),
      passwordRequirements: () =>
        this.page.getByTestId('password-requirements'),
      submitButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SET_PASSWORD_BUTTON'),
        }),
    };
  }

  async fillPassword(password: string) {
    const passwordInput = this.elements().passwordInput();
    await passwordInput.fill(password);
    await passwordInput.blur();
  }

  async fillConfirmPassword(password: string) {
    const confirmPasswordInput = this.elements().confirmPasswordInput();
    await confirmPasswordInput.fill(password);
    await confirmPasswordInput.blur();
  }

  async fillValidPasswordForm() {
    await this.fillPassword('ValidPassword123');
    await this.fillConfirmPassword('ValidPassword123');
  }

  async submitForm() {
    await this.elements().submitButton().click();
  }

  // Mock per GET invites - success
  async mockGetInvitedUser() {
    await this.page.route(
      `*/**/api/invites/${this.profileId}/${this.token}`,
      async (route) => {
        if (route.request().method() === 'GET') {
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            path: 'tests/api/invites/profile/token/_get/200_Example_1.json',
          });
        } else {
          await route.fallback();
        }
      }
    );
  }

  // Mock per GET invites - error
  async mockGetInvitedUserError() {
    await this.page.route(
      `*/**/api/invites/${this.profileId}/${this.token}`,
      async (route) => {
        if (route.request().method() === 'GET') {
          await route.fulfill({
            status: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Invalid invite' }),
          });
        } else {
          await route.fallback();
        }
      }
    );
  }

  // Mock Cognito (signup, login e get user)
  async mockCompleteCognitoFlow() {
    // Valid JWT tokens for mocking
    const mockIdToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const mockAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    await this.page.route('**/cognito-idp.*.amazonaws.com/', async (route) => {
      const request = route.request();
      const headers = request.headers();
      const target = headers['x-amz-target'];

      // SignUp operation
      if (target?.includes('SignUp')) {
        await route.fulfill({
          status: 200,
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'x-amzn-RequestId': 'mock-request-id',
          },
          body: JSON.stringify({
            CodeDeliveryDetails: {
              AttributeName: 'email',
              DeliveryMedium: 'EMAIL',
              Destination: 'j***@e***.com',
            },
            UserConfirmed: true,
            UserSub: 'mock-invited-user-sub-12345',
          }),
        });
        return;
      }

      // InitiateAuth operation (login with SRP)
      if (target?.includes('InitiateAuth')) {
        const body = await request.postData();

        // Check if it's SRP auth flow
        if (body?.includes('USER_SRP_AUTH')) {
          // Return challenge for SRP (first step)
          // All these values must be valid base64 strings
          await route.fulfill({
            status: 200,
            headers: {
              'Content-Type': 'application/x-amz-json-1.1',
              'x-amzn-RequestId': 'mock-request-id',
            },
            body: JSON.stringify({
              ChallengeName: 'PASSWORD_VERIFIER',
              ChallengeParameters: {
                SALT: 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=',
                SECRET_BLOCK:
                  'U2VjcmV0QmxvY2tNb2NrRGF0YVRoYXRJc0Jhc2U2NEVuY29kZWQ=',
                SRP_B: 'VGhpc0lzQU1vY2tTUlBCVmFsdWVJbkJhc2U2NEZvcm1hdA==',
                USERNAME: this.validInvitedUser.email,
                USER_ID_FOR_SRP: this.validInvitedUser.email,
              },
              Session: 'mock-session-token',
            }),
          });
          return;
        }

        // For non-SRP auth, return tokens directly
        await route.fulfill({
          status: 200,
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'x-amzn-RequestId': 'mock-request-id',
          },
          body: JSON.stringify({
            AuthenticationResult: {
              AccessToken: mockAccessToken,
              IdToken: mockIdToken,
              RefreshToken: 'mock-invited-refresh-token',
              ExpiresIn: 3600,
              TokenType: 'Bearer',
            },
            ChallengeParameters: {},
          }),
        });
        return;
      }

      // RespondToAuthChallenge (SRP second step)
      if (target?.includes('RespondToAuthChallenge')) {
        await route.fulfill({
          status: 200,
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'x-amzn-RequestId': 'mock-request-id',
          },
          body: JSON.stringify({
            AuthenticationResult: {
              AccessToken: mockAccessToken,
              IdToken: mockIdToken,
              RefreshToken: 'mock-invited-refresh-token',
              ExpiresIn: 3600,
              TokenType: 'Bearer',
            },
          }),
        });
        return;
      }

      // GetUser operation (chiamato dopo login per ottenere dettagli utente)
      if (target?.includes('GetUser')) {
        await route.fulfill({
          status: 200,
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'x-amzn-RequestId': 'mock-request-id',
          },
          body: JSON.stringify({
            Username: this.validInvitedUser.email,
            UserAttributes: [
              { Name: 'sub', Value: 'mock-invited-user-sub-12345' },
              { Name: 'email', Value: this.validInvitedUser.email },
              { Name: 'email_verified', Value: 'true' },
              { Name: 'name', Value: this.validInvitedUser.name },
            ],
            UserStatus: 'CONFIRMED',
          }),
        });
        return;
      }

      await route.fallback();
    });
  }

  // Mock per users/me dopo il login
  async mockAuthenticatedUserWithPendingOnboarding() {
    await this.page.route('*/**/api/users/me', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 1,
            email: this.validInvitedUser.email,
            name: this.validInvitedUser.name,
            surname: this.validInvitedUser.surname,
            onboarding_pending: true,
          }),
        });
      } else {
        await route.fallback();
      }
    });
  }
}
