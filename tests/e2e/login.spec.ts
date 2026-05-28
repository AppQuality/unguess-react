import { test, expect } from '../fixtures/app';
import { Login } from '../fixtures/pages/Login';

test.describe('Login page - legacy WordPress authentication', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);

    await login.notLoggedIn();
    await login.mockCognitoUserNotFound();
    await login.open();
  });

  test('shows the invalid-credentials toast whenever wpapi getnonce responds with a 403', async ({
    i18n,
  }) => {
    await login.mockGetNonce403();
    await login.fillValidInputs();
    await login.submit();
    await expect(login.elements().errorToast()).toContainText(
      i18n.t('__LOGIN_FORM_INVALID_CREDENTIALS_TOAST').replace(/<\/?bold>/g, '')
    );
  });
});

test.describe('Login page - Cognito authentication', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.notLoggedIn();
  });
});

test.describe('Login page - Continue with Google', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.notLoggedIn();
    await login.open();
  });

  test('displays an enabled Continue with Google button', async () => {
    await expect(login.elements().googleButton()).toBeVisible();
    await expect(login.elements().googleButton()).toBeEnabled();
  });

  test('clicking Continue with Google initiates the Cognito OAuth redirect', async ({
    page,
  }) => {
    await login.mockCognitoOAuthAuthorize();
    const authorizeRequest = page.waitForRequest('**/oauth2/authorize*');
    await login.elements().googleButton().click();
    const req = await authorizeRequest;
    expect(req.url()).toContain('/oauth2/authorize');
    expect(req.url()).toContain('Google');
  });
});
