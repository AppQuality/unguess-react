import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { OnboardingPage } from '../../fixtures/pages/Join/OnboardingPage';

test.describe('The Join page - logged in user with completed onboarding:', () => {
  let join: Join;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);

    await join.loggedIn();
    await join.mockPreferences();
    await join.mockWorkspace();
    await join.mockWorkspacesList();
    await join.mockExperientialCampaign();
  });

  test('accessing /join redirects to home', async ({ page }) => {
    await join.open();
    await expect(page).toHaveURL('/');
  });

  test('accessing /join/signup redirects to home', async ({ page }) => {
    await join.openSignup();
    await expect(page).toHaveURL('/');
  });

  test('accessing /join/onboarding redirects to home', async ({ page }) => {
    await join.openOnboarding();
    await expect(page).toHaveURL('/');
  });
});

test.describe('The Join page - logged in user with pending onboarding:', () => {
  let join: Join;
  let onboarding: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    onboarding = new OnboardingPage(page);
    await onboarding.mockAuthenticatedUserWithPendingOnboarding();

    await onboarding.mockGetRoles();
    await onboarding.mockGetCompanySizes();
  });

  test('accessing /join redirects to /join/onboarding', async ({ page }) => {
    await join.open();
    await expect(page).toHaveURL('/join/onboarding');
  });

  test('accessing /join/signup redirects to /join/onboarding', async ({
    page,
  }) => {
    await join.openSignup();
    await expect(page).toHaveURL('/join/onboarding');
  });

  test('accessing /join/onboarding shows onboarding page', async ({ page }) => {
    await join.openOnboarding();
    await expect(page).toHaveURL('/join/onboarding');
    await expect(onboarding.elements().nameInput()).toBeVisible();
  });
});
