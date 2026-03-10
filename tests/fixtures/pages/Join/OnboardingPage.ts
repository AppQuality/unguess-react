import { Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import roles from '../../../api/users/roles/_get/200_Example_1.json';
import companySizes from '../../../api/companies/sizes/_get/200_Example_1.json';

export class OnboardingPage {
  readonly page: Page;

  readonly i18n: i18n;

  readonly name = 'John';

  readonly surname = 'Doe';

  readonly roleId = roles[0].id;

  readonly companySizeId = companySizes[0].id;

  readonly workspace = 'Test Workspace';

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  // PersonalInfoStep elements
  elements() {
    return {
      nameInput: () =>
        this.page.getByLabel(this.i18n.t('SIGNUP_FORM_NAME_LABEL')),
      nameError: () => this.page.getByTestId('onboarding-name-error'),
      surnameInput: () =>
        this.page.getByLabel(this.i18n.t('SIGNUP_FORM_SURNAME_LABEL')),
      surnameError: () => this.page.getByTestId('onboarding-surname-error'),
      roleSelect: () => this.page.getByTestId('roleId-select'),
      roleSelectOptions: () => this.elements().roleSelect().getByRole('option'),
      roleSelectError: () => this.page.getByTestId('onboarding-role-error'),
      companySizeSelect: () => this.page.getByTestId('companySizeId-select'),
      companySizeSelectOptions: () =>
        this.elements().companySizeSelect().getByRole('option'),
      companySizeSelectError: () =>
        this.page.getByTestId('onboarding-company-size-error'),
      nextButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_GO_TO_STEP_3'),
        }),
    };
  }

  // WorkspaceStep elements
  workspaceElements() {
    return {
      workspaceInput: () =>
        this.page.getByRole('textbox', { name: /workspace/i }),
      workspaceError: () => this.page.getByTestId('onboarding-workspace-error'),
      backButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_RETURN_TO_STEP_2'),
        }),
      submitButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_SUBMIT'),
        }),
    };
  }

  async fillPersonalInfo() {
    await this.elements().nameInput().fill(this.name);
    await this.elements().surnameInput().fill(this.surname);
    await this.elements().roleSelect().click();
    await this.elements().roleSelectOptions().first().click();
    await this.elements().companySizeSelect().click();
    await this.elements().companySizeSelectOptions().first().click();
    await this.elements().nameInput().blur();
  }

  async submitPersonalInfo() {
    await this.elements().nextButton().click();
  }

  async fillWorkspace() {
    await this.workspaceElements().workspaceInput().fill(this.workspace);
    await this.workspaceElements().workspaceInput().blur();
  }

  async submitWorkspace() {
    await this.workspaceElements().submitButton().click();
  }

  async completeOnboarding() {
    await this.fillPersonalInfo();
    await this.submitPersonalInfo();
    await this.fillWorkspace();
    await this.submitWorkspace();
  }

  async mockGetRoles() {
    await this.page.route('*/**/api/users/roles', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/roles/_get/200_Example_1.json',
      });
    });
  }

  async mockGetCompanySizes() {
    await this.page.route('*/**/api/companies/sizes', async (route) => {
      await route.fulfill({
        path: 'tests/api/companies/sizes/_get/200_Example_1.json',
      });
    });
  }

  async mockPostUsers() {
    await this.page.route(`*/**/api/users`, async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          path: 'tests/api/users/_post/201_new_user.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockAuthenticatedUserWithPendingOnboarding() {
    await this.page.route('*/**/api/users/me', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: 1,
            email: 'new.user@example.com',
            name: 'Test',
            surname: 'User',
            onboarding_pending: true,
          }),
        });
      } else {
        await route.fallback();
      }
    });
  }
}
