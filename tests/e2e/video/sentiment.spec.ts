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
    await expect(videopage.elements().paragraphContent().first()).toBeVisible();
  });

  test('Should print the content of the paragraphs', async () => {
    await expect(videopage.elements().paragraphContent()).toHaveCount(5);

    const contents = await videopage.elements().paragraphContent().allInnerTexts();

    expect(contents).toEqual([
      'ciao \n',
      'ciao2 \n',
      'ciao3 \n',
      'ciao4 \n',
      'ciao5 \n',
    ]);
  });

  test('Should print the sentiment values', async ({ i18n }) => {
    await expect(videopage.elements().sentimentWrapper()).toHaveCount(5);

    const contents = await videopage.elements().sentimentItem().allInnerTexts();

    expect(contents).toEqual([
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_VERY_NEGATIVE'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_NEGATIVE'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_NEUTRAL'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_POSITIVE'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_VERY_POSITIVE'),
    ]);
  });
});
