import { Page } from '@playwright/test';
import { i18n } from 'i18next';
import { getI18nInstance } from 'playwright-i18next-fixture';

export class Step3 {
  readonly page: Page;

  readonly i18n: i18n;

  readonly workspace = 'Test Workspace';

  constructor(page: Page) {
    this.page = page;
    this.i18n = getI18nInstance() as unknown as i18n;
  }

  elements() {
    return {
      container: () => this.page.getByTestId('step-3'),
      workspaceInput: () =>
        this.page.getByRole('textbox', { name: 'workspace' }),
      workspaceError: () => this.page.getByTestId('signup-workspace-error'),
      buttonBackToStep2: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_RETURN_TO_STEP_2'),
        }),
      buttonSubmit: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_FORM_SUBMIT'),
        }),
    };
  }

  async fillValidWorkspace() {
    await this.elements().workspaceInput().fill(this.workspace);
    await this.elements().workspaceInput().blur();
  }
}
