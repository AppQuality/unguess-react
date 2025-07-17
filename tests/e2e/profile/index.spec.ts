import { test, expect } from '../../fixtures/app';
import { Profile } from '../../fixtures/pages/Profile';

test.describe('The profile page', () => {
  let profile: Profile;

  test.beforeEach(async ({ page }) => {
    profile = new Profile(page);
    await profile.loggedIn();

    await profile.mockWorkspacesList();

    await profile.mockPatchUserMe();
    await profile.mockGetRoles();
    await profile.open();
  });

  test('Display a profile card and a password settings card, the profile card is filled with current data, the password is not', async () => {
    // profile card
    await expect(profile.elements().profileCardName()).toHaveValue('Luca');
    await expect(profile.elements().profileCardSurname()).toHaveValue(
      'Cannarozzo'
    );
    await expect(profile.elements().profileCardEmail()).toHaveValue(
      'luca.cannarozzo@unguess.io'
    );
    await expect(profile.elements().profileCardEmail()).toBeDisabled();
    await expect(profile.elements().profileCardRole()).toHaveText('Designer');
    await expect(profile.elements().profileCardSubmitButton()).toBeDisabled();

    // password settings card
    await expect(profile.elements().passwordSettingsCard()).toBeVisible();
    await profile.openPasswordSettings();
    await expect(profile.elements().passwordSettingCurrent()).toBeVisible();
    await expect(profile.elements().passwordSettingNew()).toBeVisible();
    await expect(profile.elements().passwordRequirements()).toBeVisible();
    await expect(profile.elements().passwordSettingConfirm()).toBeVisible();
    await expect(
      profile.elements().passwordSettingsSubmitButton()
    ).toBeDisabled();
  });

  test('Update name surname and job role', async () => {
    // profile card
    await expect(profile.elements().profileCardSubmitButton()).toBeDisabled();
    await profile.elements().profileCardName().fill('New Name');
    await profile.elements().profileCardSurname().fill('New Surname');
    await profile.elements().profileCardRole().click();
    await profile
      .elements()
      .profileCardRole()
      .getByRole('option', { name: 'Developer' })
      .click();
    await expect(profile.elements().profileCardName()).toHaveValue('New Name');
    await expect(profile.elements().profileCardSurname()).toHaveValue(
      'New Surname'
    );
    await expect(profile.elements().profileCardRole()).toHaveText('Developer');
    // when touch the fields we expect the submit button to be enabled
    await expect(profile.elements().profileCardSubmitButton()).toBeEnabled();
    // Start the submit
    const patchResponse = await profile.saveProfile();
    const data = patchResponse.request().postDataJSON();
    expect(data).toEqual(
      expect.objectContaining({
        name: 'New Name',
        surname: 'New Surname',
        roleId: 1, // Assuming 'Developer' has roleId 1
      })
    );
  });

  test('Update password', async () => {
    // Password accordion
    await profile.openPasswordSettings();
    await expect(
      profile.elements().passwordSettingsSubmitButton()
    ).toBeDisabled();
    await profile.elements().passwordSettingCurrent().fill('current-password');
    await profile.elements().passwordSettingNew().fill('StrongNewPassword123!');
    await profile
      .elements()
      .passwordSettingConfirm()
      .fill('StrongNewPassword123!');
    await expect(profile.elements().passwordSettingCurrent()).toHaveValue(
      'current-password'
    );
    await expect(profile.elements().passwordSettingNew()).toHaveValue(
      'StrongNewPassword123!'
    );
    await expect(profile.elements().passwordSettingConfirm()).toHaveValue(
      'StrongNewPassword123!'
    );
    // when touch the fields we expect the submit button to be enabled
    await expect(
      profile.elements().passwordSettingsSubmitButton()
    ).toBeEnabled();
    // Start the submit
    const patchResponse = await profile.saveNewPassword();
    const data = patchResponse.request().postDataJSON();
    expect(data).toEqual(
      expect.objectContaining({
        password: expect.objectContaining({
          current: 'current-password',
          new: 'StrongNewPassword123!',
        }),
      })
    );
  });
});
