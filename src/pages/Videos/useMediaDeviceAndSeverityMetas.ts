import { useTranslation } from 'react-i18next';
import {
  useGetCampaignsByCidObservationsQuery,
  useGetCampaignsByCidVideosQuery,
} from 'src/features/api';
import { getAllSeverityTags } from './utils/getSeverityTagsWithCount';

/**
 * Shared data for the media-list meta row: video count, device breakdown and
 * severity tags for a campaign or hub id. Used by both `MediaListMetaRow`
 * (campaign, adds date/status) and `HubMediaListMetaRow` (hub).
 */
export const useMediaDeviceAndSeverityMetas = (entityId: string) => {
  const { t } = useTranslation();

  const {
    data: videos,
    isLoading: isVideosLoading,
    isFetching: isFetchingVideos,
  } = useGetCampaignsByCidVideosQuery({ cid: entityId });

  const {
    data: observations,
    isLoading: isLoadingObservations,
    isFetching: isFetchingObservations,
  } = useGetCampaignsByCidObservationsQuery({ cid: entityId });

  const isLoading =
    (isVideosLoading && !videos) || (isLoadingObservations && !observations);

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

  return {
    isLoading,
    totalVideos,
    isFetchingVideos,
    deviceMetas,
    isFetchingObservations,
    severities,
  };
};
