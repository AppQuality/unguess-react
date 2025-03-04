import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

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
      titleModule: () => this.page.getByTestId('title-module'),
      tasksModule: () => this.page.getByTestId('tasks-module'),
      datesModule: () => this.page.getByTestId('dates-module'),
      datesModuleInput: () =>
        this.elements().datesModule().getByRole('textbox'),
      datesModuleChangeVariant: () =>
        this.elements().datesModule().getByTestId('change-variant'),
      datesModuleError: () =>
        this.elements().datesModule().getByTestId('dates-error'),
      datesModuleRemove: () =>
        this.elements()
          .datesModule()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_REMOVE_MODULE_CTA'),
          }),
      descriptionModule: () => this.page.getByTestId('description-module'),
      saveConfigurationCTA: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__PLAN_SAVE_CONFIGURATION_CTA'),
        }),
      requestQuotationCTA: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__PLAN_REQUEST_QUOTATION_CTA'),
        }),
      requestQuotationErrorMessage: () =>
        this.page.getByTestId('request-quotation-error-message'),
    };
  }

  getDateFromPlan(plan: any) {
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

  async mockGetDraftPlan() {
    await this.page.route('*/**/api/workspaces/1/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/plans/pid/_get/200_draft_complete.json',
      });
    });
  }

  // some modules are mandatory, in this api call we mock a plan with only mandatory modules
  async mockGetDraftWithOnlyMandatoryModulesPlan() {
    await this.page.route('*/**/api/workspaces/1/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/plans/pid/_get/200_draft_mandatory_only.json',
      });
    });
  }

  // some modules are mandatory, in this api call we mock a plan missing some mandatory modules
  async mockGetDraftWithMissingMandatoryModulesPlan() {
    await this.page.route('*/**/api/workspaces/1/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/plans/pid/_get/200_draft_missing_mandatory.json',
      });
    });
  }

  async mockGetPendingReviewPlan() {
    await this.page.route('*/**/api/workspaces/1/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/plans/pid/_get/200_pending_review.json',
      });
    });
  }

  async mockPatchPlan() {
    await this.page.route('*/**/api/workspaces/1/plans/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/plans/pid/_patch/200_Example_1.json',
      });
    });
  }

  async mockPatchStatus() {
    await this.page.route(
      '*/**/api/workspaces/1/plans/1/status',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/workspaces/wid/plans/pid/status/_patch/request_Example_1.json',
        });
      }
    );
  }
}
