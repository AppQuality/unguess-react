import { expect, type Page } from '@playwright/test';

export class BankModule {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements() {
    return {
      module: () => this.page.getByTestId('bank-module'),
      tab: () => this.page.getByTestId('target-tab'),
      moduleCheckboxes: () => this.elements().module().getByRole('checkbox'),
      otherBanksTextArea: () =>
        this.elements().module().locator('textarea[name="other-bank-name"]'),
      bankAccountAsideNavButton: () =>
        this.elements()
          .module()
          .locator('a')
          .filter({ hasText: 'Bank Account' }),
    };
  }

  async goToTab() {
    await this.elements().tab().click();
  }

  async mockGetDraftPlan() {
    await this.page.route('*/**/api/plans/1', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          body: JSON.stringify({
            id: 13,
            workspace_id: 1,
            project: {
              id: 90,
              name: 'MyProject',
            },
            status: 'draft',
            config: {
              modules: [
                {
                  type: 'title',
                  variant: 'default',
                  output: 'My Plan',
                },
                {
                  type: 'dates',
                  variant: 'default',
                  output: {
                    start: '2041-12-17T08:00:00.000Z',
                  },
                },
                {
                  type: 'out_of_scope',
                  variant: 'default',
                  output: 'Out of scope',
                },
                {
                  type: 'target',
                  variant: 'default',
                  output: 5,
                },
                {
                  type: 'language',
                  variant: 'default',
                  output: 'en',
                },
                {
                  type: 'goal',
                  variant: 'default',
                  output: 'This is a Goal',
                },
                {
                  type: 'literacy',
                  output: [
                    {
                      level: 'intermediate',
                      percentage: 100,
                    },
                  ],
                  variant: 'default',
                },
                {
                  type: 'age',
                  output: [
                    {
                      max: 24,
                      min: 16,
                      percentage: 50,
                    },
                    {
                      max: 70,
                      min: 55,
                      percentage: 50,
                    },
                  ],
                  variant: 'default',
                },
                {
                  type: 'gender',
                  output: [
                    {
                      gender: 'female',
                      percentage: 100,
                    },
                  ],
                  variant: 'default',
                },
                {
                  type: 'employment',
                  output: ['EMPLOYEE', 'STUDENT'],
                  variant: 'default',
                },
                {
                  type: 'bank',
                  output: [
                    {
                      name: 'ING',
                      isOther: 0,
                    },
                    {
                      name: 'ImportantBank',
                      isOther: 1,
                    },
                  ],
                  variant: 'default',
                },
                {
                  type: 'tasks',
                  variant: 'default',
                  output: [
                    {
                      kind: 'bug',
                      title: 'Search for bugs',
                      description: 'description kind bug',
                    },
                    {
                      kind: 'video',
                      title: 'Think aloud',
                      description: 'description kind bug',
                    },
                  ],
                },
                {
                  type: 'locality',
                  variant: 'default',
                  output: [
                    { type: 'country', values: ['IT'] },
                    { type: 'region', values: ['Lombardia'] },
                  ],
                },
              ],
            },
          }),
          contentType: 'application/json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async expectToBeReadonly() {
    const ageCheckbox = this.elements().moduleCheckboxes();
    const count = await ageCheckbox.count();
    const checks: Promise<void>[] = [];
    for (let i = 0; i < count; i += 1) {
      checks.push(expect(ageCheckbox.nth(i)).toHaveAttribute('disabled', ''));
    }
    await Promise.all(checks);
  }
}
