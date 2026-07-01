import { Skeleton, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { Meta } from 'src/common/components/Meta';
import { StatusMeta } from 'src/common/components/meta/StatusMeta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import { formatApiDateShortMonthYear } from 'src/common/date/apiDate';
import {
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';
import { CampaignStatus } from 'src/types';
import styled from 'styled-components';
import { getAllSeverityTags } from '../Videos/utils/getSeverityTagsWithCount';

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.space.sm};
`;

const StyledPipe = styled(Pipe)`
  display: inline;
`;

const SeveritiesMetaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeviceMetaItem = styled(Span)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
  margin-right: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.blue[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  > svg {
    width: 16px;
    height: 16px;
  }
`;

const DeviceMetaCount = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

/**
 * Content-only informational meta row (video count, date, devices, severities,
 * status) for the campaign media-list tab. The action buttons that used to
 * live next to this row in the legacy `Metas` component now belong to the
 * shared `EntityPageHeader`, so they are intentionally not rendered here.
 */
export const MediaListMetaRow = ({
  campaignId,
  className,
}: {
  campaignId: string;
  className?: string;
}) => {
  const { t } = useTranslation();

  const {
    data: campaign,
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
  } = useGetCampaignsByCidQuery({ cid: campaignId });

  const {
    data: videos,
    isLoading: isVideosLoading,
    isFetching: isFetchingVideos,
  } = useGetCampaignsByCidVideosQuery({ cid: campaignId });

  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
  } = useGetCampaignsByCidObservationsQuery({ cid: campaignId });

  if (
    isCampaignLoading ||
    isCampaignFetching ||
    (isVideosLoading && !videos) ||
    (isLoadingObservations && !observations) ||
    !campaign
  ) {
    return <Skeleton width="500px" height="20px" />;
  }

  const { status, start_date } = campaign;
  const totalVideos = videos?.items.length ?? 0;

  const deviceCounts = (videos?.items || []).reduce(
    (acc, video) => {
      const formFactor = video.device?.formFactor;

      if (formFactor === 'desktop') {
        acc.desktop += 1;
      } else if (formFactor === 'smartphone') {
        acc.smartphone += 1;
      } else if (formFactor === 'tablet') {
        acc.tablet += 1;
      } else {
        acc.unknown += 1;
      }

      return acc;
    },
    { desktop: 0, smartphone: 0, tablet: 0, unknown: 0 }
  );

  const deviceMetas = [
    {
      key: 'desktop',
      label: t('__VIDEOS_LIST_DESKTOP_TITLE'),
      count: deviceCounts.desktop,
    },
    {
      key: 'smartphone',
      label: t('__VIDEOS_LIST_SMARTPHONE_TITLE'),
      count: deviceCounts.smartphone,
    },
    {
      key: 'tablet',
      label: t('__VIDEOS_LIST_TABLET_TITLE'),
      count: deviceCounts.tablet,
    },
    {
      key: 'unknown',
      label: t('__VIDEOS_LIST_UNKNOWN_DEVICE_TITLE'),
      count: deviceCounts.unknown,
    },
  ].filter((item) => item.count > 0);

  const severities = observations ? getAllSeverityTags(observations) : [];

  return (
    <PageMeta className={className} data-qa="media_list_tab_meta">
      <Span isBold style={{ color: appTheme.palette.blue[600] }}>
        {totalVideos}{' '}
        {t('__VIDEOS_LIST_META_VIDEO_COUNT', { count: totalVideos })}
      </Span>
      {start_date && (
        <Span style={{ color: appTheme.palette.grey[700] }}>
          {formatApiDateShortMonthYear(start_date)}
        </Span>
      )}
      {isFetchingVideos ? (
        <StyledSkeleton width="400px" height="20px" />
      ) : (
        <>
          {deviceMetas.length > 0 && (
            <StyledPipe style={{ paddingLeft: appTheme.space.sm }} />
          )}
          {deviceMetas.map((deviceMeta) => (
            <DeviceMetaItem key={deviceMeta.key}>
              {getDeviceIcon(deviceMeta.key)}
              {deviceMeta.label}{' '}
              <DeviceMetaCount>{deviceMeta.count}</DeviceMetaCount>
            </DeviceMetaItem>
          ))}
        </>
      )}
      {totalVideos > 0 && severities.length > 0 && <StyledPipe />}
      {isFetchingObservations ? (
        <StyledSkeleton width="400px" height="20px" />
      ) : (
        <SeveritiesMetaContainer>
          {severities.map((severity) => (
            <Meta
              key={severity.name}
              size="large"
              color={severity.style}
              secondaryText={severity.count}
            >
              {capitalizeFirstLetter(severity.name)}
            </Meta>
          ))}
        </SeveritiesMetaContainer>
      )}
      <StatusMeta status={status.name as CampaignStatus} />
    </PageMeta>
  );
};
