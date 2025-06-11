import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';

test.describe('The Join page - already logged in user:', () => {
  let join: Join;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);

    await join.loggedIn();
    await join.mockPreferences();
    await join.mockWorkspace();
    await join.mockWorkspacesList();
    await join.mockExperientialCampaign();
  });
  test('If there is not a query parameter redirectTo the user is redirected to home', async ({
    page,
  }) => {
    await join.open();
    await expect(page).toHaveURL('/');
  });
  test('If there is a query parameter redirectTo, the user is redirected to a specific page', async ({
    page,
  }) => {
    await page.goto('/join?redirectTo=/campaigns/1');
    await expect(page).toHaveURL('/campaigns/1');
  });
});
