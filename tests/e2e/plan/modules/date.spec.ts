import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { RequestQuotationModal } from '../../../fixtures/pages/Plan/RequestQuotationModal';

test.describe('The title module defines the Plan title.', () => {
  let planPage: PlanPage;
  let requestQuotationModal: RequestQuotationModal;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    requestQuotationModal = new RequestQuotationModal(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockPatchPlan();
  });
  test.describe('With valid date', () => {
    test.beforeEach(async ({ page }) => {
      planPage = new PlanPage(page);
      requestQuotationModal = new RequestQuotationModal(page);
      await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
      await planPage.open();
    });
    test('It should be visible after opening a request quotation', async () => {
      await expect(
        requestQuotationModal.elements().datesModule()
      ).not.toBeVisible();
      await planPage.elements().requestQuotationCTA().click();
      await expect(
        requestQuotationModal.elements().datesModule()
      ).toBeVisible();
    });
  });
  test.describe('With invalid date', () => {
    test.beforeEach(async ({ page }) => {
      planPage = new PlanPage(page);
      requestQuotationModal = new RequestQuotationModal(page);
      await planPage.mockGetDraftWithInvalidDatePlan();
      await planPage.open();
    });
    test('It should be at least one day in the future to request a quote', async ({
      i18n,
    }) => {
      await planPage.elements().requestQuotationCTA().click();
      await requestQuotationModal.elements().datesModule().click();
      await planPage.page.keyboard.press('Tab');
      await expect(
        requestQuotationModal.elements().datesModuleError()
      ).toBeVisible();
      await expect(
        requestQuotationModal.elements().datesModuleError()
      ).toHaveText(i18n.t('__PLAN_DATE_IN_FUTURE_ERROR'));
    });
  });
});
