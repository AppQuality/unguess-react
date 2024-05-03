import { ContainerCard, LG, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useGetVideoByVidQuery } from 'src/features/api';
import { styled } from 'styled-components';
import { TranscriptParagraph } from './TranscriptParagraph';

const StyledContainerCard = styled(ContainerCard)`
  margin: ${({ theme }) => theme.space.xl} 0;
  padding: ${({ theme }) => theme.space.xl};
  gap: ${({ theme }) => theme.space.sm};
`;
const StyledTitle = styled(LG)`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
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
      <StyledTitle isBold>{t('__VIDEO_PAGE_TRANSCRIPT_TITLE')}</StyledTitle>
      <TranscriptParagraph
        words={`T71338, Apple iPhone 13, use case three. Okay, so I am on the product page and I'm just gonna scroll through the photos. Looks like a very nice cotton -only shirt. I love the photos, it shows the product very good.`}
        startTime="00:00"
        endTime="00:00"
      />
    </StyledContainerCard>
  );
};

export { Transcript };
