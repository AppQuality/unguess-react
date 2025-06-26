import { PlanPage } from '../../../fixtures/pages/Plan';
import { expect, test } from '../../../fixtures/app';
import { BankModule } from '../../../fixtures/pages/Plan/Module_bank';

test.describe('The bank module defines the testers bank accounts', () => {
  let planPage: PlanPage;
  let bankModule: BankModule;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    bankModule = new BankModule(page);
    await planPage.loggedIn();
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    // await planPage.mockGetDraftPlan();
    await bankModule.mockGetDraftPlan();

    await planPage.open();
  });

  test('It should have 2 elements checked and the textbox area visible and filled with the right value', async () => {
    const {
      moduleCheckboxes,
      module,
      otherBanksTextArea,
      bankAccountAsideNavButton,
    } = bankModule.elements();

    await planPage.elements().tabTarget().click();
    await expect(module()).toBeVisible();

    const checkboxes = moduleCheckboxes();

    const checkedCount = await checkboxes.evaluateAll(
      (elements) =>
        elements.filter(
          (el) =>
            el instanceof HTMLInputElement &&
            el.type === 'checkbox' &&
            el.checked
        ).length
    );
    expect(checkedCount).toBe(2);
    const INGCheckbox = module().locator('input[value="ING"]');
    expect(INGCheckbox).toBeChecked();
    const otherBanksCheckbox = module().locator(
      'input[value="Other providers"]'
    );
    expect(otherBanksCheckbox).toBeChecked();
    expect(otherBanksTextArea()).toBeVisible();
    await expect(otherBanksTextArea()).toHaveValue('ImportantBank');
  });
});
