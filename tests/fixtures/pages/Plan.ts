import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class PlanPage extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `plans/1`;
  }

  elements() {
    return {
      ...super.elements(),
      pageHeader: () => this.page.getByTestId('plan-page-header'),
      requestQuotationModal: () =>
        this.page.getByTestId('request-quotation-modal'),
      goalModule: () => this.page.getByTestId('goal-module'),
      goalModuleInput: () => this.page.getByRole('textbox'),
      goalModuleError: () => this.page.getByTestId('goal-error'),
      titleModule: () =>
        this.elements().pageHeader().getByTestId('title-module'),
      titleModuleInput: () =>
        this.elements().titleModule().getByTestId('title-input'),
      titleModuleOutput: () =>
        this.elements().titleModule().getByTestId('title-output'),
      titleModuleError: () =>
        this.elements().titleModule().getByTestId('title-error'),
      tasksModule: () => this.page.getByTestId('tasks-module'),
      datesModule: () => this.page.getByTestId('dates-module'),
      datesModuleDatepicker: () =>
        this.elements().datesModule().getByTestId('dates-datepicker'),
      datesModuleError: () =>
        this.elements().datesModule().getByTestId('dates-error'),
      languageModule: () => this.page.getByTestId('language-module'),
      languageRadioInput: () =>
        this.elements().languageModule().getByRole('radio'),
      outOfScopeModule: () => this.page.getByTestId('out-of-scope-module'),
      outOfScopeModuleInput: () =>
        this.elements().outOfScopeModule().getByRole('textbox'),
      outOfScopeModuleError: () => this.page.getByTestId('out-of-scope-error'),
      targetModule: () => this.page.getByTestId('target-module'),
      targetModuleInput: () => this.page.getByTestId('target-input'),
      targetModuleError: () =>
        this.elements().targetModule().getByTestId('target-error'),
      descriptionModule: () => this.page.getByTestId('description-module'),
      saveConfigurationCTA: () =>
        this.elements()
          .pageHeader()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_SAVE_CONFIGURATION_CTA'),
          }),
      requestQuotationCTA: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__PLAN_REQUEST_QUOTATION_CTA'),
        }),
      confirmActivityCTA: () =>
        this.elements().pageHeader().getByTestId('confirm-activity-cta'),
      requestQuotationModalCTA: () =>
        this.page.getByTestId('request-quotation-modal-cta'),
      requestQuotationErrorMessage: () =>
        this.page.getByTestId('request-quotation-error-message'),
      setupTab: () => this.page.getByTestId('setup-tab'),
      targetTab: () => this.page.getByTestId('target-tab'),
      instructionsTab: () => this.page.getByTestId('instructions-tab'),
      summaryTab: () => this.page.getByTestId('summary-tab'),
      digitalLiteracyModule: () =>
        this.page.getByTestId('digital-literacy-module'),
      digitalLiteracyModuleErrorMessage: () =>
        this.page.getByTestId('literacy-error'),
    };
  }

  static getDateFromPlan(plan: any) {
    const dateModule = plan.config.modules.find(
      (module) => module.type === 'dates'
    );
    if (!dateModule) {
      throw new Error('No date module found in plan');
    }
    if (
      !(typeof dateModule.output === 'object' && 'start' in dateModule.output)
    ) {
      throw new Error('Invalid date module output');
    }
    const dateValue = new Date(dateModule.output.start);
    return dateValue;
  }

  static getOutOfScopeFromPlan(plan: any) {
    const outOfScopeModule = plan.config.modules.find(
      (module) => module.type === 'out_of_scope'
    );
    if (!outOfScopeModule) {
      throw new Error('No outOfScope found in plan');
    }
    const outOfScopeValue = outOfScopeModule.output;
    return outOfScopeValue;
  }

  static getGoalFromPlan(plan: any) {
    const goalModule = plan.config.modules.find(
      (module) => module.type === 'goal'
    );
    if (!goalModule) {
      throw new Error('No goal found in plan');
    }
    if (!(typeof goalModule.output === 'string')) {
      throw new Error('Invalid goal module output');
    }
    const goalValue = goalModule.output;
    return goalValue;
  }

  static getLanguageFromPlan(plan: any) {
    const languageModule = plan.config.modules.find(
      (module) => module.type === 'language'
    );
    if (!languageModule) {
      throw new Error('No language module found in plan');
    }
    if (!(typeof languageModule.output === 'string')) {
      throw new Error('Invalid language module output');
    }
    const language = languageModule.output;
    return language;
  }

  static getTitleFromPlan(plan: any) {
    const titleModule = plan.config.modules.find(
      (module) => module.type === 'title'
    );
    if (!titleModule) {
      throw new Error('No title module found in plan');
    }
    if (typeof titleModule.output !== 'string') {
      throw new Error('Invalid title module output');
    }
    return titleModule.output;
  }

  async fillInputTItle(value: string) {
    await this.elements().titleModule().click();
    await this.elements().titleModuleInput().fill(value);
    await this.elements().titleModuleInput().blur();
  }

  static getTargetFromPlan(plan: any): number {
    const targetModule = plan.config.modules.find(
      (module) => module.type === 'target'
    );
    if (!targetModule) {
      throw new Error('No target module found in plan');
    }
    if (typeof targetModule.output !== 'number') {
      throw new Error('Invalid target module output');
    }
    return targetModule.output;
  }

  async fillInputTarget(value: string) {
    await this.elements().targetModuleInput().click();
    await this.elements().targetModuleInput().fill(value);
    await this.elements().targetModuleInput().blur();
  }

  async mockGetDraftPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/_get/200_draft_complete.json',
      });
    });
  }

  async mockGetDraftPlanWithDateError() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/_get/200_draft_complete_date_error.json',
      });
    });
  }

  // some modules are mandatory, in this api call we mock a plan with only mandatory modules
  async mockGetDraftWithOnlyMandatoryModulesPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/_get/200_draft_mandatory_only.json',
      });
    });
  }

  // some modules are mandatory, in this api call we mock a plan missing some mandatory modules
  async mockGetDraftWithMissingMandatoryModulesPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/_get/200_draft_missing_mandatory.json',
      });
    });
  }

  async mockGetPendingReviewPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/_get/200_pending_review.json',
      });
    });
  }

  async mockPatchPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/_patch/200_Example_1.json',
      });
    });
  }

  async mockPatchStatus() {
    await this.page.route('*/**/api/plans/1/status', async (route) => {
      await route.fulfill({
        path: 'tests/api/plans/pid/status/_patch/request_Example_1.json',
      });
    });
  }
}
