import examplePatch from '../../api/plans/pid/_patch/request_Example_1.json';
import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';
import { TouchpointsModule } from '../../fixtures/pages/Plan/Module_touchpoints';
import { RequestQuotationModal } from '../../fixtures/pages/Plan/RequestQuotationModal';

test.describe('The module builder', () => {
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
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await requestQuotationModal.mockPatchStatus();
    await planPage.mockPatchPlan();

    await planPage.open();
  });

  test('has a list of saved modules and not the others, a save button, a request quote cta and a dots menu cta', async () => {
    await expect(planPage.elements().titleModule()).toBeVisible();
    await expect(planPage.elements().saveConfigurationCTA()).not.toBeDisabled();
    await expect(planPage.elements().requestQuotationCTA()).not.toBeDisabled();
    await expect(planPage.elements().confirmActivityCTA()).not.toBeVisible();
    await expect(planPage.elements().goToDashboardCTA()).not.toBeVisible();
    await expect(planPage.elements().extraActionsMenu()).not.toBeDisabled();
  });

  test("The summary Tab isn't clickable", async () => {
    await expect(planPage.elements().tabSummary()).toBeVisible();
    await expect(planPage.elements().tabSummary()).toBeDisabled();
  });

  test('Clicking save button validate the current modules configurations and calls the PATCH Plan', async ({
    page,
  }) => {
    const patchPromise = page.waitForResponse(
      (response) =>
        /\/api\/plans\/1/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );

    // todo: come up with some common usecases in qhich the user perform some changes to the form, then click the submit button
    await planPage.elements().saveConfigurationCTA().click();
    const response = await patchPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
  });

  test('if confirmation calls the PATCH Plan', async ({ page }) => {
    const patchPromise = page.waitForResponse(
      (response) =>
        /\/api\/plans\/1/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await planPage.elements().requestQuotationCTA().click();
    await requestQuotationModal.elements().submitCTA().click();
    const response = await patchPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
  });
  test('if PATCH plan is ok then calls the PATCH Status', async () => {
    await planPage.elements().requestQuotationCTA().click();
    const response = await requestQuotationModal.submitRequest();
    const data = response.request().postDataJSON();
    expect(data).toEqual({ status: 'pending_review' });
  });

  test("it's possible to add a module, and remove it without triggering validation errors", async () => {
    await touchpointsModule.addModule();
    await expect(touchpointsModule.elements().module()).toBeVisible();
    await touchpointsModule.removeModule();
    await expect(touchpointsModule.elements().module()).not.toBeVisible();
    // Try to request a quote for the plan (should not throw validation error for deleted module)
    await planPage.elements().requestQuotationCTA().click();
    await requestQuotationModal.submitRequest();
    // If the validation function was not pruned, this would throw or fail to PATCH
    // No assertion needed: test will fail if validation error is thrown
  });
});

test.describe('When the user clicks on the dots menu', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.mockDeletePlan();
    await planPage.open();
  });

  test("The menu opens and the user can see the 'Delete' option", async () => {
    await planPage.elements().extraActionsMenu().click();
    await expect(planPage.elements().deletePlanActionItem()).toBeVisible();
    await expect(planPage.elements().deletePlanActionItem()).toBeEnabled();
  });

  test("When the user clicks on the 'Delete' option, the delete modal opens with its title, confirm and abort deletion CTA", async () => {
    await planPage.elements().extraActionsMenu().click();
    await planPage.elements().deletePlanActionItem().click();
    await expect(planPage.elements().deletePlanModal()).toBeVisible();
    await expect(planPage.elements().deletePlanModalTitle()).toBeVisible();
    await expect(planPage.elements().deletePlanModalConfirmCTA()).toBeVisible();
    await expect(planPage.elements().deletePlanModalConfirmCTA()).toBeEnabled();
    await expect(planPage.elements().deletePlanModalCancelCTA()).toBeVisible();
    await expect(planPage.elements().deletePlanModalCancelCTA()).toBeEnabled();
  });

  test("When the user clicks on the 'Delete permanently' CTA, a call to the DELETE endpoint is made and if ok he is redirected to the home page", async ({
    page,
  }) => {
    const deletePromise = page.waitForResponse(
      (response) =>
        /\/api\/plans\/1/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'DELETE'
    );
    await planPage.elements().extraActionsMenu().click();
    await planPage.elements().deletePlanActionItem().click();
    await planPage.elements().deletePlanModalConfirmCTA().click();

    await deletePromise; // wait for the DELETE request to be made

    await expect(planPage.elements().deletePlanModal()).not.toBeVisible();
    await expect(page).toHaveURL('/');
  });
});
