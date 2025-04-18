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

  test('Should have one paragraph component per paragraph', async () => {
    const paragraphs = await videopage.elements().paragraphContent().all();
    expect(paragraphs.length).toBe(5);
  });
  test('Should print the content of the paragraphs', async () => {
    const paragraphs = await videopage.elements().paragraphContent().all();

    const contents = await Promise.all(
      paragraphs.map(async (paragraph) => paragraph.innerText())
    );

    expect(contents).toEqual([
      'ciao \n',
      'ciao2 \n',
      'ciao3 \n',
      'ciao4 \n',
      'ciao5 \n',
    ]);
  });
  test('Should print the sentiment items', async () => {
    const sentiments = await videopage.elements().sentimentWrapper().all();
    expect(sentiments.length).toBe(5);
  });

  test('Should print the sentiment values', async ({ i18n }) => {
    const sentiments = await videopage.elements().sentimentItem().all();

    const contents = await Promise.all(
      sentiments.map(async (paragraph) => paragraph.innerText())
    );

    expect(contents).toEqual([
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_VERY_NEGATIVE'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_NEGATIVE'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_NEUTRAL'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_POSITIVE'),
      i18n.t('__TRANSCRIPT_SENTIMENT_VALUE_VERY_POSITIVE'),
    ]);
  });
});
