import { useEffect, useState } from 'react';
import { Button, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import {
  CampaignWithOutput,
  useGetCampaignsByCidMetaQuery,
} from 'src/features/api';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useVideo } from 'src/pages/Videos/useVideos';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { CampaignDurationMeta } from './CampaignDurationMeta';
import { DesktopMeta } from './DesktopMeta';
import { SmartphoneMeta } from './SmartphoneMeta';
import { TabletMeta } from './TabletMeta';
import { TvMeta } from './TvMeta';

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
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const {
    data: meta,
    isLoading,
    isFetching,
  } = useGetCampaignsByCidMetaQuery({ cid: campaign.id.toString() });

  const { sorted: videos } = useVideo(campaign.id.toString() ?? '');

  useEffect(() => {
    if (videos) {
      const groupedVideos = videos?.reduce(
        (total, item) => total + item.videos.total,
        0
      );
      setTotalVideos(groupedVideos);
    }
  }, [videos]);

  const { t } = useTranslation();
  const { hasFeatureFlag } = useFeatureFlag();
  const functionalDashboardLink = useLocalizeRoute(
    `campaigns/${campaign.id}/bugs`
  );
  const videoDashboardLink = useLocalizeRoute(
    `campaigns/${campaign.id}/videos`
  );
  const { start_date, end_date, type, status, outputs, family } = campaign;

  if (isLoading || isFetching) return <Skeleton width="200px" height="20px" />;

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  return (
    <FooterContainer>
      <PageMeta>
        <StatusMeta status={family.name.toLowerCase() as CampaignStatus}>
          {type.name}
        </StatusMeta>
        <StatusMeta status={status.name as CampaignStatus} />
        <CampaignDurationMeta start={start_date} end={end_date} />
        {meta ? (
          <>
            <Pipe />
            {meta.allowed_devices.includes('desktop') && <DesktopMeta />}
            {meta.allowed_devices.includes('smartphone') && <SmartphoneMeta />}
            {meta.allowed_devices.includes('tablet') && <TabletMeta />}
            {meta.allowed_devices.includes('tv') && <TvMeta />}
          </>
        ) : null}
      </PageMeta>
      <ButtonWrapper>
        <CampaignSettings />
        {outputs?.includes('bugs') && (
          <Link to={functionalDashboardLink}>
            <Button id="button-bugs-list-header" isPrimary isAccent>
              {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_BUG')}
            </Button>
          </Link>
        )}
        {hasTaggingToolFeature && totalVideos > 0 && (
          <Link to={videoDashboardLink}>
            <Button id="button-bugs-list-header" isPrimary isAccent>
              {t('__CAMPAIGN_PAGE_BUTTON_DETAIL_VIDEO')}
            </Button>
          </Link>
        )}
      </ButtonWrapper>
    </FooterContainer>
  );
};
