import exp from 'constants';
import { test, expect } from '../../fixtures/app';
import { BugPage } from '../../fixtures/Bug';

test.describe('When a querystring is present in the url the Bug Page', () => {
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
    await bugPage.mockPriorities();
    await bugPage.mockTags();
    await bugPage.mockDevices();
    await bugPage.mockOs();
    await bugPage.mockUsecases();
    await bugPage.mockReplicabilities();
    await bugPage.mockBugtypes();
    await bugPage.mockBugs_unique_severityHigh_priorityMedium_statusPendingTodo();
    await bugPage.mockBug();
    await page.goto(
      `${bugPage.getUrl(bugPage.bugIds.todo)}/${
        bugPage.querystrings
          .groupbyState_unique_severityHigh_priorityMedium_statusPendingTodo
      }`
    );
  });
  test('shows an header with a recap of applied conditions and a pagination', async () => {
    await expect(bugPage.elements().pageHeader()).toContainText(
      `${bugPage.i18n.t('__BUG_PAGE_HEADER_FILTERS_APPLIED')}4`
    );
    await expect(bugPage.elements().pageHeader()).toContainText(
      `Bug ID: ${bugPage.bugIds.todo}`
    );
    await expect(bugPage.elements().pagination()).toBeVisible();
    await expect(bugPage.elements().paginationPrevious()).toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
    await expect(
      bugPage.elements().statusSelect().locator('input')
    ).toHaveValue('1');
  });
  test('The pagination works', async ({ page }) => {
    // Click on next page
    await bugPage.elements().paginationNext().click();
    await expect(bugPage.elements().paginationPrevious()).not.toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
    expect(page.url()).toContain(
      `${bugPage.getUrl(bugPage.bugIds.todo2)}${
        bugPage.querystrings
          .groupbyState_unique_severityHigh_priorityMedium_statusPendingTodo
      }`
    );
    // click back to the first page
    await bugPage.elements().paginationPrevious().click();
    await expect(bugPage.elements().paginationPrevious()).toBeDisabled();
    await expect(bugPage.elements().paginationNext()).not.toBeDisabled();
    expect(page.url()).toContain(
      `${bugPage.getUrl(bugPage.bugIds.todo)}${
        bugPage.querystrings
          .groupbyState_unique_severityHigh_priorityMedium_statusPendingTodo
      }`
    );
  });
  test('the status select change status in url and in page', async ({
    page,
  }) => {
    await bugPage.elements().statusSelect().click();
    await bugPage
      .elements()
      .statusSelect()
      .getByRole('option', { name: 'Pending' })
      .click();
    expect(page.url()).toContain(
      `${bugPage.getUrl(bugPage.bugIds.pending)}${
        bugPage.querystrings
          .groupbyState2_unique_severityHigh_priorityMedium_statusPendingTodo
      }`
    );
    await expect(
      bugPage.elements().statusSelect().locator('input')
    ).toHaveValue('2');
    await expect(bugPage.elements().pageHeader()).toContainText('1 bug');
    await expect(bugPage.elements().pageHeader()).toContainText(
      `Bug ID: ${bugPage.bugIds.pending}`
    );
    await expect(bugPage.elements().paginationPrevious()).toBeDisabled();
    await expect(bugPage.elements().paginationNext()).toBeDisabled();
  });
});
