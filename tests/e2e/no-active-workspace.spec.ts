import { test, expect } from '../fixtures/app';

const loggedInUser = {
  id: 1,
  email: 'test.user@example.com',
  name: 'Test User',
  profile_id: 32,
  role: 'administrator',
};

const emptyWorkspaces = { items: [], limit: 25, size: 0, start: 0, total: 0 };

test.describe('No active workspace state', () => {
  test('logout routes through the centralized /logout flow and lands on login', async ({
    page,
    i18n,
  }) => {
    let loggedOut = false;
    let wpLogoutCalled = false;

    // /users/me is authenticated until the logout endpoint fires, then 403 so
    // the user stays on /login instead of bouncing back to the app.
    await page.route('*/**/api/users/me', async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({
        status: loggedOut ? 403 : 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          loggedOut ? { message: 'Unauthorized' } : loggedInUser
        ),
      });
    });

    // Empty workspaces → useActiveWorkspace returns undefined → NoActiveWorkSpaceState
    await page.route('*/**/api/workspaces?orderBy=company', async (route) => {
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emptyWorkspaces),
      });
    });

    await page.route('*/**/api/users/me/preferences', async (route) => {
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [] }),
      });
    });

    // The centralized LogoutPage hits the WP logout endpoint.
    await page.route('**/wp-admin/admin-ajax.php**', async (route) => {
      if (route.request().url().includes('unguess_wp_logout')) {
        wpLogoutCalled = true;
        loggedOut = true;
        await route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true }),
        });
      } else {
        await route.fallback();
      }
    });

    await page.goto('/');

    const logoutButton = page.getByRole('button', {
      name: i18n.t('__PAGE_NOT_ACCESIBLE_BUTTON_LOGOUT'),
    });
    await expect(logoutButton).toBeVisible();

    await logoutButton.click();

    await expect(page).toHaveURL(/\/login/);
    expect(wpLogoutCalled).toBe(true);
  });
});
