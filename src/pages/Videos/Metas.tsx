import { MD, Paragraph, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import {
  CampaignWithOutput,
  useGetCampaignsByCidVideoQuery,
} from 'src/features/api';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { getAllSeverityTags } from './utils/getSeverityTagsWithCount';

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
  margin-right: ${({ theme }) => theme.space.sm};
`;

const StyledPipe = styled(Pipe)`
  display: inline;
  margin-left: ${({ theme }) => theme.space.sm};
`;

const SeveritiesMetaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SeveritiesMetaText = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-right: ${({ theme }) => theme.space.sm};
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
    data: videos,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidVideoQuery({ cid: campaign.id.toString() });
  const totalVideos = videos?.items.reduce(
    (total, item) => total + item.videos.length,
    0
  );
  const severities = videos ? getAllSeverityTags(videos.items) : [];

  if (isFetching || isLoading) return <Skeleton width="200px" height="20px" />;
  if (isError) return null;
  return (
    <FooterContainer>
      <PageMeta>
        <VideosMeta>
          {totalVideos} {t('__VIDEOS_LIST_META_VIDEO_COUNT')}
        </VideosMeta>
        {severities && (
          <SeveritiesMetaContainer>
            <SeveritiesMetaText>
              {t('__VIDEO_LIST_META_SEVERITIES_COUNT')}
            </SeveritiesMetaText>
            {severities.map((severity) => (
              <Meta
                size="large"
                color={severity.style}
                secondaryText={severity.count}
              >
                {capitalizeFirstLetter(severity.name)}
              </Meta>
            ))}
          </SeveritiesMetaContainer>
        )}
        <StyledPipe />
        <StatusMeta status={status.name as CampaignStatus} />
      </PageMeta>
      <ButtonWrapper>
        <CampaignSettings />
      </ButtonWrapper>
    </FooterContainer>
  );
};