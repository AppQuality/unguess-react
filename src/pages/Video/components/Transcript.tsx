import {
  ContainerCard,
  LG,
  Paragraph,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetVideoByVidQuery } from 'src/features/api';
import { styled } from 'styled-components';

const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xxl} 0;
`;

const Transcript = () => {
  const { t } = useTranslation();
  const { campaignId, videoId } = useParams();

  const {
    data: video,
    isFetching: isFetchingVideo,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoByVidQuery({
    vid: videoId || '',
  });

  if (!video || isErrorVideo || !video.transcript) return null;

  if (isFetchingVideo || isLoadingVideo) return <Skeleton />;

  return (
    <StyledContainerCard>
      <LG>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</LG>
      <Paragraph>{video.transcript}</Paragraph>
    </StyledContainerCard>
  );
};

export { Transcript };
