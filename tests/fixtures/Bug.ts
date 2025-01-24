import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class BugPage extends UnguessPage {
  readonly page: Page;

  readonly querystrings: { default: string };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = 'campaigns/4997/bugs/274852';
    this.querystrings = {
      default:
        '?order=DESC&orderBy=severity_id&groupBy=usecase&groupByValue=20883&unread=false&unique=true',
    };
  }

  elements() {
    return {
      ...super.elements(),
      pageHeader: () => this.page.getByTestId('page-header'),
      breadcrumb: () =>
        this.elements()
          .pageHeader()
          .getByRole('navigation', { name: 'Breadcrumbs' }),
      linkToBugCollection: () =>
        this.elements()
          .breadcrumb()
          .getByRole('link', {
            name: this.i18n.t('__PAGE_TITLE_BUGS_COLLECTION'),
          }),
      filtersDetailsButton: () =>
        this.elements()
          .pageHeader()
          .getByRole('button', { name: 'Filters details' }),
      usecaseSelect: () =>
        this.elements().pageHeader().getByTestId('usecase-select'),
      pagination: () =>
        this.elements()
          .pageHeader()
          .getByRole('navigation', { name: 'Cursor pagination' }),
      paginationPrevious: () =>
        this.elements()
          .pagination()
          .getByRole('button', { name: this.i18n.t('__LIST_PAGE_PREVIOUS') }),
      paginationNext: () =>
        this.elements()
          .pagination()
          .getByRole('button', { name: this.i18n.t('__LIST_PAGE_NEXT') }),
      bugContainer: () => this.page.locator('#container'),
    };
  }

  async mockBug() {
    await this.page.route(
      '*/**/api/campaigns/4997/bugs/274852',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_274852.json',
        });
      }
    );
  }

  async mockBugs() {
    // mock initial calls
    await this.page.route(
      '*/**/api/campaigns/4997/bugs?order=DESC&orderBy=severity_id&filterBy[usecases]=&filterBy[types]=&filterBy[replicabilities]=&filterBy[os]=&filterBy[devices]=&filterBy[tags]=&filterBy[severities]=&filterBy[priorities]=&filterBy[is_duplicated]=0&filterBy[customStatuses]=',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/_get/200_orderbySeverity_filterbyDuplicated.json',
        });
      }
    );
    await this.page.route(
      '*/**/api/campaigns/4997/bugs?order=DESC&orderBy=severity_id',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/_get/200_allbugs.json',
        });
      }
    );
    await this.page.route('*/**/api/campaigns/4997/bugs', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/bugs/_get/200_allbugs.json',
      });
    });
  }

  async mockCustomStatuses() {
    await this.page.route(
      '*/**/api/campaigns/4997/custom_statuses',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/custom_statuses/_get/200_custom_statuses.json',
        });
      }
    );
  }

  async mockSeverities() {
    await this.page.route(
      '*/**/api/campaigns/4997/severities',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/severities/_get/200_severities.json',
        });
      }
    );
  }

  async mockPriorities() {
    await this.page.route(
      '*/**/api/campaigns/4997/priorities',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/priorities/_get/200_Example_2.json',
        });
      }
    );
  }

  async mockTags() {
    await this.page.route('*/**/api/campaigns/4997/tags', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/tags/_get/200_Example_2.json',
      });
    });
  }

  async mockDevices() {
    await this.page.route('*/**/api/campaigns/4997/devices', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/devices/_get/200_Example_2.json',
      });
    });
  }

  async mockOs() {
    await this.page.route('*/**/api/campaigns/4997/os', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/os/_get/200_Example_2.json',
      });
    });
  }

  async mockReplicabilities() {
    await this.page.route(
      '*/**/api/campaigns/4997/replicabilities',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/replicabilities/_get/200_Example_1.json',
        });
      }
    );
  }

  async mockUsecases() {
    await this.page.route('*/**/api/campaigns/4997/usecases', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/usecases/_get/200_usecases.json',
      });
    });
    await this.page.route(
      '*/**/api/campaigns/4997/usecases?filterBy=bugs',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/usecases/_get/200_usecases_filterByBugs.json',
        });
      }
    );
  }

  async mockBugtypes() {
    await this.page.route('*/**/api/campaigns/4997/bugTypes', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/bugTypes/_get/200_bugtypes.json',
      });
    });
  }
}
