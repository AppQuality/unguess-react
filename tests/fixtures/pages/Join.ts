import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class Join extends UnguessPage {
  readonly page: Page;

  readonly url = '/join';

  readonly urlInvitedUser = '/join/invites/1/token123';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  elements() {
    return {
      ...super.elements(),
      loader: () => this.page.getByTestId('join-page-loader'),
    };
  }

  async mockGetInvitedUser() {
    await this.page.route('*/**/api/invites/1/token123', async (route) => {
      await route.fulfill({
        path: 'tests/api/invites/profile/token/_get/200_Example_1.json',
      });
    });
  }
}
