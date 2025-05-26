import { Page } from '@playwright/test';

export class Step3 {
  readonly page: Page;

  readonly workspace = 'Test Workspace';

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      container: () => this.page.getByTestId('step-3'),
      workspaceInput: () => this.page.getByLabel('SIGNUP_FORM_WORKSPACE_LABEL'),
      workspaceError: () => this.page.getByTestId('signup-workspace-error'),
      buttonBackToStep2: () =>
        this.page.getByRole('button', { name: 'SIGNUP_FORM_RETURN_TO_STEP_2' }),
      buttonSubmit: () =>
        this.page.getByRole('button', { name: 'SIGNUP_FORM_SUBMIT' }),
    };
  }

  async fillValidWorkspace() {
    await this.elements().workspaceInput().fill(this.workspace);
    await this.elements().workspaceInput().blur();
  }
}
