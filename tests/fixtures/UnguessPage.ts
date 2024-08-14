import { type Page } from '@playwright/test';

export class UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loggedIn() {
    await this.page.route('*/**/api/users/me', async (route) => {
      await route.fulfill({
        path: 'tests/api/users/me/_get/200_Example_1.json',
      });
    });
  }

  async loggedOut() {
    // await this.page.route(
    //   "*/**/api/users/me?fields=name%2Csurname%2Cimage%2Conboarding_completed%2Cemail%2Cwp_user_id",
    //   async (route) => {
    //     await route.fulfill({
    //       status: 403,
    //       json: { err: "unauthorized" },
    //     });
    //   }
    // );
  }
}
