import draftWithAdditionalTarget from '../../../api/plans/pid/_get/200_draft_with_additional_target.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { AdditionalTargetModule } from '../../../fixtures/pages/Plan/Module_additional_target';

test.describe('The additional target module defines additional criteria for the activity.', () => {
  let planPage: PlanPage;
  let additionalTargetModule: AdditionalTargetModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    additionalTargetModule = new AdditionalTargetModule(page);

    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/plans/pid/_get/200_draft_with_additional_target.json',
        });
      } else {
        await route.fallback();
      }
    });
    await planPage.open();
    await planPage.elements().tabTarget().click();
  });

  test('It should have a text area that show the value of the module', async () => {
    const additionalTarget =
      AdditionalTargetModule.getAdditionalTargetFromPlan(
        draftWithAdditionalTarget
      );
    await expect(additionalTargetModule.elements().module()).toBeVisible();
    await expect(additionalTargetModule.elements().moduleInput()).toHaveText(
      additionalTarget
    );
  });

  test('It should have a text area that show the value of the module and a way to change it', async () => {
    const additionalTarget =
      AdditionalTargetModule.getAdditionalTargetFromPlan(
        draftWithAdditionalTarget
      );
    await expect(additionalTargetModule.elements().module()).toBeVisible();
    await expect(additionalTargetModule.elements().moduleInput()).toHaveText(
      additionalTarget
    );
    await additionalTargetModule.elements().moduleInput().click();
    await additionalTargetModule
      .elements()
      .moduleInput()
      .fill('New additional target');
    await expect(additionalTargetModule.elements().moduleInput()).toHaveText(
      'New additional target'
    );
  });

  test('It should show an error if the textArea is too long', async () => {
    await additionalTargetModule.elements().moduleInput().click();
    await additionalTargetModule
      .elements()
      .moduleInput()
      .fill('a'.repeat(513));
    await additionalTargetModule.elements().moduleInput().blur();
    await expect(additionalTargetModule.elements().moduleError()).toBeVisible();
    await expect(additionalTargetModule.elements().moduleError()).toHaveText(
      planPage.i18n.t('__PLAN_ADDITIONAL_TARGET_ERROR_TOO_LONG')
    );
  });

  test('It should allow improving the additional target with AI only when word count >= 4', async ({
    page,
  }) => {
    const aiSuggestionText =
      'This is a better additional target suggested by AI';

    await planPage.mockAiSuggestion(aiSuggestionText);

    await additionalTargetModule.elements().moduleInput().click();

    await additionalTargetModule
      .elements()
      .moduleInput()
      .fill('test this ecommerce');
    await expect(additionalTargetModule.elements().aiButton()).toBeDisabled();

    await additionalTargetModule
      .elements()
      .moduleInput()
      .fill('test this ecommerce website');
    await expect(additionalTargetModule.elements().aiButton()).toBeEnabled();

    await additionalTargetModule.elements().aiButton().click();
    await expect(additionalTargetModule.elements().aiModal()).toBeVisible();
    await expect(page.getByText(aiSuggestionText)).toBeVisible();

    await additionalTargetModule.elements().aiModalAcceptButton().click();
    await expect(additionalTargetModule.elements().aiModal()).toBeHidden();
    await expect(additionalTargetModule.elements().moduleInput()).toHaveText(
      aiSuggestionText
    );
  });
});
