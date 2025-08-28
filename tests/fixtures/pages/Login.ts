import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';
import { error } from 'console';

export class Login extends UnguessPage {
  readonly page: Page;

  readonly url = '/login';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      emailInput: () =>
        this.page.getByPlaceholder(
          this.i18n.t('__LOGIN_FORM_EMAIL_PLACEHOLDER')
        ),
      passwordInput: () =>
        this.page.getByPlaceholder(
          this.i18n.t('__LOGIN_FORM_PASSWORD_PLACEHOLDER')
        ),
      submitButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__LOGIN_FORM_CTA'),
        }),
      errorToast: () => this.page.getByRole('alert'),
    };
  }

  async fillValidInputs() {
    await this.elements().emailInput().fill('email@example.com');
    await this.elements().passwordInput().fill('Password123');
  }

  async submit() {
    await this.elements().submitButton().click();
  }

  async mockGetNonce403() {
    await this.page.route('**/wp-admin/admin-ajax.php', async (route) => {
      const postData = route.request().postData();
      if (postData && postData.includes('action=ug_get_nonce')) {
        await route.fulfill({ status: 403 });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetNonce200() {
    await this.page.route('**/wp-admin/admin-ajax.php', async (route) => {
      const postData = route.request().postData();
      if (postData && postData.includes('action=ug_get_nonce')) {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true, data: 'bss68915f2' }),
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockLogin403() {
    await this.page.route('**/wp-admin/admin-ajax.php', async (route) => {
      const postData = route.request().postData();
      if (postData && postData.includes('action=ajaxlogin')) {
        await route.fulfill({ status: 403 });
      } else {
        await route.fallback();
      }
    });
  }

  async mockLoginInvalid() {
    await this.page.route('**/wp-admin/admin-ajax.php', async (route) => {
      const postData = route.request().postData();
      if (postData && postData.includes('action=ajaxlogin')) {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ success: false, data: { type: 'invalid' } }),
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockLogin200() {
    await this.page.route('**/wp-admin/admin-ajax.php', async (route) => {
      const postData = route.request().postData();
      if (postData && postData.includes('action=ajaxlogin')) {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true }),
        });
      } else {
        await route.fallback();
      }
    });
  }
}
