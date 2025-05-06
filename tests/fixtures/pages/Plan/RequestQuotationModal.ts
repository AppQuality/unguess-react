import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class RequestQuotationModal {
  readonly page: Page;

  readonly testId = 'plan-creation-interface';

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      modal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t('__PLAN_PAGE_MODAL_SEND_REQUEST_TITLE'),
        }),
      titleModule: () => this.elements().modal().getByTestId('title-module'),
      titleModuleInput: () =>
        this.elements().modal().getByTestId('title-input'),
      titleModuleError: () =>
        this.elements().modal().getByTestId('title-error'),
      submitCTA: () =>
        this.elements().modal().getByTestId('request-quotation-modal-cta'),
      errorMessage: () =>
        this.page.getByRole('alert', {
          name: this.i18n.t('__PLAN_PAGE_MODAL_SEND_REQUEST_TOAST_ERROR'),
        }),
    };
  }

  async fillInputTItle(value: string) {
    await this.elements().titleModule().click();
    await this.elements().titleModuleInput().fill(value);
    await this.elements().titleModuleInput().blur();
  }

  async submitRequest() {
    const patchStatusPromise = this.page.waitForResponse(
      (response) =>
        /\/api\/plans\/1\/status/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await this.elements().submitCTA().click();
    return patchStatusPromise;
  }

  async mockPatchStatus() {
    await this.page.route('*/**/api/plans/1/status', async (route) => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({
          path: 'tests/api/plans/pid/status/_patch/request_Example_1.json',
        });
      } else {
        await route.fallback();
      }
    });
  }
}
