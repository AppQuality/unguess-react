import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import apiPostPlans from '../../api/workspaces/wid/plans/_post/201_Example_1.json';
import apiPostProjects from '../../api/projects/_post/200_Example_1.json';
import apiGetProjects from '../../api/workspaces/wid/projects/_get/200_Example_1.json';

export class PlanCreationInterface {
  readonly page: Page;

  readonly testId = 'plan-creation-interface';

  readonly i18n: i18n;

  readonly postPlans = apiPostPlans;

  readonly projectName = apiGetProjects.items[0].name;

  readonly projectId = apiGetProjects.items[0].id;

  readonly newProjectName = apiPostProjects.name;

  readonly newProjectId = apiPostProjects.id;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      planCreationInterface: () => this.page.getByTestId(this.testId),
      projectDropdown: () => this.page.getByTestId('project-dropdown'),
      projectDropdownInput: () =>
        this.elements()
          .projectDropdown()
          .getByPlaceholder(
            this.i18n.t('__PLAN_CREATION_PROJECT_DROPDOWN_PLACEHOLDER')
          ),
      confirmButton: () =>
        this.elements()
          .planCreationInterface()
          .getByRole('button', {
            name: this.i18n.t('__TEMPLATES_DRAWER_FOOTER_CONFIRM_BUTTON'),
          }),
      moreInfoButton: () =>
        this.elements()
          .planCreationInterface()
          .getByRole('button', {
            name: this.i18n.t('__TEMPLATES_DRAWER_FOOTER_INFO_BUTTON'),
          }),
      errorMessage: () =>
        this.elements().planCreationInterface().getByTestId('error-message'),
    };
  }

  async createPlan() {
    const response = this.page.waitForResponse(
      (resp) =>
        /\/api\/workspaces\/1\/plans/.test(resp.url()) &&
        resp.status() === 200 &&
        resp.request().method() === 'POST'
    );
    await this.elements().confirmButton().click();
    return response;
  }

  async selectProject() {
    await this.elements().projectDropdown().click();
    await this.page.getByRole('option', { name: this.projectName }).click();
  }

  async createProject() {
    const response = this.page.waitForResponse(
      (resp) =>
        /\/api\/project/.test(resp.url()) &&
        resp.status() === 200 &&
        resp.request().method() === 'POST'
    );
    await this.elements().projectDropdown().click();
    await this.elements().projectDropdownInput().fill(this.newProjectName);
    await this.page
      .getByRole('option', { name: `Add "${this.newProjectName}"` })
      .click();
    return response;
  }

  async mockGetProjects() {
    await this.page.route('*/**/api/workspaces/1/projects*', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/_get/200_Example_1.json',
      });
    });
  }

  async mockPostProject() {
    await this.page.route('*/**/api/projects', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          path: 'tests/api/projects/_post/200_Example_1.json',
        });
      } else {
        await route.continue();
      }
    });
  }

  async mockPostPlans() {
    await this.page.route('*/**/api/workspaces/1/plans', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          path: 'tests/api/workspaces/wid/plans/_post/201_Example_1.json',
        });
      } else {
        await route.continue();
      }
    });
  }
}
