import { test, expect } from '../../fixtures/app';
import { BugPage } from '../../fixtures/Bug';

test.describe('Bug page', () => {
  let bugPage: BugPage;

  // open json mocked response

  test.beforeEach(async ({ page }) => {
    bugPage = new BugPage(page);
    await bugPage.loggedIn();
    await bugPage.mockPreferences();
    await bugPage.mockWorkspace();
    await bugPage.mockWorkspacesList();
    await bugPage.mockFunctionalCampaign();
    await bugPage.mockCustomStatuses();
    await bugPage.mockSeverities();
    await bugPage.mockUsecases();
    await bugPage.mockBugtypes();
  });

  test('shows the page header with a breadcrumb to go back to the buglist and bug id as title', async () => {
    await bugPage.mockBugs();
    await bugPage.mockBug();
    await bugPage.open();

    await expect(bugPage.elements().pageHeader()).toBeVisible();
    await expect(bugPage.elements().breadcrumb()).toBeVisible();
    await expect(bugPage.elements().linkToBugCollection()).toHaveAttribute(
      'href',
      '/campaigns/4997/bugs/'
    );
    await expect(bugPage.elements().pageHeader()).toContainText(
      `Bug ID: ${bugPage.bugIds.default}`
    );
  });

  test('does not show the full header with filter recap and pagination', async () => {
    await bugPage.mockBugs();
    await bugPage.mockBug();
    await bugPage.open();
    await expect(bugPage.elements().filtersDetailsButton()).not.toBeVisible();
    await expect(bugPage.elements().usecaseSelect()).not.toBeVisible();
    await expect(bugPage.elements().pagination()).not.toBeVisible();
  });

  test('When the defult querystring is present in the url, shows an header with a recap of applied conditions and a pagination', async ({
    page,
  }) => {
    await bugPage.mockBugs_unique_orderbySeverity_filterbyDuplicated();
    await bugPage.mockBug();
    await page.goto(
      `${bugPage.getUrl(bugPage.bugIds.default)}/${
        bugPage.querystrings
          .groupbyUsecase_unique_orderbySeverity_filterbyDuplicated
      }`
    );
    // Order by: Highest severity
    await expect(bugPage.elements().pageHeader()).toContainText(
      `${bugPage.i18n.t('__BUG_PAGE_HEADER_ORDERBY')}:${bugPage.i18n.t(
        '__BUG_PAGE_HEADER_HIGHEST_SEVERITY'
      )}`
    );
    // Applied filters 1
    await expect(bugPage.elements().pageHeader()).toContainText(
      `${bugPage.i18n.t('__BUG_PAGE_HEADER_FILTERS_APPLIED')}1`
    );
    await expect(bugPage.elements().filtersDetailsButton()).toBeVisible();
    // Group by: Use case - therefore a usecase select
    await expect(bugPage.elements().usecaseSelect()).toBeVisible();
    await expect(
      bugPage.elements().usecaseSelect().locator('input')
    ).toHaveValue('20883');
    // There are 8 bugs in the current usecase, so we should see "8 bugs"
    await expect(bugPage.elements().pageHeader()).toContainText('8 bugs');
    // Pagination
    await expect(bugPage.elements().pagination()).toBeVisible();
    await expect(bugPage.elements().paginationPrevious()).toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
  });
});
