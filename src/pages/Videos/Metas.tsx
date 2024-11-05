import { useEffect, useState } from 'react';
import {
  MD,
  Skeleton,
  useToast,
  Notification,
  Span,
  IconButton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { CampaignSettings } from 'src/common/components/inviteUsers/campaignSettings';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { ReactComponent as DashboardIcon } from 'src/assets/icons/dashboard-icon.svg';
import { ReactComponent as InsightsIcon } from '@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg';
import {
  CampaignWithOutput,
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { ReactComponent as DownloadIcon } from 'src/assets/icons/download-stroke.svg';
import queryString from 'query-string';
import { Link, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { FEATURE_FLAG_TAGGING_TOOL } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
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
  const { campaignId } = useParams();
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);
  const insightsRoute = useLocalizeRoute(`campaigns/${campaign.id}/insights`);
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { hasFeatureFlag } = useFeatureFlag();

  const hasTaggingToolFeature = hasFeatureFlag(FEATURE_FLAG_TAGGING_TOOL);

  const {
    data: videos,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidVideosQuery({ cid: campaign.id.toString() });

  const {
    data: observations,
    isFetching: isFetchingObservations,
    isLoading: isLoadingObservations,
    isError: isErrorObservations,
  } = useGetCampaignsByCidObservationsQuery({
    cid: campaignId ?? '',
  });

  useEffect(() => {
    if (videos && videos.items.length > 0) {
      setTotalVideos(videos.items.length);
    }
  }, [videos]);

  const severities = observations ? getAllSeverityTags(observations) : [];

  const observationsCount = observations ? observations.results.length : 0;

  const handleUseCaseExport = () => {
    fetch(`${process.env.REACT_APP_CROWD_WP_URL}/wp-admin/admin-ajax.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        id: campaignId,
        action: 'ug_generate_research_report',
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          window.location.href = `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/themes/unguess/report/temp/${res.data.file}`;
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="success"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_SUCCESS_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
        } else {
          addToast(
            ({ close }) => (
              <Notification
                onClose={close}
                type="error"
                message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
                closeText={t('__TOAST_CLOSE_TEXT')}
                isPrimary
              />
            ),
            { placement: 'top' }
          );
          // eslint-disable-next-line no-console
          console.error(res);
        }
      })
      .catch((e) => {
        addToast(
          ({ close }) => (
            <Notification
              onClose={close}
              type="error"
              message={t('__VIDEO_PAGE_ACTIONS_EXPORT_TOAST_ERROR_MESSAGE')}
              closeText={t('__TOAST_CLOSE_TEXT')}
              isPrimary
            />
          ),
          { placement: 'top' }
        );
        // eslint-disable-next-line no-console
        console.error(e.message);
      });
  };

  if (
    isFetching ||
    isLoading ||
    isFetchingObservations ||
    isLoadingObservations
  )
    return <Skeleton width="200px" height="20px" />;
  if (isError || isErrorObservations) return null;

  return (
    <FooterContainer>
      <PageMeta>
        <Span isBold style={{ color: appTheme.palette.blue[600] }}>
          {totalVideos}{' '}
          {t('__VIDEOS_LIST_META_VIDEO_COUNT', { count: totalVideos })}
        </Span>
        <StyledPipe />
        {severities && severities.length > 0 && (
          <>
            <SeveritiesMetaText>
              <Trans
                i18nKey="__VIDEO_LIST_META_SEVERITIES_COUNT"
                values={{ count: observationsCount }}
                count={observationsCount}
                components={{
                  md: <MD />,
                  span: (
                    <Span
                      isBold
                      style={{ color: appTheme.palette.blue[600] }}
                    />
                  ),
                }}
                defaults="<md>You have found <span>{{count}} observations:</span></md>"
              />
            </SeveritiesMetaText>
            <SeveritiesMetaContainer>
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
            <StyledPipe />
          </>
        )}
        <StatusMeta status={status.name as CampaignStatus} />
      </PageMeta>
      <ButtonWrapper>
        <CampaignSettings />
        <>
          <MD color={appTheme.palette.blue[600]}>
            {' '}
            {t('__INSIGHTS_PAGE_NAVIGATION_LABEL')}
          </MD>
          <Link to={campaignRoute}>
            <Tooltip
              content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_DASHBOARD_TOOLTIP')}
              size="medium"
              type="light"
              placement="auto"
            >
              <IconButton isBasic={false}>
                <DashboardIcon />
              </IconButton>
            </Tooltip>
          </Link>
          {hasTaggingToolFeature && totalVideos > 0 && (
            <Link to={insightsRoute}>
              <Tooltip
                content={t('__UX_CAMPAIGN_PAGE_NAVIGATION_INSIGHTS_TOOLTIP')}
                size="medium"
                type="light"
                placement="auto"
              >
                <IconButton isBasic={false}>
                  <InsightsIcon />
                </IconButton>
              </Tooltip>
            </Link>
          )}
        </>
        {totalVideos > 0 && (
          <Tooltip
            content={t('__VIDEO_PAGE_ACTIONS_EXPORT_BUTTON_LABEL')}
            size="medium"
            type="light"
            placement="auto"
          >
            <IconButton
              isAccent
              isPrimary
              onClick={handleUseCaseExport}
              style={{ marginLeft: appTheme.space.xs }}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        )}
      </ButtonWrapper>
    </FooterContainer>
  );
};
