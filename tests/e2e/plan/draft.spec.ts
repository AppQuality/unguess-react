import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/Plan';
import examplePatch from '../../api/workspaces/wid/plans/pid/_patch/200_Example_1.json';

test.describe('The module builder', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await moduleBuilderPage.open();
  });

  test('has a list of saved modules and not the others, a save button and a request quote cta', async () => {
    await expect(moduleBuilderPage.elements().titleModule()).toBeVisible();
    await expect(moduleBuilderPage.elements().tasksModule()).not.toBeVisible();
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
    const patchPromise = page.waitForResponse('*/**/api/workspaces/1/plans/1');
    // todo: come up with some common usecases in qhich the user perform some changes to the form, then click the submit button
    await moduleBuilderPage.elements().submitButton().click();
    const response = await patchPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
  });
  test('Clicking request quotation calls the PATCH Plan, then if ok the PATCH Status', async ({
    page,
  }) => {
    const patchPromise = page.waitForResponse('*/**/api/workspaces/1/plans/1');
    const patchStatusPromise = page.waitForResponse(
      '*/**/api/workspaces/1/plans/1/status'
    );
    // todo: come up with some common usecases in qhich the user perform some changes to the form, then click the submit button
    await moduleBuilderPage.elements().quoteButton().click();
    const response = await patchPromise;
    const responseStatus = await patchStatusPromise;
    const data = response.request().postDataJSON();
    expect(data).toEqual(examplePatch);
    const dataStatus = responseStatus.request().postDataJSON();
    expect(dataStatus).toEqual({ status: 'pending_review' });
  });
});
