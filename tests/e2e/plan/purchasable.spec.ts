import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';
import { RequestQuotationModal } from '../../fixtures/pages/Plan/RequestQuotationModal';

test.describe('The module builder', () => {
  let planPage: PlanPage;
  let requestQuotationModal: RequestQuotationModal;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    requestQuotationModal = new RequestQuotationModal(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.mockGetRulesEvaluationNoError();
    await planPage.mockGetPlanCheckoutItem();
    await requestQuotationModal.mockPatchStatus();

    await planPage.open();
  });

  test('if submit request is clicked and the plan is purchasable check evaluation rules', async ({
    page,
  }) => {
    const getEval = page.waitForResponse(
      (response) =>
        /\/api\/plans\/1\/rules-evaluation/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await planPage.elements().requestQuotationCTA().click();
    const response = await getEval;
  });
  test('if evaluation rules are empty just show the buy modal', async () => {
    await planPage.elements().requestQuotationCTA().click();
    await expect(
      requestQuotationModal.elements().purchasablePlanRules()
    ).not.toBeVisible();
  });
});

test.describe('The module builder', () => {
  let planPage: PlanPage;
  let requestQuotationModal: RequestQuotationModal;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    requestQuotationModal = new RequestQuotationModal(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.mockGetRulesEvaluation();
    await planPage.mockGetPlanCheckoutItem();
    await requestQuotationModal.mockPatchStatus();

    await planPage.open();
  });

  test('if evaluation rules check fails then show purchasable plan rules component with relevant information', async ({
    i18n,
  }) => {
    await planPage.elements().requestQuotationCTA().click();
    await expect(
      requestQuotationModal.elements().purchasablePlanRules()
    ).toContainText(i18n.t('__PLAN_RULE_NUMBER_OF_MODULES'));
    await expect(
      requestQuotationModal.elements().purchasablePlanRules()
    ).not.toContainText(i18n.t('__PLAN_RULE_MODULE_TYPE'));
    await expect(
      requestQuotationModal.elements().purchasablePlanRules()
    ).not.toContainText(i18n.t('__PLAN_RULE_NUMBER_OF_TASKS'));
    await expect(
      requestQuotationModal.elements().purchasablePlanRules()
    ).not.toContainText(i18n.t('__PLAN_RULE_NUMBER_OF_TESTERS'));
    await expect(
      requestQuotationModal.elements().purchasablePlanRules()
    ).not.toContainText(i18n.t('__PLAN_RULE_TASK_TYPE'));
  });
});
