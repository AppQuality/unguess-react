import { LG } from '@appquality/unguess-design-system';
import { useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidVideoTagsQuery,
} from 'src/features/api';

const VideoPageContent = () => {
  const { campaignId, videoId } = useParams();

  const {
    data: campaign,
    isFetching: isFetchingCampaign,
    isLoading: isLoadingCampaign,
    isError: isErrorCampaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId || '',
  });

  const {
    data: videoTags,
    isLoading: isLoadingVideoTags,
    isFetching: isFetchingVideoTags,
    isError: isErrorVideoTags,
  } = useGetCampaignsByCidVideoTagsQuery({
    cid: campaignId || '',
  });

  // GET /videos/{videoId}
  // GET /videos/{videoId}/observations

  console.log('campaign', campaign);
  console.log('videoTags', videoTags);

  return (
    <LayoutWrapper>
      <LG>Video #{videoId}</LG>
    </LayoutWrapper>
  );
};

export default VideoPageContent;
