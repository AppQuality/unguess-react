import { type Page } from '@playwright/test';
import { UnguessPage } from '../../UnguessPage';
import { AgeModule } from './Module_age';
import { GenderModule } from './Module_gender';
import { GoalModule } from './Module_goal';
import { OutOfScopeModule } from './Module_out_of_scope';
import { DigitalLiteracyModule } from './Module_digital_literacy';
import { LanguageModule } from './Module_language';
import { TargetModule } from './Module_target';
import { TasksModule } from './Module_tasks';

export interface PlanModule {
  expectToBeReadonly(): Promise<void>;
  goToTab(): Promise<void>;
}

export class PlanPage extends UnguessPage {
  readonly page: Page;
  readonly modules: PlanModule[];

  constructor(page: Page) {
    super(page);
    this.modules = [
      new AgeModule(page),
      new GenderModule(page),
      new OutOfScopeModule(page),
      new GoalModule(page),
      new DigitalLiteracyModule(page),
      new LanguageModule(page),
      new TargetModule(page),
      new TasksModule(page),
    ];
    this.page = page;
    this.url = `plans/1`;
  }

  elements() {
    return {
      ...super.elements(),
      confirmActivityCTA: () =>
        this.elements()
          .pageHeader()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_CONFIRM_CTA'
            ),
          }),
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
      goToDashboardCTA: () =>
        this.elements()
          .pageHeader()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_GO_TO_CAMPAIGN_CTA'
            ),
          }),
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
      extraActionsMenu: () => this.page.getByTestId('extra-actions-menu'),
      pageHeader: () => this.page.getByTestId('plan-page-header'),
      tabInstructions: () => this.page.getByTestId('instructions-tab'),
      tabSetup: () => this.page.getByTestId('setup-tab'),
      tabSummary: () => this.page.getByTestId('summary-tab'),
      tabTarget: () => this.page.getByTestId('target-tab'),
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

  async expectAllModulesToBeReadonly() {
    for (const module of this.modules) {
      await module.goToTab();
      await module.expectToBeReadonly();
    }
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

  async mockGetPendingReviewPlan_WithoutQuote() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_pending_review_unquoted.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetPendingReviewPlan_WithQuote() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_pending_review_quoted.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetApprovedPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_approved.json',
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
