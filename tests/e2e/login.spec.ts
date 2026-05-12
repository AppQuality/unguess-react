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

  test('shows a generic error toast whenever wpapi login responds with a 403', async ({
    i18n,
  }) => {
    await login.mockGetNonce200();
    await login.mockLogin403();
    await login.fillValidInputs();
    await login.submit();
    await expect(login.elements().errorToast()).toContainText(
      `Login: ${i18n.t('__TOAST_GENERIC_ERROR_MESSAGE')}`
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
