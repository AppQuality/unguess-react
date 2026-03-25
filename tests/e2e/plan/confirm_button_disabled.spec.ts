import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';
import { RequestQuotationModal } from '../../fixtures/pages/Plan/RequestQuotationModal';

test.describe('The confirm button should be disabled while the API call is in progress', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
  });

  test('confirm button in header is disabled after click until mutation resolves', async ({
    page,
  }) => {
    await planPage.mockGetPendingReviewPlan_WithQuote();

    // Mock PATCH status with a delay to observe the disabled state
    await page.route('*/**/api/plans/1/status', async (route) => {
      if (route.request().method() === 'PATCH') {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 1000);
        });
        await route.fulfill({
          status: 200,
          json: { status: 'approved' },
        });
      } else {
        await route.fallback();
      }
    });

    await planPage.open();

    const confirmButton = planPage.elements().confirmActivityCTA();
    await expect(confirmButton).toBeEnabled();

    await confirmButton.click();
    await expect(confirmButton).toBeDisabled();
  });
});

test.describe('The confirm button in SendRequestModal should be disabled while the API call is in progress', () => {
  let planPage: PlanPage;
  let requestQuotationModal: RequestQuotationModal;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    requestQuotationModal = new RequestQuotationModal(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockWorkspaceUsers();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.mockPatchPlan();
  });

  test('submit button in modal is disabled after click until mutation resolves', async ({
    page,
  }) => {
    // Mock PUT watchers with a delay so the button stays visible and disabled
    await page.route('*/**/api/plans/1/watchers*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/watchers/_get/200_Example_1.json',
        });
      } else if (route.request().method() === 'PUT') {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 1000);
        });
        await route.fulfill({
          status: 200,
          body: JSON.stringify({}),
        });
      } else {
        await route.fallback();
      }
    });

    // Mock PATCH status (will be called after watchers resolve)
    await page.route('*/**/api/plans/1/status', async (route) => {
      if (route.request().method() === 'PATCH') {
        await route.fulfill({
          status: 200,
          json: { status: 'pending_review' },
        });
      } else {
        await route.fallback();
      }
    });

    await planPage.open();

    // Click request quotation to open the modal
    await planPage.elements().requestQuotationCTA().click();

    const submitButton = requestQuotationModal.elements().submitCTA();
    await expect(submitButton).toBeEnabled();

    await submitButton.click();
    await expect(submitButton).toBeDisabled();
  });
});
