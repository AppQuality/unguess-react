import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
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
    <div style={{ margin: `${appTheme.space.md} 0` }}>
      <p style={{ margin: `${appTheme.space.xs} 0` }}>
        Video {video.id} by {video.tester.name} {video.tester.id}
      </p>
      <Link to={videoUrl}>
        <Button id="button-bugs-list-header" isPrimary isAccent>
          {t('__VIDEOS_PAGE_BUTTON_DETAIL_VIDEO')}
        </Button>
      </Link>
    </div>
  );
};

export { Video };
