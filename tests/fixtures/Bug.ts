import { type Page } from '@playwright/test';
import { UnguessPage } from './UnguessPage';

export class BugPage extends UnguessPage {
  readonly page: Page;

  readonly querystrings: {
    default: string;
    defaultUsecase3: string;
    groupbyState_unique_severityHigh_priorityMedium_statusPendingTodo: string;
    groupbyState2_unique_severityHigh_priorityMedium_statusPendingTodo: string;
  };

  readonly bugIds: {
    default: string;
    default2: string;
    defaultUsecase3: string;
    todo: string;
    todo2: string;
    pending: string;
  };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.bugIds = {
      default: '274852',
      default2: '275006',
      defaultUsecase3: '274875',
      todo: '274888',
      todo2: '275021',
      pending: '274852',
    };
    this.url = `campaigns/4997/bugs/${this.bugIds.default}`;
    this.querystrings = {
      default:
        '?order=DESC&orderBy=severity_id&groupBy=usecase&groupByValue=20883&unread=false&unique=true',
      defaultUsecase3:
        '?order=DESC&orderBy=severity_id&groupBy=usecase&groupByValue=20884&unread=false&unique=true',
      groupbyState_unique_severityHigh_priorityMedium_statusPendingTodo:
        '?order=DESC&orderBy=severity_id&groupBy=bugState&groupByValue=1&severities=HIGH&unread=false&unique=true&priorities=medium&customStatuses=1&customStatuses=2',
      groupbyState2_unique_severityHigh_priorityMedium_statusPendingTodo:
        '?order=DESC&orderBy=severity_id&groupBy=bugState&groupByValue=2&severities=HIGH&unread=false&unique=true&priorities=medium&customStatuses=1&customStatuses=2',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getUrl(id: string) {
    return `campaigns/4997/bugs/${id}`;
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
      statusSelect: () =>
        this.elements().pageHeader().getByTestId('status-select'),
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
    await this.page.route(
      '*/**/api/campaigns/4997/bugs/274875',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_274875.json',
        });
      }
    );
    await this.page.route(
      '*/**/api/campaigns/4997/bugs/274888',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_274888.json',
        });
      }
    );
    await this.page.route(
      '*/**/api/campaigns/4997/bugs/275006',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_275006.json',
        });
      }
    );
    await this.page.route(
      '*/**/api/campaigns/4997/bugs/275021',
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/bid/_get/200_275021.json',
        });
      }
    );
  }

  async mockBugs() {
    await this.page.route('*/**/api/campaigns/4997/bugs*', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/bugs/_get/200_allbugs.json',
      });
    });
  }

  async mockBugs_unique_orderbySeverity_filterbyDuplicated() {
    // mock initial calls
    await this.page.route(
      // https://dev.unguess.io/api/campaigns/4997/bugs?order=DESC&orderBy=severity_id&filterBy[usecases]=&filterBy[types]=&filterBy[replicabilities]=&filterBy[os]=&filterBy[devices]=&filterBy[tags]=&filterBy[severities]=&filterBy[priorities]=&filterBy[is_duplicated]=0&filterBy[customStatuses]=
      // eslint-disable-next-line security/detect-unsafe-regex
      /\/api\/campaigns\/4997\/bugs\?order=DESC&orderBy=severity_id(&filterBy\[[^\]]+\]=[^&]*)+/,
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/_get/200_unique_orderbySeverity_filterbyDuplicated.json',
        });
      }
    );
  }

  async mockBugs_unique_severityHigh_priorityMedium_statusPendingTodo() {
    // mock initial calls
    await this.page.route(
      // https://dev.unguess.io/api/campaigns/4997/bugs?order=DESC&orderBy=severity_id&filterBy[usecases]=&filterBy[types]=&filterBy[replicabilities]=&filterBy[devices]=&filterBy[tags]=&filterBy[severities]=3&filterBy[priorities]=3&filterBy[customStatuses]=1%2C2&filterBy[is_duplicated]=0
      /\/api\/campaigns\/4997\/bugs\?(?:order=DESC&)?(?:orderBy=severity_id&)?(?:filterBy\[usecases\]=&)?(?:filterBy\[types\]=&)?(?:filterBy\[replicabilities\]=&)?(?:filterBy\[devices\]=&)?(?:filterBy\[tags\]=&)?(?:filterBy\[severities\]=3&)?(?:filterBy\[priorities\]=3&)?(?:filterBy\[customStatuses\]=1%2C2&)?(?:filterBy\[is_duplicated\]=0)?/,
      async (route) => {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/bugs/_get/200_unique_severityHigh_priorityMedium_statusPendingTodo.json',
        });
      }
    );
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
