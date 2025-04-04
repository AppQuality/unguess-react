import { test, expect } from '../../fixtures/app';
import { BugPage } from '../../fixtures/pages/Bug';

test.describe('When the defult querystring is present in the Bug Page url', () => {
  let bugPage: BugPage;

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
    await bugPage.mockBugs_unique_orderbySeverity_filterbyDuplicated();
    await bugPage.mockBug();
    await page.goto(
      `${bugPage.getUrl(bugPage.bugIds.default)}/${
        bugPage.querystrings.default
      }`
    );
  });

  test('A recap of applied conditions and a pagination are displayed in the Header', async () => {
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

  test('The pagination works', async ({ page }) => {
    // Click on next page
    await bugPage.elements().paginationNext().click();
    await expect(bugPage.elements().paginationPrevious()).not.toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
    expect(page.url()).toContain(
      `${bugPage.getUrl(bugPage.bugIds.default2)}${
        bugPage.querystrings.default
      }`
    );
    // click back to the first page
    await bugPage.elements().paginationPrevious().click();
    await expect(bugPage.elements().paginationPrevious()).toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
    expect(page.url()).toContain(
      `${bugPage.getUrl(bugPage.bugIds.default)}${bugPage.querystrings.default}`
    );
  });

  // the usecase select should change the url
  test('The usecase select works', async ({ page }) => {
    await bugPage.elements().usecaseSelect().click();
    await bugPage
      .elements()
      .usecaseSelect()
      .getByRole('option', { name: 'USE CASE 3: Apertura conto “Start”' })
      .click();

    expect(page.url()).toContain(
      `${bugPage.getUrl(bugPage.bugIds.defaultUsecase3)}${
        bugPage.querystrings.defaultUsecase3
      }`
    );

    await expect(
      bugPage.elements().usecaseSelect().locator('input')
    ).toHaveValue('20884');
    await expect(bugPage.elements().pageHeader()).toContainText('54 bugs');
    await expect(bugPage.elements().pagination()).toBeVisible();
    await expect(bugPage.elements().paginationPrevious()).toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
    await expect(bugPage.elements().pageHeader()).toContainText(
      `Bug ID: ${bugPage.bugIds.defaultUsecase3}`
    );
  });
});
