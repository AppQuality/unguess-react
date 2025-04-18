import draftMandatory from '../../../api/plans/pid/_get/200_draft_mandatory_only.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';

test.describe('The title module defines the Plan title.', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.open();
  });
  test('It should have a title input that show the current value of the module and a way to change that value', async () => {
    const title = PlanPage.getTitleFromPlan(draftMandatory);
    await expect(planPage.elements().titleModule()).toBeVisible();
    await expect(
      planPage.elements().titleModule().getByText(title)
    ).toBeVisible();
    await planPage.fillInputTItle('New Title');
    await expect(
      planPage.elements().titleModule().getByText('New Title')
    ).toBeVisible();
  });
  test('It should have an output of a string, and should not be empty to Request a quote', async () => {
    await planPage.fillInputTItle('');

    const moduleTitle = planPage.elements().titleModule();
    const moduleTitleCount = await moduleTitle.count();
    expect(moduleTitleCount).toBe(1);

    const titleError = planPage.elements().titleModuleError();
    const titleErrorCount = await titleError.count();
    expect(titleErrorCount).toBe(1);
    await expect(titleError).toBeVisible();
    await expect(titleError).toHaveText(
      planPage.i18n.t('__PLAN_TITLE_ERROR_EMPTY')
    );

    await planPage.elements().requestQuotationCTA().click();

    // Modal contains the title module and it should be in the same state
    const requestQuotationModal = planPage.elements().requestQuotationModal();
    await expect(requestQuotationModal).toBeVisible();
    await expect(
      requestQuotationModal.getByTestId('title-module')
    ).toBeVisible();
    await expect(
      requestQuotationModal.getByTestId('title-error')
    ).toBeVisible();
  });
  test('The title should have a maximum length of 256 characters', async () => {
    await planPage.elements().titleModule().click();
    await planPage.elements().titleModuleInput().fill('a'.repeat(257));
    await planPage.elements().titleModuleInput().blur();
    await expect(planPage.elements().titleModuleError()).toBeVisible();
    await expect(planPage.elements().titleModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_TITLE_ERROR_MAX_LENGTH')
    );
  });
});
