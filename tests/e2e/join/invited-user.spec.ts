import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';

test.describe('The Join page first step - case invited user only', () => {
  let join: Join;
  test.beforeEach(async ({ page }) => {
    join = new Join(page);

    await join.mockGetInvitedUser();
  });

  test('before rendering there is a loader while evaluating invited parameters from the url', async ({
    page,
  }) => {
    const getPromise = page.waitForResponse(
      (response) =>
        /\/api\/invites\/1\/token123/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await page.goto(join.urlInvitedUser);

    // await expect(join.elements().loader()).toBeVisible();

    const response = await getPromise;
    expect(response).toBeDefined();
  });
  test('the email input, is precompiled (with invited user email from api) and disabled', async () => {});
});

test.describe('The Join page second step - case invited user only', () => {
  test('display two inputs for name and surname precopiled if present in api response', async () => {});
});

test.describe('The Join page third step - case invited user only', () => {
  test('display the workspace name input precompiled from api and disabled', async () => {});
});
