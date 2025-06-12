import { expect, type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class LocationModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      tab: () => this.page.getByTestId('target-tab'),
      module: () => this.page.getByTestId('location-module'),
      countryRadioPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCATION_SELECT_COUNTRY'),
          }),
      countryRadioInput: () =>
        this.elements().countryRadioPanel().getByRole('radio'),
      areaRadioPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCATION_SELECT_AREA'),
          }),
      areaRadioInput: () => this.elements().areaRadioPanel().getByRole('radio'),
      citySelectionPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCATION_SELECT_CITY'),
          }),
      citySelectionInput: () =>
        this.elements().citySelectionPanel().getByRole('checkbox'),
      regionSelectionPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCATION_SELECT_REGION'),
          }),
      regionSelectionInput: () =>
        this.elements().regionSelectionPanel().getByRole('checkbox'),
    };
  }

  static getLocationFromPlan(plan: any) {
    const locationModule = plan.config.modules.find(
      (module) => module.type === 'location'
    );
    if (!locationModule) {
      throw new Error('No location module found in plan');
    }
    // Adjust output validation as needed for your data structure
    return locationModule.output;
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async expectToBeReadonly() {
    // Implement readonly checks for Location module if needed
    // Example: check for disabled inputs
  }
}
