import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class Template extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `/templates/1`;
  }

  elements() {
    return {
      ...super.elements(),
      launchActivityButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('__TEMPLATE_LAUNCH_ACTIVITY_BUTTON'),
        }),
      planCreationInterface: () =>
        this.page.getByTestId('plan-creation-interface'),
      projectDropdown: () => this.page.getByTestId('project-dropdown'),
      confirmButton: () =>
        this.elements()
          .planCreationInterface()
          .getByRole('button', {
            name: this.i18n.t('__TEMPLATES_DRAWER_FOOTER_CONFIRM_BUTTON'),
          }),
      errorMessage: () =>
        this.elements().planCreationInterface().getByTestId('error-message'),
    };
  }

  static getTemplateTitle(data: any) {
    return data.strapi?.title || data.name;
  }

  async mockGetTemplate() {
    await this.page.route(
      '*/**/api/workspaces/1/templates/1',
      async (route) => {
        if (route.request().method() === 'GET') {
          await route.fulfill({
            path: 'tests/api/workspaces/wid/templates/tid/_get/200_Example_1.json',
          });
        } else {
          await route.continue();
        }
      }
    );
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
