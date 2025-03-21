import { type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';
import userResponse from '../api/users/me/_get/200_Users_Me_example.json';

interface LoggedInParams {
  addFeatures?: any[];
  userRole?: string;
}

export class UnguessPage {
  readonly page: Page;

  readonly i18n: i18n;

  url = '/';

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  async open() {
    await this.page.goto(this.url);
  }

  async loggedIn({ addFeatures = [], userRole = '' }: LoggedInParams = {}) {
    if (userRole) {
      userResponse.role = userRole;
    }
    userResponse.features = [...userResponse.features, ...addFeatures];
    await this.page.route('*/**/api/users/me', async (route) => {
      await route.fulfill({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userResponse),
      });
    });
  }

  async mockWorkspace() {
    await this.page.route('*/**/api/workspaces/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/_get/200_demo_internal.json',
      });
    });
  }

  async mockWorkspacesList() {
    await this.page.route(
      '*/**/api/workspaces?orderBy=company',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/workspaces/_get/200_orderby_company.json',
        });
      }
    );
  }

  async mocksharedWorkspacesList() {
    await this.page.route(
      '*/**/api/workspaces?orderBy=company',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/workspaces/_get/200_shared.json',
        });
      }
    );
  }

  async mockPreferences() {
    await this.page.route('*/**/api/users/me/preferences', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/me/preferences/_get/200_Example_1.json',
      });
    });
  }

  async mockFunctionalCampaign() {
    await this.page.route('*/**/api/campaigns/4997', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/_get/200_Bughunting.json',
      });
    });
  }

  async mockExperientialCampaign() {
    await this.page.route('*/**/api/campaigns/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/_get/200_Example_1.json',
      });
    });
  }

  // todo: mock this call, not mandatory for the time being
  async mockProjects() {
    await this.page.route('*/**/api/workspaces/1/projects', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/_get/200_demo_internal.json',
      });
    });
  }

  // todo: mock this call, not mandatory for the time being
  async mockUsers() {
    await this.page.route('*/**/api/users', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/_get/200_demo_internal.json',
      });
    });
  }

  // todo: mock this call, not mandatory for the time being
  async mockArchive() {
    await this.page.route('*/**/api/archive', async (route) => {
      await route.fulfill({
        path: 'tests/api/archive/_get/200_demo_internal.json',
      });
    });
  }

  elements() {
    return {
      title: () => this.page.getByRole('heading', { level: 1 }),
    };
  }
}
