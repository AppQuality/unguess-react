import { Page } from '@playwright/test';
import { i18n, t } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class Step2 {
  readonly page: Page;

  readonly i18n: i18n;

  readonly stepNumber = 2;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      container: () => this.page.getByRole('tabpanel', { name: 'Step 2' }),
      nameInput: () =>
        this.page.getByLabel(this.i18n.t('SIGNUP_FORM_NAME_LABEL')),
      nameError: () => this.page.getByTestId('signup-name-error'),
      surnameInput: () =>
        this.page.getByLabel(this.i18n.t('SIGNUP_FORM_SURNAME_LABEL')),
      surnameError: () => this.page.getByTestId('signup-surname-error'),
      roleSelect: () => this.page.getByTestId('roleId-select'),
      roleSelectOptions: () => this.elements().roleSelect().getByRole('option'),
      roleSelectError: () => this.page.getByTestId('signup-role-error'),
      buttonBackToStep1: () =>
        this.page.getByRole('button', { name: 'SIGNUP_FORM_RETURN_TO_STEP_1' }),
      buttonGoToStep3: () =>
        this.page.getByRole('button', { name: 'SIGNUP_FORM_GO_TO_STEP_3' }),
    };
  }

  async fillValidFields() {
    await this.elements().nameInput().fill('John');
    await this.elements().surnameInput().fill('Doe');
    await this.elements().roleSelect().click();
    await this.elements().roleSelectOptions().first().click();
  }

  async goToNextStep() {
    await this.fillValidFields();
    await this.elements().buttonGoToStep3().click();
  }

  async mockGetRoles() {
    await this.page.route('*/**/api/users/roles', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/roles/_get/200_Example_1.json',
      });
    });
  }
}
