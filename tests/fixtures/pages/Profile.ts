import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class Profile extends UnguessPage {
  readonly page: Page;

  readonly url = '/profile';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      profileCard: () => this.page.getByTestId('profile-card'),
      profileCardName: () =>
        this.elements()
          .profileCard()
          .getByLabel(this.i18n.t('__PROFILE_PAGE_USER_CARD_NAME_LABEL')),
      profileCardSurname: () =>
        this.elements()
          .profileCard()
          .getByLabel(this.i18n.t('__PROFILE_PAGE_USER_CARD_SURNAME_LABEL')),
      profileCardEmail: () =>
        this.elements()
          .profileCard()
          .getByLabel(this.i18n.t('__PROFILE_PAGE_USER_CARD_EMAIL_LABEL')),
      profileCardRole: () =>
        this.elements().profileCard().getByTestId('roleId-select'),
      profileCardSubmitButton: () =>
        this.elements()
          .profileCard()
          .getByRole('button', {
            name: this.i18n.t('__PAGE_PROFILE_SAVE_CHANGES_BUTTON'),
          }),
      passwordSettingsCard: () => this.page.getByTestId('password-accordion'),
      passwordAccordionHeader: () =>
        this.elements()
          .passwordSettingsCard()
          .getByRole('button', {
            name: this.i18n.t('__PROFILE_PAGE_PASSWORD_ACCORDION_LABEL'),
          }),
      passwordSettingCurrent: () =>
        this.elements()
          .passwordSettingsCard()
          .getByLabel(this.i18n.t('__PAGE_PROFILE_CURRENT_PASSWORD_LABEL')),
      passwordSettingNew: () =>
        this.elements()
          .passwordSettingsCard()
          .getByLabel(`${this.i18n.t('__PAGE_PROFILE_NEW_PASSWORD_LABEL')} *`, {
            exact: true,
          }),
      passwordSettingConfirm: () =>
        this.elements()
          .passwordSettingsCard()
          .getByLabel(
            `${this.i18n.t('__PAGE_PROFILE_CONFIRM_PASSWORD_LABEL')} *`,
            { exact: true }
          ),
      passwordRequirements: () =>
        this.elements()
          .passwordSettingsCard()
          .getByTestId('password-requirements'),
      passwordSettingsSubmitButton: () =>
        this.elements()
          .passwordSettingsCard()
          .getByRole('button', {
            name: this.i18n.t('__PAGE_PROFILE_SAVE_CHANGES_BUTTON'),
          }),
    };
  }

  async openPasswordSettings() {
    await this.elements().passwordAccordionHeader().click({ timeout: 15000 });
  }

  async saveProfile() {
    const patchPromise = this.page.waitForResponse(
      (response) =>
        /\/api\/users\/me/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await this.elements().profileCardSubmitButton().click();
    return patchPromise;
  }

  async saveNewPassword() {
    const patchPromise = this.page.waitForResponse(
      (response) =>
        /\/api\/users\/me/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await this.elements().passwordSettingsSubmitButton().click();
    return patchPromise;
  }

  async mockPatchUserMe(status = 200, body = {}) {
    await this.page.route('*/**/api/users/me', async (route) => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({
          status,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        await route.fallback();
      }
    });
  }
}
