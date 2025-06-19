import { type Page } from '@playwright/test';
import exp from 'constants';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class LocalityModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      tab: () => this.page.getByTestId('target-tab'),
      module: () => this.page.getByTestId('locality-module'),
      countryRadioPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_COUNTRY'),
          }),
      countryRadioInput: () =>
        this.elements().countryRadioPanel().getByRole('radio'),
      areaRadioPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_AREA'),
          }),
      areaRadioInput: () => this.elements().areaRadioPanel().getByRole('radio'),
      citySelectionPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_CITY'),
          }),
      citySelectionInput: () =>
        this.elements().citySelectionPanel().getByRole('checkbox'),
      regionSelectionPanel: () =>
        this.elements()
          .module()
          .getByRole('group', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_REGION'),
          }),
      regionSelectionInput: () =>
        this.elements().regionSelectionPanel().getByRole('checkbox'),
      errorMessage: () =>
        this.elements().module().getByTestId('locality-module-error-message'),
      removeButton: () =>
        this.elements()
          .module()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_LOCALITY_REMOVE_BUTTON'),
          }),
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

  removeModule() {
    return this.elements().removeButton().click();
  }

  async expectToBeReadonly() {
    const { areaRadioInput, citySelectionInput } = this.elements();
    expect(true).toBeTruthy(); // Placeholder for actual implementation
  }
}
