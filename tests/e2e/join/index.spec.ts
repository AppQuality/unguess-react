import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { OnboardingPage } from '../../fixtures/pages/Join/OnboardingPage';
import { SignupPage } from '../../fixtures/pages/Join/SignupPage';

test.describe('The Join page signup step - case new user', () => {
  let join: Join;
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    signupPage = new SignupPage(page);
    await join.notLoggedIn();
    await signupPage.mockCognitoSignup();
    await join.openSignup();
  });

  test('display a form with user email and password input and terms checkbox', async () => {
    await expect(signupPage.signupFormElements().emailInput()).toBeVisible();
    await expect(signupPage.signupFormElements().passwordInput()).toBeVisible();
    await expect(signupPage.signupFormElements().termsCheckbox()).toBeVisible();
  });

  test('the password input check if the password is strong enough', async ({
    page,
    i18n,
  }) => {
    // Touch the password field and blur to trigger validation
    await signupPage.signupFormElements().passwordInput().click();
    await signupPage.signupFormElements().passwordInput().blur();
    await expect(signupPage.signupFormElements().passwordError()).toHaveText(
      i18n.t('SIGNUP_FORM_PASSWORD_REQUIRED')
    );

    await expect(
      page.getByTestId('password-requirements')
    ).toBeVisible();

    await signupPage.fillPassword('weak');
    await expect(
      page.getByText(i18n.t('PASSWORD_VALIDATOR_MINIMUM_OF_12_CHARACTERS'))
    ).toBeVisible();

    await signupPage.fillPassword('weakpassword');
    await expect(
      page.getByText(i18n.t('PASSWORD_VALIDATOR_CONTAIN_A_NUMBER'))
    ).toBeVisible();

    await signupPage.fillPassword('weakpassword123');
    await expect(
      page.getByText(i18n.t('PASSWORD_VALIDATOR_CONTAIN_AN_UPPERCASE_LETTER'))
    ).toBeVisible();

    await signupPage.fillPassword('WEAKPASSWORD123');
    await expect(
      page.getByText(i18n.t('PASSWORD_VALIDATOR_CONTAIN_A_LOWERCASE_LETTER'))
    ).toBeVisible();

    await signupPage.fillPassword('ValidPassword123');
    await expect(page.getByTestId('signup-password-error')).not.toBeVisible();
  });

  test('the email input check if the email is valid', async ({
    page,
    i18n,
  }) => {
    // Touch the email field and blur to trigger validation
    await signupPage.signupFormElements().emailInput().click();
    await signupPage.signupFormElements().emailInput().blur();
    await expect(signupPage.signupFormElements().emailError()).toHaveText(
      i18n.t('SIGNUP_FORM_EMAIL_REQUIRED')
    );
    await signupPage.fillEmail('invalid-email@');
    await expect(
      page.getByText(i18n.t('SIGNUP_FORM_EMAIL_INVALID'))
    ).toBeVisible();

    await signupPage.fillEmail('fake-email@mailinator.com');
    await expect(
      page.getByText(i18n.t('SIGNUP_FORM_EMAIL_DISPOSABLE_NOT_ALLOWED'))
    ).toBeVisible();

    // TODO: With direct Cognito integration, we should validate email availability
    // through Cognito's error responses instead of client-side checks.
    // Consider removing this validation in favor of handling Cognito errors.

    // await signupPage.fillRegisteredEmail();
    // await expect(
    //   page.getByText(i18n.t('SIGNUP_FORM_EMAIL_ALREADY_TAKEN'))
    // ).toBeVisible();

    await signupPage.fillEmail('new.user@example.com');
    await expect(page.getByTestId('signup-email-error')).not.toBeVisible();
  });

  test('when the user click the cta we validate current inputs and if ok shows confirmation code input', async () => {
    await signupPage.mockCognitoConfirmSignup();

    await signupPage.fillValidSignupForm();
    await signupPage.submitSignupForm();
    await expect(
      signupPage.confirmEmailFormElements().codeInput()
    ).toBeVisible();
  });
});

test.describe('The Join page second step', () => {
  let join: Join;
  let onboarding: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    onboarding = new OnboardingPage(page);
    await onboarding.mockAuthenticatedUserWithPendingOnboarding();
    await onboarding.mockGetRoles();
    await onboarding.mockGetCompanySizes();

    await join.openOnboarding();
  });
  test('display required inputs for name, surname, job role and company size dropdowns populated from api userRole and companySize', async ({
    page,
    i18n,
  }) => {
    await expect(onboarding.elements().nameInput()).toBeVisible();
    await expect(onboarding.elements().surnameInput()).toBeVisible();
    await expect(onboarding.elements().roleSelect()).toBeVisible();
    await onboarding.elements().roleSelect().click();
    await expect(onboarding.elements().roleSelectOptions()).toHaveCount(3);
    await page.keyboard.press('Escape');
    await expect(onboarding.elements().companySizeSelect()).toBeVisible();
    await onboarding.elements().companySizeSelect().click();
    await expect(onboarding.elements().companySizeSelectOptions()).toHaveCount(
      3
    );
    await page.keyboard.press('Escape');

    // Touch fields and blur to trigger validation errors
    await onboarding.elements().nameInput().click();
    await onboarding.elements().nameInput().blur();
    await onboarding.elements().surnameInput().click();
    await onboarding.elements().surnameInput().blur();

    await expect(onboarding.elements().nameError()).toHaveText(
      i18n.t('SIGNUP_FORM_NAME_REQUIRED')
    );
    await expect(onboarding.elements().surnameError()).toHaveText(
      i18n.t('SIGNUP_FORM_SURNAME_REQUIRED')
    );

    await onboarding.fillPersonalInfo();
    await expect(onboarding.elements().nameError()).not.toBeVisible();
    await expect(onboarding.elements().surnameError()).not.toBeVisible();
  });

  test('display next navigation, clicking on next validate this step and goes to final step', async () => {
    await expect(onboarding.elements().nextButton()).toBeVisible();

    await onboarding.fillPersonalInfo();
    await onboarding.submitPersonalInfo();
    await expect(onboarding.elements().nameInput()).not.toBeVisible();
    await expect(onboarding.workspaceElements().workspaceInput()).toBeVisible();
  });
});

test.describe('The Join page third step', () => {
  let join: Join;
  let onboarding: OnboardingPage;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    onboarding = new OnboardingPage(page);

    await join.mockPostNewUser();
    await onboarding.mockAuthenticatedUserWithPendingOnboarding();
    await onboarding.mockGetRoles();
    await onboarding.mockGetCompanySizes();

    await join.openOnboarding();

    await onboarding.fillPersonalInfo();
    await onboarding.submitPersonalInfo();
  });
  test('display a required text input for the workspace name and a back button to return to step 2', async () => {
    await expect(onboarding.workspaceElements().workspaceInput()).toBeVisible();
    await expect(onboarding.workspaceElements().backButton()).toBeVisible();
    await onboarding.workspaceElements().backButton().click();
    await expect(
      onboarding.workspaceElements().workspaceInput()
    ).not.toBeVisible();
    await expect(onboarding.elements().nameInput()).toBeVisible();
  });
  test('display a submit-button, clicking on submit-button validate the whole form and calls the api post', async ({
    page,
    i18n,
  }) => {
    const postPromise = page.waitForResponse(
      (response) =>
        /\/api\/users/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'POST'
    );
    // Touch workspace field to trigger validation
    await onboarding.workspaceElements().workspaceInput().click();
    await onboarding.workspaceElements().workspaceInput().blur();
    await expect(onboarding.workspaceElements().workspaceError()).toHaveText(
      i18n.t('SIGNUP_FORM_WORKSPACE_REQUIRED')
    );
    await onboarding.fillWorkspace();
    await expect(
      onboarding.workspaceElements().workspaceError()
    ).not.toBeVisible();
    await onboarding.workspaceElements().submitButton().click({ force: true });
    const response = await postPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(
      expect.objectContaining({
        type: 'new',
        email: 'new.user@example.com',
        name: onboarding.name,
        surname: onboarding.surname,
        roleId: onboarding.roleId,
        companySizeId: onboarding.companySizeId,
        workspace: onboarding.workspace,
      })
    );
  });
});
