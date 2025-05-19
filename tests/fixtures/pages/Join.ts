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

      firstStepContainer: () => this.page.getByTestId('signup-fisrt-step'),
      emailInput: () => this.page.getByTestId('email-input'),
      passwordInput: () => this.page.getByTestId('password-input'),
      passwordRequirements: () =>
        this.page.getByTestId('password-requirements'),
      nextButton: () =>
        this.page.getByRole('button', {
          name: this.i18n.t('SIGNUP_STEP:::continue'),
        }),
      termsLink: () => this.page.getByTestId('terms-and-conditions'),

      secondStepContainer: () => this.page.getByTestId('signup-second-step'),
      nameInput: () => this.page.getByTestId('input-name'),
      surnameInput: () => this.page.getByTestId('input-surname'),
      jobRoleInput: () => this.page.getByTestId('input-job-role'),

      thirdStepContainer: () => this.page.getByTestId('signup-third-step'),

      confirmationStep: () => this.page.getByTestId('signup-success'),
    };
  }

  async mockGetInvitedUser() {
    await this.page.route('*/**/api/invites/1/token123', async (route) => {
      await route.fulfill({
        path: 'tests/api/invites/profile/token/_get/200_Example_1.json',
      });
    });
  }

  async fillEmailWith(email: string) {
    const mailInput = this.elements().emailInput();
    await mailInput.fill(email);
  }

  async fillPasswordWith(password: string) {
    const mailInput = this.elements().passwordInput();
    await mailInput.fill(password);
  }

  async goToSecondStep() {
    await this.fillEmailAndPasswordWithValidData();
    await this.elements().nextButton().click();
  }

  async fillEmailAndPasswordWithValidData() {
    await this.mockMailDoesNotExist({ email: 'test@example.com' });
    await this.fillEmailWith('test@example.com');
    await this.fillPasswordWith('Password1!');
  }

  async fillEmailAndPasswordWithExistingEmail() {
    await this.mockMailExist({ email: 'test@example.com' });
    await this.fillEmailWith('test@example.com');
    await this.fillPasswordWith('Password1!');
  }

  async fillNameWith(name: string) {
    const nameInput = this.elements().nameInput();
    await nameInput.fill(name);
  }

  async fillSurnameWith(surname: string) {
    const surnameInput = this.elements().surnameInput();
    await surnameInput.fill(surname);
  }

  async mockMailExist({ email }: { email: string }) {
    await this.page.route(`*/**/api/users/by-email/${email}`, async (route) => {
      await route.fulfill({
        body: '{}',
        status: 200,
      });
    });
  }

  async mockMailDoesNotExist({ email }: { email: string }) {
    await this.page.route(`*/**/api/users/by-email/${email}`, async (route) => {
      await route.fulfill({
        body: '{}',
        status: 404,
      });
    });
  }
}
