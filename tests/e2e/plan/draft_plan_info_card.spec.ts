import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';
import { TouchpointsModule } from '../../fixtures/pages/Plan/Module_touchpoints';
import { RequestQuotationModal } from '../../fixtures/pages/Plan/RequestQuotationModal';

test.describe('A plan without a price but only template', () => {
  let planPage: PlanPage;
  test.beforeEach(async ({ page }, testinfo) => {
    testinfo.setTimeout(60000);
    planPage = new PlanPage(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlanWithTemplateWithoutPrice();
    await planPage.mockPatchPlan();

    await planPage.open();
  });

  test('does not show the info plan card', async () => {
    await expect(
      planPage.elements().draftPlanCardInfo().title()
    ).not.toBeVisible();
    await expect(
      planPage.elements().draftPlanCardInfo().templateType()
    ).not.toBeVisible();
    await expect(
      planPage.elements().draftPlanCardInfo().startingPrice()
    ).not.toBeVisible();
    await expect(
      planPage.elements().draftPlanCardInfo().priceWarning()
    ).not.toBeVisible();
  });
});
test.describe('A plan without a template and price', () => {
  let planPage: PlanPage;
  test.beforeEach(async ({ page }, testinfo) => {
    testinfo.setTimeout(60000);
    planPage = new PlanPage(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.mockPatchPlan();

    await planPage.open();
  });
  test('does not show the info plan card', async () => {
    await expect(
      planPage.elements().draftPlanCardInfo().title()
    ).not.toBeVisible();
    await expect(
      planPage.elements().draftPlanCardInfo().templateType()
    ).not.toBeVisible();
    await expect(
      planPage.elements().draftPlanCardInfo().startingPrice()
    ).not.toBeVisible();
    await expect(
      planPage.elements().draftPlanCardInfo().priceWarning()
    ).not.toBeVisible();
  });
});
test.describe('A plan with template and price', () => {
  let planPage: PlanPage;
  let requestQuotationModal: RequestQuotationModal;
  let touchpointsModule: TouchpointsModule;

  test.beforeEach(async ({ page }, testinfo) => {
    testinfo.setTimeout(60000);
    planPage = new PlanPage(page);
    requestQuotationModal = new RequestQuotationModal(page);
    touchpointsModule = new TouchpointsModule(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockGetWatchers();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlanWithTemplateAndPrice();
    await requestQuotationModal.mockPatchStatus();
    await planPage.mockPatchPlan();

    await planPage.open();
  });

  test("it's possible to add a module, and remove and still see the plan card info", async () => {
    await touchpointsModule.addModule();
    await expect(touchpointsModule.elements().module()).toBeVisible();
    await touchpointsModule.removeModule();
    await expect(touchpointsModule.elements().module()).not.toBeVisible();
    // Try to request a quote for the plan (should not throw validation error for deleted module)
    await planPage.elements().requestQuotationCTA().click();
    await requestQuotationModal.submitRequest();
    expect(planPage.elements().draftPlanCardInfo()).toBeDefined();
  });
});
