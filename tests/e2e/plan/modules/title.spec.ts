import draftMandatory from '../../../api/plans/pid/_get/200_draft_mandatory_only.json';
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
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.open();
  });
  test('It should have a title input that show the current value of the module and a way to change that value. Output a string', async () => {
    const title = PlanPage.getTitleFromPlan(draftMandatory);
    await expect(
      planPage.elements().titleModule().getByText(title)
    ).toBeVisible();
    await planPage.fillInputTItle('New Title');
    await expect(
      planPage.elements().titleModule().getByText('New Title')
    ).toBeVisible();
    const response = await planPage.saveConfiguration();
    const data = response.request().postDataJSON();
    expect(data.config.modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'title',
          output: 'New Title',
        }),
      ])
    );
  });
  test('It should not be empty to Request a quote', async ({ i18n }) => {
    await planPage.fillInputTItle('');

    const moduleTitle = planPage.elements().titleModule();
    const moduleTitleCount = await moduleTitle.count();
    expect(moduleTitleCount).toBe(1);

    const titleError = planPage.elements().titleModuleError();
    const titleErrorCount = await titleError.count();
    expect(titleErrorCount).toBe(1);
    await expect(titleError).toHaveText(i18n.t('__PLAN_TITLE_ERROR_EMPTY'));

    await planPage.elements().requestQuotationCTA().click();

    // Modal contains the title module and it should be in the same state
    await expect(requestQuotationModal.elements().modal()).toBeVisible();
    await expect(requestQuotationModal.elements().titleModule()).toBeVisible();
    await expect(
      requestQuotationModal.elements().titleModuleError()
    ).toHaveText(i18n.t('__PLAN_TITLE_ERROR_EMPTY'));
  });
  test('The title should have a maximum length of 256 characters', async ({
    i18n,
  }) => {
    await planPage.fillInputTItle('a'.repeat(257));
    await expect(planPage.elements().titleModuleError()).toHaveText(
      i18n.t('__PLAN_TITLE_ERROR_MAX_LENGTH')
    );
    await planPage.fillInputTItle('a'.repeat(256));
    await expect(planPage.elements().titleModuleError()).not.toBeVisible();
  });
});
