import { type Page } from '@playwright/test';
import { UnguessPage } from '../../UnguessPage';

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
      confirmActivityCTA: () =>
        this.elements().pageHeader().getByTestId('confirm-activity-cta'),
      datesModule: () => this.page.getByTestId('dates-module'),
      datesModuleDatepicker: () =>
        this.elements().datesModule().getByTestId('dates-datepicker'),
      datesModuleError: () =>
        this.elements().datesModule().getByTestId('dates-error'),
      deletePlanActionItem: () => this.page.getByTestId('delete-action-item'),
      deletePlanModal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_TITLE'),
        }),
      deletePlanModalCancelCTA: () =>
        this.elements()
          .deletePlanModal()
          .getByText(
            this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CANCEL')
          ),
      deletePlanModalConfirmCTA: () =>
        this.elements()
          .deletePlanModal()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CONFIRM'),
          }),
      deletePlanModalTitle: () =>
        this.elements()
          .deletePlanModal()
          .getByText(this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_TITLE')),
      descriptionModule: () => this.page.getByTestId('description-module'),
      digitalLiteracyModule: () =>
        this.page.getByTestId('digital-literacy-module'),
      digitalLiteracyModuleErrorMessage: () =>
        this.page.getByTestId('literacy-error'),
      extraActionsMenu: () => this.page.getByTestId('extra-actions-menu'),
      goalModule: () => this.page.getByTestId('goal-module'),
      goalModuleError: () => this.page.getByTestId('goal-error'),
      goalModuleInput: () => this.page.getByRole('textbox'),
      instructionsTab: () => this.page.getByTestId('instructions-tab'),
      languageModule: () => this.page.getByTestId('language-module'),
      languageRadioInput: () =>
        this.elements().languageModule().getByRole('radio'),
      outOfScopeModule: () => this.page.getByTestId('out-of-scope-module'),
      outOfScopeModuleError: () => this.page.getByTestId('out-of-scope-error'),
      outOfScopeModuleInput: () =>
        this.elements().outOfScopeModule().getByRole('textbox'),
      pageHeader: () => this.page.getByTestId('plan-page-header'),
      requestQuotationCTA: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__PLAN_REQUEST_QUOTATION_CTA'),
        }),
      saveConfigurationCTA: () =>
        this.elements()
          .pageHeader()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_SAVE_CONFIGURATION_CTA'),
          }),
      setupTab: () => this.page.getByTestId('setup-tab'),
      summaryTab: () => this.page.getByTestId('summary-tab'),
      targetModule: () => this.page.getByTestId('target-module'),
      targetModuleError: () =>
        this.elements().targetModule().getByTestId('target-error'),
      targetModuleInput: () => this.page.getByTestId('target-input'),
      targetTab: () => this.page.getByTestId('target-tab'),
      titleModule: () =>
        this.elements().pageHeader().getByTestId('title-module'),
      titleModuleError: () =>
        this.elements().titleModule().getByTestId('title-error'),
      titleModuleInput: () =>
        this.elements().titleModule().getByTestId('title-input'),
      titleModuleOutput: () =>
        this.elements().titleModule().getByTestId('title-output'),
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

  async saveConfiguration() {
    const patchPromise = this.page.waitForResponse(
      (response) =>
        /\/api\/plans\/1/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await this.elements().saveConfigurationCTA().click();
    return patchPromise;
  }

  async mockGetDraftPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_draft_complete.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetDraftPlanWithDateError() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_draft_complete_date_error.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  // some modules are mandatory, in this api call we mock a plan with only mandatory modules
  async mockGetDraftWithOnlyMandatoryModulesPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_draft_mandatory_only.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  // some modules are mandatory, in this api call we mock a plan missing some mandatory modules
  async mockGetDraftWithMissingMandatoryModulesPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_draft_missing_mandatory.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetPendingReviewPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_pending_review.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockPatchPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_patch/200_draft_mandatory_only.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockDeletePlan(statusCode: number = 200) {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({
          status: statusCode,
          json: {},
        });
      } else {
        await route.fallback();
      }
    });
  }
}
