import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { GetCampaignsByCidVideoApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

const Video = ({
  video,
}: {
  video: GetCampaignsByCidVideoApiResponse['items'][number]['videos'][number];
}) => {
  const { t } = useTranslation();
  const { campaignId } = useParams();
  const videoUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${video.id}`
  );

  return (
    <>
      <hr />
      <p>
        <p>{video.id}</p>
        <p>{video.url}</p>
        <p>{video.streamUrl}</p>
        <p>
          {video.tester.name} {video.tester.id}
        </p>
        <Link to={videoUrl}>
          <Button id="button-bugs-list-header" isPrimary isAccent>
            {t('__VIDEOS_PAGE_BUTTON_DETAIL_VIDEO')}
          </Button>
        </Link>
      </p>
    </>
  );
};

export { Video };
