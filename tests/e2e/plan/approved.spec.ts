import { test, expect } from '../../fixtures/app';
import { PlanPage } from '../../fixtures/pages/Plan';
import { GoalModule } from '../../fixtures/pages/Plan/Module_goal';
import { TargetModule } from '../../fixtures/pages/Plan/Module_target';
import { LanguageModule } from '../../fixtures/pages/Plan/Module_language';
import { DigitalLiteracyModule } from '../../fixtures/pages/Plan/Module_digital_literacy';
import { TasksModule } from '../../fixtures/pages/Plan/Module_tasks';
import { OutOfScopeModule } from '../../fixtures/pages/Plan/Module_out_of_scope';

test.describe('A Plan page in accepted state', () => {
  let moduleBuilderPage: PlanPage;
  let goalModule: GoalModule;
  let targetModule: TargetModule;
  let languageModule: LanguageModule;
  let digitalLiteracyModule: DigitalLiteracyModule;
  let outOfScopeModule: OutOfScopeModule;
  let tasksModule: TasksModule;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    goalModule = new GoalModule(page);
    targetModule = new TargetModule(page);
    languageModule = new LanguageModule(page);
    digitalLiteracyModule = new DigitalLiteracyModule(page);
    outOfScopeModule = new OutOfScopeModule(page);
    tasksModule = new TasksModule(page);

    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetApprovedPlan();
    await moduleBuilderPage.open();
  });

  test('has the summary tab visible and the confirm button is disabled', async ({
    page,
    i18n,
  }) => {
    await expect(
      moduleBuilderPage.elements().saveConfigurationCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().requestQuotationCTA()
    ).not.toBeVisible();
    await expect(
      moduleBuilderPage.elements().confirmActivityCTA()
    ).not.toBeVisible();
    await expect(moduleBuilderPage.elements().goToDashboardCTA()).toBeEnabled();
    await expect(
      page
        .getByRole('status')
        .filter({ hasText: i18n.t('PLAN_GLOBAL_ALERT_APPROVED_STATE_TITLE') })
    ).toBeVisible();
    await expect(
      page.getByText(i18n.t('__PLAN_PAGE_INTRODUCTION_CARD_APPROVED_TITLE'))
    ).toBeVisible();
  });

  test('all inputs should be readonly', async () => {
    await moduleBuilderPage.expectAllModulesToBeReadonly();
  });
});
