import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { Step1 } from '../../fixtures/pages/Join/Step1';

test.describe('The Join page first step - case valid invited user only', () => {
  let join: Join;
  let step1: Step1;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step1 = new Step1(page);

    await join.mockGetInvitedUser();
    await page.goto(join.urlInvitedUser);
  });

  test('before rendering page evaluate invited parameters from the url', async ({
    page,
  }) => {
    const getPromise = page.waitForResponse(
      (response) =>
        new RegExp(`api/invites/${join.profileId}/${join.token}`).test(
          response.url()
        ) &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await page.goto(join.urlInvitedUser);

    const response = await getPromise;
    expect(response).toBeDefined();
  });

  test('the email input, is precompiled (with invited user email from api) and disabled', async () => {
    await expect(step1.elements().emailInput()).toBeDisabled();
    await expect(step1.elements().emailInput()).toHaveValue(
      step1.validInvitedUser.email
    );
  });
});

test.describe('The Join page second step - case invited user only', () => {
  test('display two inputs for name and surname precopiled if present in api response', async () => {});
});

test.describe('The Join page third step - case invited user only', () => {
  test('display the workspace name input precompiled from api and disabled', async () => {});
});
