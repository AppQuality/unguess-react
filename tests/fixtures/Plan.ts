import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class PlanPage extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `temp/1`;
  }

  elements() {
    return {
      ...super.elements(),
      titleModule: () => this.page.getByTestId('title-module'),
      tasksModule: () => this.page.getByTestId('tasks-module'),
      datesModule: () => this.page.getByTestId('dates-module'),
      descriptionModule: () => this.page.getByTestId('description-module'),
      submitButton: () => this.page.getByRole('button', { name: 'Save' }),
      quoteButton: () =>
        this.page.getByRole('button', { name: 'Request Quotation' }),
    };
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
        path: 'tests/api/campaigns/cid/bugs/bid/_get/200_274852.json',
      });
    });
  }

  async mockPatchStatus() {
    await this.page.route(
      '*/**/api/workspaces/1/plans/1/status',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_274852.json',
        });
      }
    );
  }
}
