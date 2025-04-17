import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';
import apiProjectsCampaigns from '../../api/projects/pid/campaigns/_get/200_Example_Project_Campaigns.json';
import emptyArchive from '../../api/workspaces/wid/projects/pid/_get/200_Archived_Empty_Project.json';

export class Archive extends UnguessPage {
  readonly page: Page;

  readonly url = 'projects/1';

  readonly projectCampaigns = apiProjectsCampaigns.items;

  readonly emptyArchive = emptyArchive;

  readonly campaignCount = this.projectCampaigns.length;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      emptyState1: () =>
        this.page.getByText(this.i18n.t('__DASHBOARD_EMPTY_ARCHIVE_TITLE')),
      emptyState2: () =>
        this.page.getByText(this.i18n.t('__DASHBOARD_EMPTY_ARCHIVE_TITLE')),
      campaignTable: () =>
        this.page.getByRole('table', { name: 'project-campaigns-table' }),
      campaignRow: () => this.elements().campaignTable().getByRole('row'),
    };
  }

  async mockEmptyArchive() {
    await this.page.route('*/**/api/projects/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/pid/_get/200_Archived_Empty_Project.json',
      });
    });
  }

  async mockArchive() {
    await this.page.route('*/**/api/projects/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/workspaces/wid/projects/pid/_get/200_Archived_Project.json',
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
}
