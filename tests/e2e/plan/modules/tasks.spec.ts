import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { TasksModule } from '../../../fixtures/pages/Plan/Module_tasks';
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
    await moduleBuilderPage.mockPatchPlan();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await moduleBuilderPage.open();
    await moduleBuilderPage.elements().tabInstructions().click();
  });

  test('Tasks can be deleted, but it is required to have at least 1 item to Request a Quote', async () => {
    await expect(tasksModule.elements().module()).toBeVisible();
    const tasks = TasksModule.getTasksFromPlan(apiGetDraftMandatoryPlan);
    await expect(tasksModule.elements().taskListItem()).toHaveCount(
      tasks.length
    );

    // delete each item
    await Promise.all(
      tasks.map(async (task: any) => {
        await tasksModule
          .elements()
          .taskListItem()
          .getByRole('heading', { name: task.title })
          .getByTestId('remove-task-button')
          .click();
        await tasksModule
          .elements()
          .removeTaskConfirmationModalConfirmCTA()
          .click();
      })
    );
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
    const elementTitle = tasksModule.elements().taskTitleInput(element);
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

  test('Tasks can be reordered', async ({ page }) => {
    // asserting initial list sizes
    await expect(
      page.getByTestId('task-item-nav').locator('[draggable="true"]')
    ).toHaveCount(2);
    // asserting initial order of the main task list
    await expect(tasksModule.elements().taskListItem().first()).toHaveAttribute(
      'id',
      'bug-1'
    );
    await expect(tasksModule.elements().taskListItem().nth(1)).toHaveAttribute(
      'id',
      'video-1'
    );
    await page
      .locator('[data-task-id="video-1"]')
      .dragTo(page.locator('[data-task-id="bug-1"]'));
    // asserting the first item is now the video task
    await expect(
      page.getByTestId('task-item-nav').locator('[draggable="true"]').first()
    ).toHaveAttribute('data-task-id', 'video-1');
    // asserting the second item is now the bug task
    await expect(
      page.getByTestId('task-item-nav').locator('[draggable="true"]').nth(1)
    ).toHaveAttribute('data-task-id', 'bug-1');
    // asserting the main task list is updated as well
    await expect(tasksModule.elements().taskListItem()).toHaveCount(2);
    await expect(tasksModule.elements().taskListItem().first()).toHaveAttribute(
      'id',
      'video-1'
    );
    await expect(tasksModule.elements().taskListItem().nth(1)).toHaveAttribute(
      'id',
      'bug-1'
    );
    // let's save the plan and check the order is sent to the api
    const response = await moduleBuilderPage.saveConfiguration();
    const data = response.request().postDataJSON();
    expect(data.config.modules).toContainEqual(
      expect.objectContaining({
        type: 'tasks',
        output: [
          {
            id: 'video-1',
            kind: 'video',
            title: 'Think aloud',
            description: 'description kind video',
          },
          {
            id: 'bug-1',
            kind: 'bug',
            title: 'Search for bugs',
            description: 'description kind bug',
          },
        ],
      })
    );
  });
});
