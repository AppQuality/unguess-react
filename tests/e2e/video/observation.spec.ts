import { expect, test } from '../../fixtures/app';
import { VideoPage } from '../../fixtures/pages/Video';

test.describe('Video page', () => {
  let videopage: VideoPage;

  test.beforeEach(async ({ page }) => {
    videopage = new VideoPage(page);
    await videopage.loggedIn();
    await videopage.mockPreferences();
    await videopage.mockWorkspace();
    await videopage.mockGetCampaign();
    await videopage.mockGetVideo();
    await videopage.mockGetVideoObservations();
    await videopage.open();
  });

  test('should open the edit dialog in the themes combobox', async () => {});
  test('should open the edit dialog in the tags combobox', async () => {});
  test('edit dialog should have an input and a summary text for the current item and a save button', async () => {});
  test('should allow changing the name of a tag', async () => {});
  test('should allow changing the name of a theme', async () => {});
  test('should save and show a success toast after saving the edited name', async () => {});
  test('should show an error if trying to save with an existing name', async () => {});
  test('should not save and show an error if the input is empty', async () => {});
});
