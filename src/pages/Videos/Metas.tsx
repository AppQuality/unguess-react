import { PageMeta } from 'src/common/components/PageMeta';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { useTranslation } from 'react-i18next';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { CampaignWithOutput } from 'src/features/api';
import { CampaignStatus } from 'src/types';
import { Paragraph, Skeleton } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Pipe } from 'src/common/components/Pipe';
import { useVideo } from './useVideos';

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.sm};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const VideosMeta = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.blue[600]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;
const StyledPipe = styled(Pipe)`
  display: inline;
  margin-left: ${({ theme }) => theme.space.sm};
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-direction: row;
    align-items: center;

    ${ButtonWrapper} {
      margin-top: inherit;
      margin-bottom: inherit;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    ${ButtonWrapper} {
      margin-top: ${({ theme }) => theme.space.md};
    }
  }
`;

export const Metas = ({ campaign }: { campaign: CampaignWithOutput }) => {
  const { status } = campaign;
  const { t } = useTranslation();
  const {
    sorted: videos,
    isFetching,
    isLoading,
    isError,
  } = useVideo(campaign.id.toString() ?? '');

  if (isFetching || isLoading) return <Skeleton width="200px" height="20px" />;
  if (isError) return null;
  return (
    <FooterContainer>
      <PageMeta>
        <VideosMeta>
          {videos?.length} {t('__VIDEOS_LIST_META_VIDEO_COUNT')}
        </VideosMeta>
        <StyledPipe />
        <StatusMeta status={status.name as CampaignStatus} />
      </PageMeta>
      <ButtonWrapper>
        <CampaignSettings />
      </ButtonWrapper>
    </FooterContainer>
  );
};
