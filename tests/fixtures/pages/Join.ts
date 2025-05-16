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
    };
  }
}
