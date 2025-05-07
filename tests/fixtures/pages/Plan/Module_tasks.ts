import { Locator, type Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class TasksModule {
  readonly page: Page;

  readonly i18n: i18n;

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('tasks-module'),
      taskList: () => this.elements().module().getByRole('list'),
      taskListItem: () => this.elements().taskList().getByRole('listitem'),
      taskTitleInput: (element: Locator) =>
        element.getByRole('textbox', {
          name: this.i18n.t('__PLAN_PAGE_MODULE_TASKS_TASK_TITLE_LABEL'),
        }),
      taskListErrorRequired: () =>
        this.elements()
          .module()
          .getByText(
            this.i18n.t('__PLAN_PAGE_MODULE_TASKS_TASK_ERROR_REQUIRED')
          ),
      removeTaskConfirmationModal: () =>
        this.page.getByRole('dialog', {
          name: this.i18n.t(
            '__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_TITLE'
          ),
        }),
      removeTaskConfirmationModalConfirmCTA: () =>
        this.elements()
          .removeTaskConfirmationModal()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_MODULE_TASKS_MODAL_CONFIRMATION_REMOVE_TASK_CONFIRM'
            ),
          }),
      addTaskCTA: () =>
        this.elements()
          .module()
          .getByRole('button', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_BUTTON'),
          }),
      addTaskModal: () =>
        this.elements()
          .module()
          .getByRole('dialog', {
            name: this.i18n.t('__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_TITLE'),
          }),
      addTaskModalFunctionalBugHunting: () =>
        this.elements()
          .addTaskModal()
          .getByRole('button', {
            name: this.i18n.t(
              '__PLAN_PAGE_MODULE_TASKS_ADD_TASK_MODAL_FUNCTIONAL_TASK_FUNCTIONAL_BUTTON'
            ),
          }),
    };
  }

  static getTasksFromPlan(plan: any) {
    const tasksModule = plan.config.modules.find(
      (module) => module.type === 'tasks'
    );
    if (!tasksModule) {
      throw new Error('No tasks module found in plan');
    }
    if (!Array.isArray(tasksModule.output)) {
      throw new Error('Invalid tasks module output');
    }
    return tasksModule.output;
  }
}
