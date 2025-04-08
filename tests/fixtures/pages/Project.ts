import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';
import apiProjectsCampaigns from '../../api/projects/pid/campaigns/_get/200_Example_Project_Campaigns.json';

export class Project extends UnguessPage {
  readonly page: Page;

  readonly url = 'projects/1';

  readonly projectCampaigns = apiProjectsCampaigns.items;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      projectsTable: () =>
        this.page.getByRole('rowgroup', {
          name: 'project-campaigns-table-body',
        }),
      projectsTableItems: () =>
        this.elements().projectsTable().getByRole('row'),
      projectsCardList: () =>
        this.page.getByRole('list', { name: 'project-campaigns-card-list' }),
      projectCardListItems: () =>
        this.elements().projectsCardList().getByRole('listitem'),
    };
  }

  async mockEmptyProject() {
    await this.page.route('*/**/api/projects/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/pid/_get/200_Example_1.json',
      });
    });
  }

  async mockProject() {
    await this.page.route('*/**/api/projects/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/pid/_get/200_Example_Project.json',
      });
    });
  }

  async mockProjectCampaigns() {
    await this.page.route('*/**/api/projects/1/campaigns*', async (route) => {
      await route.fulfill({
        path: 'tests/api/projects/pid/campaigns/_get/200_Example_Project_Campaigns.json',
      });
    });
  }

  async mockworkspacesPlans() {
    await this.page.route('*/**/api/workspaces/1/plans*', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/plans/_get/200_Example_1.json',
      });
    });
  }

  async mockworkspacesCampaigns() {
    await this.page.route('*/**/api/workspaces/1/campaigns*', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/campaigns/_get/200_Example_1.json',
      });
    });
  }
}
