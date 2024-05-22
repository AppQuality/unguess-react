import { Page } from 'src/features/templates/Page';
import { useTranslation } from 'react-i18next';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { useAppDispatch } from 'src/app/hooks';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import VideoPageHeader from './PageHeader';
import VideoPageContent from './Content';

const VideoPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { campaignId } = useParams();
  const { data: { workspace } = {} } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId ?? '0',
  });

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  return (
    <Page
      title={t('__VIDEO_PAGE_TITLE')}
      className="video-page"
      pageHeader={<VideoPageHeader />}
      route="video"
      excludeMarginTop
      excludeMarginBottom
    >
      <VideoPageContent />
    </Page>
  );
};

export default VideoPage;
