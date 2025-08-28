import { log } from 'console';
import { test, expect } from '../fixtures/app';
import { Login } from '../fixtures/pages/Login';

test.describe('Login page', () => {
  let login: Login;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);

    await login.notLoggedIn();
    await login.open();
  });
  test('shows a generic error toast whenever wpapi getnonce responds with a 403', async ({
    i18n,
  }) => {
    await login.mockGetNonce403();
    await login.fillValidInputs();
    await login.submit();
    await expect(login.elements().errorToast()).toContainText(
      'Get Nonce: ' + i18n.t('__TOAST_GENERIC_ERROR_MESSAGE')
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
      'Login: ' + i18n.t('__TOAST_GENERIC_ERROR_MESSAGE')
    );
  });
});
