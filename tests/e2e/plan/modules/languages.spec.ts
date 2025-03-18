import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';
import draft from '../../../api/workspaces/wid/plans/pid/_get/200_draft_complete.json';

test.describe('The tasks module defines the testers language', () => {
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

  test('It should alway have one element checked ', async () => {
    const language = PlanPage.getLanguageFromPlan(draft);

    await planPage.elements().targetTab().click();
    await expect(planPage.elements().languageModule()).toBeVisible();
    const radioButtons = planPage.elements().languageRadioInput();
    const checkedCount = await radioButtons.evaluateAll(
      (elements) =>
        elements.filter((el) => el instanceof HTMLInputElement && el.checked)
          .length
    );
    expect(checkedCount).toBe(1);
    const checkedRadio = planPage
      .elements()
      .languageModule()
      .getByRole('radio', { checked: true });
    await expect(checkedRadio).toHaveAttribute('value', language);
  });

  test('It should have an output of a string and be able to change ', async () => {
    const language = PlanPage.getLanguageFromPlan(draft);
    const newLanguage = 'it';
    await planPage.elements().targetTab().click();
    await expect(planPage.elements().languageModule()).toBeVisible();
    const initialCheckedRadio = planPage
      .elements()
      .languageModule()
      .getByRole('radio', { checked: true });
    await expect(initialCheckedRadio).toHaveAttribute('value', language);
    const newRadioLabel = planPage
      .elements()
      .languageModule()
      .getByText('Italian');
    await newRadioLabel.click();
    const newRadio = planPage
      .elements()
      .languageModule()
      .getByRole('radio', { checked: true });
    await expect(newRadio).toHaveAttribute('value', newLanguage);
  });
});
