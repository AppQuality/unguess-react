import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

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
      dropdown: () => this.page.getByTestId('project-dropdown'),
    };
  }

  async mockGetProjects() {
    await this.page.route('*/**/api/workspaces/1/projects*', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/_get/200_Example_1.json',
      });
    });
  }

  async mockGetTemplates() {
    await this.page.route('*/**/api/workspaces/1/templates*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/workspaces/wid/templates/_get/200_global_and_private_templates.json',
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
