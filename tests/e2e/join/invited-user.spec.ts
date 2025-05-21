import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { Step1 } from '../../fixtures/pages/Join/Step1';
import { Step2 } from '../../fixtures/pages/Join/Step2';
import { Step3 } from '../../fixtures/pages/Join/Step3';

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
      join.validInvitedUser.email
    );
  });
});

test.describe('The Join page second step - case invited user only', () => {
  let join: Join;
  let step2: Step2;
  let step1: Step1;
  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step2 = new Step2(page);
    step1 = new Step1(page);

    await join.mockGetInvitedUser();
    await step2.mockGetRoles();
    await page.goto(join.urlInvitedUser);
    await step1.goToNextStepAsInvitedUser();
  });
  test('display two inputs for name and surname precopiled if present in api response', async () => {
    await expect(step2.elements().nameInput()).toBeEnabled();
    await expect(step2.elements().nameInput()).toHaveValue(
      join.validInvitedUser.name
    );
    await expect(step2.elements().surnameInput()).toBeEnabled();
    await expect(step2.elements().surnameInput()).toHaveValue(
      join.validInvitedUser.surname
    );
  });
});

test.describe('The Join page third step - case invited user only', () => {
  let join: Join;
  let step1: Step1;
  let step2: Step2;
  let step3: Step3;
  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step2 = new Step2(page);
    step1 = new Step1(page);
    step3 = new Step3(page);

    await join.mockGetInvitedUser();
    await step2.mockGetRoles();
    await page.goto(join.urlInvitedUser);
    await step1.goToNextStepAsInvitedUser();
    await step2.elements().buttonGoToStep3().click();
  });

  test('display the workspace name input precompiled from api and disabled', async () => {
    await expect(step3.elements().workspaceInput()).toBeEnabled();
    await expect(step3.elements().workspaceInput()).toHaveValue(
      join.validInvitedUser.workspace
    );
  });
  test('the POST should NOT answer with a projectId therefore submitting the form redirect to the homepage', async () => {});
});
