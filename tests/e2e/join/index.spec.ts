import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { Step1 } from '../../fixtures/pages/Join/Step1';
import { Step2 } from '../../fixtures/pages/Join/Step2';
import { Step3 } from '../../fixtures/pages/Join/Step3';

test.describe('The Join page first step - case new user', () => {
  let join: Join;
  let step1: Step1;
  let step2: Step2;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step1 = new Step1(page);
    step2 = new Step2(page);
    await join.open();
  });

  test('display a form with user email and password input, a CTA to go to the next step', async () => {
    await expect(step1.elements().container()).toBeVisible();
    await expect(step1.elements().emailInput()).toBeVisible();
    await expect(step1.elements().passwordInput()).toBeVisible();
    await expect(step1.elements().buttonGoToStep2()).toBeVisible();
  });

  test('the password input check if the password is strong enough', async ({
    page,
    i18n,
  }) => {
    await step1.elements().buttonGoToStep2().click();
    await expect(
      page.getByText(i18n.t('SIGNUP_FORM_PASSWORD_IS_A_REQUIRED_FIELD'))
    ).toBeVisible();

    await expect(step1.elements().passwordRequirements()).toBeVisible();

    await step1.fillPassword('weak');
    await expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTER_LONG')
      )
    ).toBeVisible();

    await step1.fillPassword('weakpassword');
    await expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
      )
    ).toBeVisible();

    await step1.fillPassword('weakpassword123');
    await expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
      )
    ).toBeVisible();

    await step1.fillPassword('WEAKPASSWORD123');
    await expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
      )
    ).toBeVisible();

    await step1.fillValidPassword();
    await expect(page.getByTestId('message-error-password')).not.toBeVisible();
  });

  test('the email input check if the email is valid', async ({
    page,
    i18n,
  }) => {
    await step1.elements().buttonGoToStep2().click();
    await expect(
      page.getByText(i18n.t('SIGNUP_FORM_EMAIL_IS_REQUIRED'))
    ).toBeVisible();
    await step1.fillEmail('invalid-email');
    await expect(
      page.getByText(i18n.t('SIGNUP_FORM_EMAIL_MUST_BE_A_VALID_EMAIL'))
    ).toBeVisible();

    await step1.fillRegisteredEmail();
    await expect(
      page.getByText(i18n.t('SIGNUP_FORM_EMAIL_ALREADY_TAKEN'))
    ).toBeVisible();

    await step1.fillValidEmail();
    await expect(page.getByTestId('message-error-email')).not.toBeVisible();
  });

  test('when the user click the next step cta we validate current inputs and if ok goes to the next step', async () => {
    await step1.goToNextStep();
    await expect(step1.elements().container()).not.toBeVisible();
    await expect(step2.elements().container()).toBeVisible();
  });
  test('display two links to go to app.unguess and a link to terms and conditions', async () => {});
});

test.describe('The Join page second step', () => {
  let join: Join;
  let step1: Step1;
  let step2: Step2;
  let step3: Step3;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step1 = new Step1(page);
    step2 = new Step2(page);
    step3 = new Step3(page);

    await step2.mockGetRoles();
    await join.open();
    await step1.goToNextStep();
  });
  test('display required inputs for name, surname and a job role dropdown populated from api userRole', async () => {
    await expect(step2.elements().nameInput()).toBeVisible();
    await expect(step2.elements().surnameInput()).toBeVisible();
    await expect(step2.elements().roleSelect()).toBeVisible();
    await step2.elements().roleSelect().click();
    await expect(step2.elements().roleSelectOptions()).toHaveCount(3);
    await step2.elements().buttonGoToStep3().click();
    await expect(step2.elements().nameError()).toHaveText(
      'SIGNUP_FORM_NAME_IS_REQUIRED'
    );
    await expect(step2.elements().surnameError()).toHaveText(
      'SIGNUP_FORM_SURNAME_IS_REQUIRED'
    );
    await expect(step2.elements().roleSelectError()).toHaveText(
      'SIGNUP_FORM_ROLE_IS_REQUIRED'
    );
    await step2.fillValidFields();
    await expect(step2.elements().nameError()).not.toBeVisible();
    await expect(step2.elements().surnameError()).not.toBeVisible();
    await expect(step2.elements().roleSelectError()).not.toBeVisible();
  });
  test('display back and next navigation, clicking on next validate this step and goes to step 3', async () => {
    await expect(step2.elements().buttonBackToStep1()).toBeVisible();
    await expect(step2.elements().buttonGoToStep3()).toBeVisible();
    await step2.goToNextStep();
    await expect(step2.elements().container()).not.toBeVisible();
    await expect(step3.elements().container()).toBeVisible();
  });
});

test.describe('The Join page third step', () => {
  let join: Join;
  let step1: Step1;
  let step2: Step2;
  let step3: Step3;

  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step1 = new Step1(page);
    step2 = new Step2(page);
    step3 = new Step3(page);

    await join.open();
    await join.mockPostNewUser();
    await step1.goToNextStep();
    await step2.goToNextStep();
  });
  test('display a required text input for the workspace name and a back button to return to step 2', async () => {
    await expect(step3.elements().workspaceInput()).toBeVisible();
    await expect(step3.elements().buttonBackToStep2()).toBeVisible();
    await step3.elements().buttonBackToStep2().click();
    await expect(step3.elements().container()).not.toBeVisible();
    await expect(step2.elements().container()).toBeVisible();
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
    await step3.elements().buttonSubmit().click();
    await expect(step3.elements().workspaceError()).toHaveText(
      i18n.t('SIGNUP_FORM_WORKSPACE_IS_REQUIRED')
    );
    await step3.fillValidWorkspace();
    await expect(step3.elements().workspaceError()).not.toBeVisible();
    await step3.elements().buttonSubmit().click();
    const response = await postPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(
      expect.objectContaining({
        type: 'new',
        email: 'new.user@example.com',
        password: 'ValidPassword123',
        name: step2.name,
        surname: step2.surname,
        roleId: step2.roleId,
        workspace: step3.workspace,
      })
    );
    await expect(step3.elements().container()).not.toBeVisible();
    await expect(page).toHaveURL(/.*\/projects\/\d+/);
  });
  test('if the POST answer with a projectId then redirect to /projects/{projectId}', async () => {});
  test('if the POST does NOT answer with a projectId then go to the homepage', async () => {});
});
