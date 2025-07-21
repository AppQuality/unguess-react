import { type Page, expect } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import { AsideNavigation } from './AsideNavigation';

export class TouchpointsModule {
  readonly page: Page;

  readonly i18n: i18n;

  readonly asideNavigation: AsideNavigation;

  constructor(page: Page) {
    this.page = page;

    this.i18n = getI18nInstance() as unknown as i18n;

    this.asideNavigation = new AsideNavigation(page, this.i18n);
  }

  elements() {
    return {
      module: () => this.page.getByTestId('touchpoints-module'),
      tab: () => this.page.getByTestId('setup-tab'),
      removeModuleButton: () =>
        this.elements().module().getByTestId('remove-module-button'),
      removeModuleConfirmationModal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_TITLE'),
        }),
      removeModuleConfirmationButton: () =>
        this.elements()
          .removeModuleConfirmationModal()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_CONFIRM'),
          }),
    };
  }

  async addModule() {
    await this.goToTab();
    // first check if a touchpoints module is already present
    const existingModule = this.elements().module();
    if (await existingModule.isVisible()) {
      return; // Module already exists, no need to add again
    }
    const aside = this.asideNavigation.elements();
    await aside.addBlockButton().click();
    await expect(aside.addBlockModal()).toBeVisible();
    await aside
      .addBlockModal()
      .getByText(this.i18n.t('__PLAN_PAGE_MODULE_TOUCHPOINTS_TITLE'))
      .click();
  }

  async removeModule() {
    await this.goToTab();
    const moduleElement = this.elements().module();
    if (await moduleElement.isVisible()) {
      await this.elements().removeModuleButton().click();
      await this.elements().removeModuleConfirmationButton().click();
    }
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    await expect(this.elements().module()).toBeVisible();
    // todo: implement specific readonly checks
  }
}
