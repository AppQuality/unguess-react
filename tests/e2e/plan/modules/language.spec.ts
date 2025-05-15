import draft from '../../../api/plans/pid/_get/200_draft_complete.json';
import { expect, test } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { LanguageModule } from '../../../fixtures/pages/Plan/Module_language';

test.describe('The tasks module defines the testers language', () => {
  let planPage: PlanPage;
  let languageModule: LanguageModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    languageModule = new LanguageModule(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftPlan();
    await planPage.open();
  });

  test('It should alway have one element checked ', async () => {
    const language = LanguageModule.getLanguageFromPlan(draft);

    await planPage.elements().tabTarget().click();
    await expect(languageModule.elements().module()).toBeVisible();
    const radioButtons = languageModule.elements().languageRadioInput();
    const checkedCount = await radioButtons.evaluateAll(
      (elements) =>
        elements.filter((el) => el instanceof HTMLInputElement && el.checked)
          .length
    );
    expect(checkedCount).toBe(1);
    const checkedRadio = languageModule
      .elements()
      .module()
      .getByRole('radio', { checked: true });
    await expect(checkedRadio).toHaveAttribute('value', language);
  });

  test('It should have an output of a string and be able to change ', async () => {
    const language = LanguageModule.getLanguageFromPlan(draft);
    const newLanguage = 'it';
    await planPage.elements().tabTarget().click();
    await expect(languageModule.elements().module()).toBeVisible();
    const initialCheckedRadio = languageModule
      .elements()
      .module()
      .getByRole('radio', { checked: true });
    await expect(initialCheckedRadio).toHaveAttribute('value', language);
    const newRadioLabel = languageModule
      .elements()
      .module()
      .getByText('Italian');
    await newRadioLabel.click();
    const newRadio = languageModule
      .elements()
      .module()
      .getByRole('radio', { checked: true });
    await expect(newRadio).toHaveAttribute('value', newLanguage);
  });
});
