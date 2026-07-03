import { Skeleton, Span } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { capitalizeFirstLetter } from 'src/common/capitalizeFirstLetter';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { Meta } from 'src/common/components/Meta';
import { PageMeta } from 'src/common/components/PageMeta';
import { Pipe } from 'src/common/components/Pipe';
import styled from 'styled-components';
import { useMediaDeviceAndSeverityMetas } from '../Videos/useMediaDeviceAndSeverityMetas';

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.space.sm};
`;

const StyledPipe = styled(Pipe)`
  display: inline;
  padding: 0 ${({ theme }) => theme.space.xs};
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
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  > svg {
    width: 24px;
    height: 24px;
  }
`;

const DeviceMetaCount = styled(Span)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

/**
 * Content-only informational meta row (video count, devices, severities) for
 * the hub media-list tab. Mirrors `MediaListMetaRow` (campaign) minus
 * date/status, which the legacy `Metas` component also never showed for hubs.
 */
export const HubMediaListMetaRow = ({
  hubId,
  className,
}: {
  hubId: string;
  className?: string;
}) => {
  const { t } = useTranslation();

  const {
    isLoading,
    totalVideos,
    isFetchingVideos,
    deviceMetas,
    isFetchingObservations,
    severities,
  } = useMediaDeviceAndSeverityMetas(hubId);

  if (isLoading) {
    return <Skeleton width="500px" height="20px" />;
  }

  return (
    <PageMeta className={className} data-qa="hub_media_list_tab_meta">
      <Span isBold style={{ color: appTheme.palette.blue[600] }}>
        {totalVideos}{' '}
        {t('__VIDEOS_LIST_META_VIDEO_COUNT', { count: totalVideos })}
      </Span>
      {isFetchingVideos ? (
        <StyledSkeleton width="400px" height="20px" />
      ) : (
        <>
          {deviceMetas.length > 0 && <StyledPipe />}
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
    </PageMeta>
  );
};
