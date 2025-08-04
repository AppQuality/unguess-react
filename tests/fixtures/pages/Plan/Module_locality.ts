import { expect, type Page } from '@playwright/test';
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

  async expectAllRadiosDisabled() {
    const countryRadios = this.elements().countryRadioInput();
    const areaRadios = this.elements().areaRadioInput();
    const countryCount = await countryRadios.count();
    const areaCount = await areaRadios.count();
    const checks: Promise<void>[] = [];
    for (let i = 0; i < countryCount; i += 1) {
      checks.push(expect(countryRadios.nth(i)).toHaveAttribute('disabled', ''));
    }

    for (let i = 0; i < areaCount; i += 1) {
      checks.push(expect(areaRadios.nth(i)).toHaveAttribute('disabled', ''));
    }
    await Promise.all(checks);
  }

  async expectRegionCheckboxesDisabled() {
    const reggionCheckbox = this.elements().regionSelectionInput();
    const countRegion = await reggionCheckbox.count();
    const checksRegion: Promise<void>[] = [];
    for (let i = 0; i < countRegion; i += 1) {
      checksRegion.push(
        expect(reggionCheckbox.nth(i)).toHaveAttribute('disabled', '')
      );
    }
    await Promise.all(checksRegion);
  }

  async expectCityCheckboxesDisabled() {
    const cityCheckbox = this.elements().citySelectionInput();
    const countCity = await cityCheckbox.count();
    const checksCity: Promise<void>[] = [];
    for (let i = 0; i < countCity; i += 1) {
      checksCity.push(
        expect(cityCheckbox.nth(i)).toHaveAttribute('disabled', '')
      );
    }
    await Promise.all(checksCity);
  }

  async expectToBeReadonly() {
    await this.elements().module().scrollIntoViewIfNeeded();
    await this.expectAllRadiosDisabled();
    await this.elements().regionSelectionPanel().scrollIntoViewIfNeeded();
    await this.expectRegionCheckboxesDisabled();
    // this.elements().citySelectionPanel().scrollIntoViewIfNeeded();
    // await this.expectCityCheckboxesDisabled();
  }
}
