import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class Templates extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `/templates`;
  }

  elements() {
    return {
      ...super.elements(),
      templateCard: () => this.page.getByTestId('template-card'),
      tailoredSection: () =>
        this.page.getByTitle(
          this.i18n.t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')
        ),
      unguessSection: () =>
        this.page.getByTitle(
          this.i18n.t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')
        ),
      planCreationInterface: () =>
        this.page.getByTestId('plan-creation-interface'),
      projectDropdown: () => this.page.getByTestId('project-dropdown'),
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
      navigationItem: () =>
        this.elements()
          .mainNavigation()
          .getByRole('menuitem', { name: this.i18n.t('Templates') }),
      pageNavigation: () => this.page.getByTestId('templates-nav'),
    };
  }

  async mockGetProjects() {
    await this.page.route('*/**/api/workspaces/1/projects*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/workspaces/wid/projects/_get/200_Example_1.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetTemplates() {
    await this.page.route('*/**/api/workspaces/1/templates*', async (route) => {
      if (route.request().method() === 'GET') {
        const url = route.request().url();
        if (url.includes('[isPromo]=1')) {
          await route.fulfill({
            path: 'tests/api/workspaces/wid/templates/_get/200_promo.json',
          });
        } else {
          await route.fulfill({
            path: 'tests/api/workspaces/wid/templates/_get/200_global_and_private_templates.json',
          });
        }
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetTemplatesWithoutPermissions() {
    await this.page.route('*/**/api/workspaces/1/templates*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 403,
          body: JSON.stringify({
            message: "Workspace doesn't exist or not accessible",
          }),
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetCategories() {
    await this.page.route('*/**/api/templates/categories', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/templates/categories/_get/200_Example_1.json',
        });
      } else {
        await route.fallback();
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
        await route.fallback();
      }
    });
  }
}
