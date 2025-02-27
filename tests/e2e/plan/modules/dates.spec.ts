import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';
import draftMandatory from '../../../api/workspaces/wid/plans/pid/_get/200_draft_mandatory_only.json';
import { formatModuleDate } from '../../../../src/pages/Plan/formatModuleDate';
import {
  toBeRequired,
  toHaveAttribute,
} from '@testing-library/jest-dom/matchers';

test.describe('The date module defines when the user is ready to be tested.', () => {
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

  test('It should print a date input/picker that show the current value of the module in Date format, and a way to change that value', async () => {
    const startDate = planPage.getDateFromPlan(draftMandatory);
    await expect(planPage.elements().datesModule()).toBeVisible();
    await expect(
      planPage.elements().datesModule().locator('input')
    ).toHaveValue(formatModuleDate(startDate).input);
  });

  test('It should have an output of one date, the start date, and it is required to Request a Quote', async () => {
    await expect(
      planPage.elements().datesModule().locator('input')
    ).toHaveAttribute('required');
  });

  test('The "default variant" set a date at least one day in the future, except weekends', async () => {
    // Todo
  });

  test('The "free variant" can set whatever date', async () => {
    // Todo
  });

  test('you can change variant only if the use has the MODULES_CHANGE_ALL_VARIANTS feature flag.', async () => {
    // Todo
  });

  test("il formato della data deve comprendere anche l'ora (default le 9?) e in formato ISO", async () => {
    // Todo
  });
});
