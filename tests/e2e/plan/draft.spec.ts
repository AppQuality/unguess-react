import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/Plan';
import examplePatch from '../../api/workspaces/wid/plans/pid/_patch/request_Example_1.json';

test.describe('The module builder', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.mockPatchStatus();
    await planPage.open();
  });

  test('has a list of saved modules and not the others, a save button and a request quote cta', async () => {
    await expect(planPage.elements().titleModule()).toBeVisible();
    await expect(planPage.elements().tasksModule()).toBeVisible();
    await expect(planPage.elements().datesModule()).toBeVisible();

    // todo: check if the other modules are not visible

    await expect(planPage.elements().saveConfigurationCTA()).toBeVisible();
    await expect(planPage.elements().descriptionModule()).not.toBeVisible();
    await expect(planPage.elements().saveConfigurationCTA()).not.toBeDisabled();
    await expect(planPage.elements().requestQuotationCTA()).toBeVisible();
    await expect(planPage.elements().requestQuotationCTA()).not.toBeDisabled();
  });
  test('Clicking save button validate the current modules configurations and calls the PATCH Plan', async ({
    page,
  }) => {
    const patchPromise = page.waitForResponse(
      (response) =>
        /\/api\/workspaces\/1\/plans\/1(?!\/status)/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );

    // todo: come up with some common usecases in qhich the user perform some changes to the form, then click the submit button
    await planPage.elements().saveConfigurationCTA().click();
    const response = await patchPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
  });

  // flusso di richiesta preventivo
  test('Clicking request quotation ask for confirmation first', async () => {
    // todo: come up with some common usecases in which the user perform some changes to the form, then click the submit button
    // todo: ask confirmation
  });
  test('if confirmation calls the PATCH Plan', async ({ page }) => {
    const patchPromise = page.waitForResponse(
      (response) =>
        /\/api\/workspaces\/1\/plans\/1(?!\/status)/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await planPage.elements().requestQuotationCTA().click();
    const response = await patchPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
  });
  test('if PATCH plan is ok then calls the PATCH Status', async ({ page }) => {
    const patchStatusPromise = page.waitForResponse(
      (response) =>
        /\/api\/workspaces\/1\/plans\/1\/status/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    await planPage.elements().requestQuotationCTA().click();
    const responseStatus = await patchStatusPromise;
    const dataStatus = responseStatus.request().postDataJSON();
    expect(dataStatus).toEqual({ status: 'pending_review' });
  });
  test('after requesting quotation CTA save and Request Quote should become disabled and all inputs should be readonly', async () => {
    // todo
  });
});

test.describe('When there is an error in the module configuration (e.g. a date in the past)', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlanWithDateError();
    await planPage.open();
  });

  test('when a user click Save we trigger all fields validation, display error messages and trigger PATCH plan', async () => {
    await expect(planPage.elements().datesModuleError()).not.toBeVisible();
    await planPage.elements().saveConfigurationCTA().click();
    await expect(planPage.elements().datesModuleError()).toBeVisible();
  });
  test('when a user click Request Quotation we trigger all fields validation, display error messages and trigger PATCH plan but not the PATCH status', async () => {});
});
