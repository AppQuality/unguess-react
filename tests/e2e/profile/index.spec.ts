import { test, expect } from '../../fixtures/app';
import { Profile } from '../../fixtures/pages/Profile';

test.describe('The profile page', () => {
  let profile: Profile;

  test.beforeEach(async ({ page }) => {
    profile = new Profile(page);
    await profile.loggedIn();
    await profile.mockPatchUserMe();
    await profile.mockGetRoles();
    await profile.open();
  });

  test('display a profile card and a password settings card, the profile card is filled with current data, the password is not', async ({
    page,
    i18n,
  }) => {
    await expect(profile.elements().profileCardName()).toHaveValue('Luca');
    await expect(profile.elements().profileCardSurname()).toHaveValue(
      'Cannarozzo'
    );
    await expect(profile.elements().profileCardEmail()).toHaveValue(
      'luca.cannarozzo@unguess.io'
    );
    await expect(profile.elements().profileCardRole()).toHaveText('Designer');
    await expect(profile.elements().passwordSettingsCard()).toBeVisible();
    await profile.openPasswordSettings();
    await expect(profile.elements().passwordSettingCurrent()).toBeVisible();
    await expect(profile.elements().passwordSettingNew()).toBeVisible();
    await expect(profile.elements().passwordRequirements()).toBeVisible();
    await expect(profile.elements().passwordSettingConfirm()).toBeVisible();
    await expect(profile.elements().passwordSettingConfirm()).toBeVisible();
  });
});
