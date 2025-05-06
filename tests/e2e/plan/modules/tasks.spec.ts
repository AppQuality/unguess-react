import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { TasksModule } from '../../../fixtures/pages/Plan/TasksModule';
import apiGetDraftMandatoryPlan from '../../../api/plans/pid/_get/200_draft_mandatory_only.json';
import { RequestQuotationModal } from '../../../fixtures/pages/Plan/RequestQuotationModal';

test.describe('The tasks module defines a list of activities.', () => {
  let moduleBuilderPage: PlanPage;
  let tasksModule: TasksModule;
  let requestQuotationModal: RequestQuotationModal;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    tasksModule = new TasksModule(page);
    requestQuotationModal = new RequestQuotationModal(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await moduleBuilderPage.open();
    await moduleBuilderPage.elements().instructionsTab().click();
  });

  test('Tasks can be deleted, but it is required to have at least 1 item to Request a Quote', async ({
    page,
    i18n,
  }) => {
    await expect(tasksModule.elements().module()).toBeVisible();
    const tasks = TasksModule.getTasksFromPlan(apiGetDraftMandatoryPlan);
    await expect(tasksModule.elements().taskListItem()).toHaveCount(
      tasks.length
    );

    // delete each item
    for (const task of tasks) {
      await tasksModule
        .elements()
        .taskListItem()
        .getByRole('heading', { name: task.title })
        .getByRole('button', {
          name: i18n.t('__PLAN_PAGE_MODULE_TASKS_REMOVE_TASK_BUTTON'),
        })
        .click();
      await tasksModule
        .elements()
        .removeTaskConfirmationModalConfirmCTA()
        .click();
    }
    await expect(tasksModule.elements().taskListItem()).toHaveCount(0);
    await expect(tasksModule.elements().taskListErrorRequired()).toBeVisible();
    await moduleBuilderPage.elements().requestQuotationCTA().click();
    requestQuotationModal.elements().submitCTA().click();
    await expect(requestQuotationModal.elements().errorMessage()).toContainText(
      'tasks'
    );
  });

  test(`a mandatory title input text, a mandatory description text, and an optional url input`, async ({
    i18n,
  }) => {
    const tasks = TasksModule.getTasksFromPlan(apiGetDraftMandatoryPlan);

    const element = tasksModule.elements().taskListItem().nth(0);
    const elementTitle = element.getByRole('textbox', {
      name: i18n.t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_LABEL'),
    });
    await expect(elementTitle).toHaveValue(tasks[0].title);
    await elementTitle.fill('');
    await elementTitle.blur();
    await expect(
      element.getByText(
        i18n.t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_ERROR_REQUIRED')
      )
    ).toBeVisible();
  });
  test('There should be a cta to add a task that append an empty task to the list. No limits', async () => {
    const tasks = TasksModule.getTasksFromPlan(apiGetDraftMandatoryPlan);
    await expect(tasksModule.elements().addTaskCTA()).toBeVisible();
    await tasksModule.elements().addTaskCTA().click();
    await expect(tasksModule.elements().addTaskModal()).toBeVisible();
    await tasksModule.elements().addTaskModalFunctionalBugHunting().click();
    await expect(tasksModule.elements().taskListItem()).toHaveCount(
      tasks.length + 1
    );
  });
});
