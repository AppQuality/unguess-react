import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/Plan';
import examplePatch from '../../api/workspaces/wid/plans/pid/_patch/request_Example_1.json';

test.describe('The module builder', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await moduleBuilderPage.mockPatchStatus();
    await moduleBuilderPage.open();
  });

  test('has a list of saved modules and not the others, a save button and a request quote cta', async () => {
    await expect(moduleBuilderPage.elements().titleModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().tasksModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().datesModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().submitButton()).toBeVisible();
    await expect(
      moduleBuilderPage.elements().descriptionModule()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().submitButton()
    ).not.toBeDisabled();
    await expect(moduleBuilderPage.elements().quoteButton()).toBeVisible();
    await expect(moduleBuilderPage.elements().quoteButton()).not.toBeDisabled();
  });
  test('Clicking save button calls the PATCH Plan', async ({ page }) => {
    const patchPromise = page.waitForResponse(
      (response) =>
        /\/api\/workspaces\/1\/plans\/1(?!\/status)/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    // todo: come up with some common usecases in qhich the user perform some changes to the form, then click the submit button
    await moduleBuilderPage.elements().submitButton().click();
    const response = await patchPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
  });

  // flusso di richiesta preventivo
  test('Clicking request quotation ask for confirmation first', async ({
    page,
  }) => {
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
    await moduleBuilderPage.elements().quoteButton().click();
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
    await moduleBuilderPage.elements().quoteButton().click();
    const responseStatus = await patchStatusPromise;
    const dataStatus = responseStatus.request().postDataJSON();
    expect(dataStatus).toEqual({ status: 'pending_review' });
  });
  test('after requesting quotation CTA save and Request Quote should become disabled and all inputs should be readonly', async () => {
    // todo
  });
});
