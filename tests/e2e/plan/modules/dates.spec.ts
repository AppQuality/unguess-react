import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';
import draftMandatory from '../../../api/workspaces/wid/plans/pid/_get/200_draft_mandatory_only.json';
import { formatModuleDate } from '../../../../src/pages/Plan/formatModuleDate';
import {
  FEATURE_FLAG_CHANGE_MODULES_VARIANTS,
  PLAN_MINIMUM_DATE,
} from '../../../../src/constants';

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
    const startDate = PlanPage.getDateFromPlan(draftMandatory);
    await expect(planPage.elements().datesModule()).toBeVisible();
    await expect(planPage.elements().datesModuleInput()).toHaveValue(
      formatModuleDate(startDate).input
    );
    await planPage.elements().datesModuleInput().click();
    // click 4th of december 2041
    await planPage
      .elements()
      .datesModule()
      .getByText('4', { exact: true })
      .first()
      .click();
    await expect(planPage.elements().datesModuleInput()).toHaveValue(
      formatModuleDate(new Date('2041-12-04T08:00:00.000Z')).input
    );
  });

  test('It should output the start date in iso format with hour set at 8, and it is required to Request a Quote', async ({
    page,
  }) => {
    await planPage.elements().datesModuleRemove().click();
    await expect(planPage.elements().datesModule()).not.toBeVisible();
    await planPage.elements().requestQuotationCTA().click();
    await expect(
      planPage.elements().requestQuotationErrorMessage()
    ).toBeVisible();
    await expect(planPage.elements().requestQuotationErrorMessage()).toHaveText(
      `${planPage.i18n.t('__PLAN_MISSING_MODULES_ERROR')}: dates`
    );
    // todo add again and chech if the error is gone and the output is correct
  });

  test('you cannot change variant, the "default variant" set a date at least one day in the future, except weekends', async () => {
    const todayFormatted = formatModuleDate(new Date()).input;
    const businessDay = formatModuleDate(PLAN_MINIMUM_DATE).input;
    await expect(
      planPage.elements().datesModuleChangeVariant()
    ).not.toBeVisible();
    await planPage.elements().datesModuleInput().click();
    await planPage.elements().datesModuleInput().fill(todayFormatted);
    await planPage.elements().datesModuleInput().blur();
    await expect(planPage.elements().datesModuleError()).toBeVisible();
    await expect(planPage.elements().datesModuleError()).toHaveText(
      planPage.i18n.t('__PLAN_DATE_IN_FUTURE_ERROR')
    );
    await planPage.elements().datesModuleInput().click();
    await planPage.elements().datesModuleInput().fill(businessDay);
    await planPage.elements().datesModuleInput().blur();
    await expect(planPage.elements().datesModuleError()).not.toBeVisible();
  });
});

test.describe('If the user has the FEATURE_FLAG_CHANGE_MODULES_VARIANTS', () => {
  let planPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    planPage = new PlanPage(page);
    await planPage.loggedIn([
      {
        slug: FEATURE_FLAG_CHANGE_MODULES_VARIANTS,
        name: 'Change Modules Variants',
      },
    ]);
    await planPage.mockPreferences();
    await planPage.mockWorkspace();
    await planPage.mockWorkspacesList();
    await planPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await planPage.open();
  });

  test('The "free variant" set a date at least one day in the future, except weekends', async ({
    page,
  }) => {
    const todayFormatted = formatModuleDate(new Date()).input;
    await planPage.elements().datesModuleChangeVariant().click();
    await expect(
      planPage
        .elements()
        .datesModuleChangeVariant()
        .getByRole('option', { name: 'Free' })
    ).toBeVisible();
    // garden Select is really tricky to work with, so I'm using dispatchEvent to click on the option
    // normal click just go in a loop and freeze the test
    await planPage
      .elements()
      .datesModuleChangeVariant()
      .getByRole('option', { name: 'Free' })
      .dispatchEvent('click');
    await planPage.elements().datesModuleInput().click();
    await planPage.elements().datesModuleInput().fill(todayFormatted);
    await planPage.elements().datesModuleInput().blur();
    await expect(planPage.elements().datesModuleError()).not.toBeVisible();
  });
});
