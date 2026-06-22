import { test, expect } from '../../fixtures/app';
import { Login } from '../../fixtures/pages/Login';

test.describe('OAuth callback', () => {
  test('redirects to login when there is no authenticated session', async ({
    page,
  }) => {
    const login = new Login(page);
    await login.notLoggedIn();

    await page.goto('/callback');

    await expect(page).toHaveURL(/\/login/);
  });
});
