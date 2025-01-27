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
  test('shows an header with a recap of applied conditions and a pagination, the status select change status', async () => {
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
    await bugPage.elements().statusSelect().click();
    await bugPage
      .elements()
      .statusSelect()
      .getByRole('option', { name: 'Pending' })
      .click();
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
  test('if a filterby status is present and the user changes status to the displayed bug, the pagination should update', async ({
    page,
  }) => {});
});
