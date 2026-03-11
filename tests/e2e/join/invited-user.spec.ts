import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { InvitedUserPage } from '../../fixtures/pages/Join/InvitedUserPage';
import { OnboardingPage } from '../../fixtures/pages/Join/OnboardingPage';

test.describe('The Join page if the get invites respond 400', () => {
  let join: Join;
  let invitePage: InvitedUserPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    invitePage = new InvitedUserPage(page);

    await join.notLoggedIn();
    await invitePage.mockGetInvitedUserError();
    await page.goto(join.urlInvitedUser);
  });
  test('should render an error state', async () => {
    await expect(join.elements().errorState()).toBeVisible();
  });
});

test.describe('The Join page first step - case valid invited user only', () => {
  let join: Join;
  let invitePage: InvitedUserPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    invitePage = new InvitedUserPage(page);

    await join.notLoggedIn();
    await invitePage.mockGetInvitedUser();

    await page.goto(join.urlInvitedUser);
  });

  test('before rendering page evaluate invited parameters from the url', async ({
    page,
  }) => {
    const getPromise = page.waitForResponse(
      (response) =>
        response
          .url()
          .includes(`api/invites/${join.profileId}/${join.token}`) &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await page.goto(join.urlInvitedUser);

    const response = await getPromise;
    expect(response).toBeDefined();
  });

  test('the email input, is precompiled (with invited user email from api) and disabled', async () => {
    await expect(invitePage.elements().emailDisplay()).toBeDisabled();
    await expect(invitePage.elements().emailDisplay()).toHaveValue(
      join.validInvitedUser.email
    );
  });
});

test.describe('The Join page second step - invited user can see onboarding', () => {
  let join: Join;
  let invitePage: InvitedUserPage;
  let onboarding: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);

    invitePage = new InvitedUserPage(page);
    onboarding = new OnboardingPage(page);

    await join.notLoggedIn();
    await invitePage.mockGetInvitedUser();
    await onboarding.mockGetRoles();
    await onboarding.mockGetCompanySizes();
    await onboarding.mockAuthenticatedUserWithPendingOnboarding();
    await invitePage.mockCompleteCognitoFlow();
    await page.goto(join.urlInvitedUser);

    await invitePage.fillValidPasswordForm();
    await invitePage.submitForm();
  });

  test('display two inputs for name and surname after signup, login and amplify challenge check', async () => {
    await expect(onboarding.elements().nameInput()).toBeEnabled();
    await expect(onboarding.elements().surnameInput()).toBeEnabled();
  });
});

test.describe('Invited user onboarding skips workspace step', () => {
  let join: Join;
  let invitePage: InvitedUserPage;
  let onboarding: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    invitePage = new InvitedUserPage(page);
    onboarding = new OnboardingPage(page);

    await join.notLoggedIn();
    await invitePage.mockGetInvitedUser();
    await onboarding.mockGetRoles();
    await onboarding.mockGetCompanySizes();
    await onboarding.mockAuthenticatedUserWithPendingOnboarding();
    await onboarding.mockPostUsersForInvited();
    await invitePage.mockCompleteCognitoFlow();
    await page.goto(join.urlInvitedUser);

    // Complete signup and login
    await invitePage.fillValidPasswordForm();
    await invitePage.submitForm();

    // Fill personal info
    await onboarding.fillPersonalInfo();
    await onboarding.submitPersonalInfo();
  });

  test('workspace step is not displayed and redirects to homepage', async ({
    page,
  }) => {
    await page.waitForURL('**/');
    await expect(page).toHaveURL('/');
    await expect(
      onboarding.workspaceElements().workspaceInput()
    ).not.toBeVisible();
  });
});
