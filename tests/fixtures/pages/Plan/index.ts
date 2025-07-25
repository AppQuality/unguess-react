import { type Page } from '@playwright/test';
import { UnguessPage } from '../../UnguessPage';
import { AgeModule } from './Module_age';
import { BankModule } from './Module_bank';
import { DigitalLiteracyModule } from './Module_digital_literacy';
import { ElectricityModule } from './Module_electricity';
import { GasModule } from './Module_gas';
import { GenderModule } from './Module_gender';
import { GoalModule } from './Module_goal';
import { IncomeModule } from './Module_income';
import { LanguageModule } from './Module_language';
import { LocalityModule } from './Module_locality';
import { OutOfScopeModule } from './Module_out_of_scope';
import { TargetModule } from './Module_target';
import { TasksModule } from './Module_tasks';
import { TouchpointsModule } from './Module_touchpoints';

interface TabModule {
  expectToBeReadonly(): Promise<void>;
  goToTab(): Promise<void>;
}
export class PlanPage extends UnguessPage {
  readonly page: Page;

  readonly modules: { [index: string]: TabModule };

  constructor(page: Page) {
    super(page);
    this.modules = {
      touchpoints: new TouchpointsModule(page),
      age: new AgeModule(page),
      gender: new GenderModule(page),
      outOfScope: new OutOfScopeModule(page),
      goal: new GoalModule(page),
      digitalLiteracy: new DigitalLiteracyModule(page),
      language: new LanguageModule(page),
      target: new TargetModule(page),
      tasks: new TasksModule(page),
      locality: new LocalityModule(page),
      income: new IncomeModule(page),
      bank: new BankModule(page),
      electricity: new ElectricityModule(page),
      gas: new GasModule(page),
    };
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
      saveTemplateCard: () => this.page.getByTestId('save-template-card'),
      saveTemplateModalQuoteBox: () =>
        this.elements()
          .savePlanModal()
          .getByTestId('save-as-template-quote-box'),
      saveTemplateCardCTA: () =>
        this.elements().saveTemplateCard().getByRole('button'),
      savePlanActionItem: () =>
        this.page.getByTestId('save-template-action-item'),
      deletePlanModal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_TITLE'),
        }),
      savePlanModal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_TITLE'),
        }),
      deletePlanModalCancelCTA: () =>
        this.elements()
          .deletePlanModal()
          .getByText(
            this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CANCEL')
          ),
      savePlanModalCancelCTA: () =>
        this.elements()
          .savePlanModal()
          .getByText(
            this.i18n.t('__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CANCEL')
          ),
      deletePlanModalConfirmCTA: () =>
        this.elements()
          .deletePlanModal()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_BUTTON_CONFIRM'),
          }),
      savePlanModalConfirmCTA: () =>
        this.elements()
          .savePlanModal()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CONFIRM'
            ),
          }),
      savePlanModalContinueSetupCTA: () =>
        this.elements()
          .savePlanModal()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_CONTINUE_SETUP'
            ),
          }),
      savePlanModalGoToTemplatesCTA: () =>
        this.elements()
          .savePlanModal()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_SAVE_AS_TEMPLATE_MODAL_BUTTON_VIEW_TEMPLATES'
            ),
          }),
      deletePlanModalTitle: () =>
        this.elements()
          .deletePlanModal()
          .getByText(this.i18n.t('__PLAN_PAGE_DELETE_PLAN_MODAL_TITLE')),
      savePlanModalTitle: () =>
        this.elements()
          .savePlanModal()
          .getByText(this.i18n.t('SAVE_AS_TEMPLATE_FORM_TITLE')),
      saveAsTemplateFormStep: () =>
        this.page.getByTestId('save-as-template-form-step'),
      saveAsTemplateSuccessStep: () =>
        this.page.getByTestId('save-as-template-success-step'),
      descriptionModule: () => this.page.getByTestId('description-module'),
      extraActionsMenu: () => this.page.getByTestId('extra-actions-menu'),
      pageHeader: () => this.page.getByTestId('plan-page-header'),
      removeModuleModal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_TITLE'),
        }),
      removeModuleModalConfirm: () =>
        this.elements()
          .removeModuleModal()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_MODUL_GENERAL_REMOVE_MODAL_CONFIRM'),
          }),
      tabInstructions: () => this.page.getByTestId('instructions-tab'),
      tabSetup: () => this.page.getByTestId('setup-tab'),
      tabSummary: () => this.page.getByTestId('summary-tab'),
      tabTarget: () => this.page.getByTestId('target-tab'),
      targetNavigation: () => this.page.getByTestId('plans-nav-target'),
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
    // tab setup
    this.elements().tabSetup().click();
    await Promise.all([this.modules.goal.expectToBeReadonly()]);

    // tab target
    this.elements().tabTarget().click();
    await Promise.all([
      this.modules.target.expectToBeReadonly(),
      this.modules.age.expectToBeReadonly(),
      this.modules.gender.expectToBeReadonly(),
      this.modules.digitalLiteracy.expectToBeReadonly(),
      this.modules.language.expectToBeReadonly(),
      this.modules.locality.expectToBeReadonly(),
      this.modules.income.expectToBeReadonly(),
      this.modules.bank.expectToBeReadonly(),
      this.modules.electricity.expectToBeReadonly(),
      this.modules.gas.expectToBeReadonly(),
    ]);

    // tab instructions
    this.elements().tabInstructions().click();
    await Promise.all([
      this.modules.outOfScope.expectToBeReadonly(),
      this.modules.tasks.expectToBeReadonly(),
    ]);
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

  async mockGetTemplates() {
    await this.page.route('*/**/api/workspaces/1/templates*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/workspaces/wid/templates/_get/200_global_and_private_templates.json',
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
          body: JSON.stringify({}),
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockSaveTemplate() {
    await this.page.route('*/**/api/workspaces/*/templates', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          body: JSON.stringify({}),
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
