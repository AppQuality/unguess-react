import { Locator, type Page } from '@playwright/test';
import { UnguessPage } from '../../UnguessPage';
import validInvitedUser from '../../../api/invites/profile/token/_get/200_Example_1.json';

import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

interface Step {
  stepNumber: number;
  elements(): {
    [index: string]: () => Locator;
  };
}

export class Join extends UnguessPage {
  readonly page: Page;

  readonly url = '/join';

  readonly profileId = '1';

  readonly token = 'token123';

  readonly urlInvitedUser = `${this.url}/invites/${this.profileId}/${this.token}`;

  readonly validInvitedUser = validInvitedUser;

  readonly steps: {
    [index: string]: Step;
  };

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.steps = {
      step1: new Step1(page),
      step2: new Step2(page),
      step3: new Step3(page),
    };
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
}
