import { expect, test } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';

test.describe('Save template from plan', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);

    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockSaveTemplate();
    await moduleBuilderPage.mockGetTemplates();
  });

  test.describe('Draft', () => {
    test.beforeEach(async ({ page }) => {
      moduleBuilderPage = new PlanPage(page);

      await moduleBuilderPage.mockGetDraftPlan();
      await moduleBuilderPage.open();
    });
    test("The menu opens and the user can see the 'Save as template' option", async () => {
      await moduleBuilderPage.elements().extraActionsMenu().click();
      await expect(
        moduleBuilderPage.elements().savePlanActionItem()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().savePlanActionItem()
      ).toBeEnabled();
    });

    test("When the user clicks on the 'Save as template' option, the save as template modal opens with its title, confirm and abort CTA", async () => {
      await moduleBuilderPage.elements().extraActionsMenu().click();
      await moduleBuilderPage.elements().savePlanActionItem().click();
      await expect(moduleBuilderPage.elements().savePlanModal()).toBeVisible();
      await expect(
        moduleBuilderPage.elements().savePlanModalTitle()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().savePlanModalConfirmCTA()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().savePlanModalConfirmCTA()
      ).toBeEnabled();
      await expect(
        moduleBuilderPage.elements().savePlanModalCancelCTA()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().savePlanModalCancelCTA()
      ).toBeEnabled();
    });

    test("When the user clicks on the 'Save as template' CTA, a call to the POST endpoint is made and if ok the confirm modal is displayed", async () => {
      await moduleBuilderPage.elements().extraActionsMenu().click();
      await moduleBuilderPage.elements().savePlanActionItem().click();
      await moduleBuilderPage.elements().savePlanModalConfirmCTA().click();

      await expect(
        moduleBuilderPage.elements().saveAsTemplateSuccessStep()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().saveAsTemplateFormStep()
      ).not.toBeVisible();
    });

    test('After saving a template, you can click on continue to close the modal', async ({
      page,
    }) => {
      await moduleBuilderPage.elements().extraActionsMenu().click();
      await moduleBuilderPage.elements().savePlanActionItem().click();
      await moduleBuilderPage.elements().savePlanModalConfirmCTA().click();
      await moduleBuilderPage
        .elements()
        .savePlanModalContinueSetupCTA()
        .click();

      await expect(
        moduleBuilderPage.elements().saveAsTemplateSuccessStep()
      ).not.toBeVisible();
      await expect(
        moduleBuilderPage.elements().saveAsTemplateFormStep()
      ).not.toBeVisible();
      await expect(page).toHaveURL('/plans/1');
    });
    test('After saving a template, you can click on go to templates', async ({
      page,
    }) => {
      await moduleBuilderPage.elements().extraActionsMenu().click();
      await moduleBuilderPage.elements().savePlanActionItem().click();
      await moduleBuilderPage.elements().savePlanModalConfirmCTA().click();
      await moduleBuilderPage
        .elements()
        .savePlanModalGoToTemplatesCTA()
        .click();

      await expect(
        moduleBuilderPage.elements().saveAsTemplateSuccessStep()
      ).not.toBeVisible();
      await expect(
        moduleBuilderPage.elements().saveAsTemplateFormStep()
      ).not.toBeVisible();
      await expect(page).toHaveURL('/templates');
    });
  });

  test.describe('Approved with quote', () => {
    test.beforeEach(async ({ page }) => {
      moduleBuilderPage = new PlanPage(page);

      await moduleBuilderPage.mockGetApprovedPlan();
      await moduleBuilderPage.open();
    });

    test('Should show save template card and cta', async () => {
      await expect(
        moduleBuilderPage.elements().saveTemplateCard()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().saveTemplateCardCTA()
      ).toBeVisible();
    });

    test('Clicking on the save template cta opens the save as template modal and show starting price', async () => {
      await moduleBuilderPage.elements().saveTemplateCardCTA().click();
      await expect(moduleBuilderPage.elements().savePlanModal()).toBeVisible();
      await expect(
        moduleBuilderPage.elements().savePlanModalTitle()
      ).toBeVisible();
      await expect(
        moduleBuilderPage.elements().saveTemplateModalQuoteBox()
      ).toBeVisible();
    });
  });
});
