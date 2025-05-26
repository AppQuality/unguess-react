import { type Page } from '@playwright/test';
import { UnguessPage } from '../../UnguessPage';
import validInvitedUser from '../../../api/invites/profile/token/_get/200_Example_1.json';

export class Join extends UnguessPage {
  readonly page: Page;

  readonly url = '/join';

  readonly profileId = '1';

  readonly token = 'token123';

  readonly urlInvitedUser = `${this.url}/invites/${this.profileId}/${this.token}`;

  readonly validInvitedUser = validInvitedUser;

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
    await this.page.route(
      `*/**/api/invites/${this.profileId}/${this.token}`,
      async (route) => {
        if (route.request().method() === 'GET') {
          await route.fulfill({
            path: 'tests/api/invites/profile/token/_get/200_Example_1.json',
          });
        } else {
          await route.fallback();
        }
      }
    );
  }

  // new user response has a welcome project id for the redirect
  async mockPostNewUser() {
    await this.page.route(`*/**/api/users`, async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          path: 'tests/api/users/_post/200_ProjectId.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  // existing user response has no project id
  async mockPostExistingUser() {
    await this.page.route(`*/**/api/users`, async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          path: 'tests/api/users/_post/200_Example_1.json',
        });
      } else {
        await route.fallback();
      }
    });
  }
}
