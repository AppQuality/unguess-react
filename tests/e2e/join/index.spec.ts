import { test, expect } from '../../fixtures/app';
import { Join } from '../../fixtures/pages/Join';
import { Step1 } from '../../fixtures/pages/Join/Step1';

test.describe('The Join page first step - case new user', () => {
  let join: Join;
  let step1: Step1;
  test.beforeEach(async ({ page }) => {
    join = new Join(page);
    step1 = new Step1(page);

    await join.open();
  });

  test('display a form with user email and password input, a CTA to go to the next step', async () => {
    const tab = step1.elements().container();
    expect(tab).toBeVisible();
    const emailInput = step1.elements().emailInput();
    expect(emailInput).toBeVisible();
    const passwordInput = step1.elements().passwordInput();
    expect(passwordInput).toBeVisible();
    const goToStep2 = step1.elements().goToStep2();
    expect(goToStep2).toBeVisible();
  });
  test('the password input check if the password is strong enough', async ({
    page,
    i18n,
  }) => {
    expect(step1.elements().passwordRequirements()).toBeVisible();

    await step1.fillPassword('weak');
    expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_BE_AT_LEAST_6_CHARACTER_LONG')
      )
    ).toBeVisible();

    await step1.fillPassword('weakpassword');
    expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_NUMBER')
      )
    ).toBeVisible();

    await step1.fillPassword('weakpassword123');
    expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_AN_UPPERCASE_LETTER')
      )
    ).toBeVisible();

    await step1.fillPassword('WEAKPASSWORD123');
    expect(
      page.getByText(
        i18n.t('SIGNUP_FORM_PASSWORD_MUST_CONTAIN_AT_LEAST_A_LOWERCASE_LETTER')
      )
    ).toBeVisible();

    await step1.fillValidPassword();
    expect(page.getByTestId('message-error-password')).not.toBeVisible();
  });

  test('when the user click the next step cta we validate current inputs and if ok goes to the next step', async () => {});
  test('display two links to go to app.unguess and a link to terms and conditions', async () => {});
  test('the email input, once blurred check if email is already existing and if is valid', async () => {});
});

test.describe('The Join page second step', () => {
  test('display a job role dropdown populated from api options', async () => {});
  test('display back and next navigation, clicking on next validate this step', async () => {});
  test('display two require inputs for name and surname', async () => {});
});

test.describe('The Join page third step', () => {
  test('display a required text input for the workspace name', async () => {});
  test('display back and submit-button, clicking on submit-button validate the whole form and calls the api post', async () => {});
  test('if the POST answer with a projectId then redirect to /projects/{projectId}', async () => {});
  test('if the POST does NOT answer with a projectId then go to the homepage', async () => {});
});
