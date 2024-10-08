import { useEffect, useState } from 'react';
import {
  GetCampaignsByCidUxApiResponse,
  useGetCampaignsByCidClustersQuery,
  useGetCampaignsByCidUxQuery,
  useGetCampaignsByCidVideoTagsQuery,
} from 'src/features/api';
import { useTranslation } from 'react-i18next';
import { SeverityFilterType } from 'src/features/bugsPage/severityFilter';
import { ClusterFilterType } from 'src/features/uxFilters/clusterFilter';
import { InsightStateType } from 'src/features/uxFilters/insights';

export const useUxData = ({
  campaignId,
  isPreview,
}: {
  campaignId: number;
  isPreview?: boolean;
}) => {
  const { t } = useTranslation();
  const [campaignData, setCampaignData] = useState<{
    cid: number;
    filters: {
      clusters?: ClusterFilterType['clusters']['available'];
      severities?: SeverityFilterType['severities']['available'];
      insights?: InsightStateType['insights']['available'];
    };
    uxData?: GetCampaignsByCidUxApiResponse;
  }>();

  const {
    data: tags,
    isLoading: isLoadingTags,
    isFetching: isFetchingTags,
    isError: isErrorTags,
  } = useGetCampaignsByCidVideoTagsQuery({
    cid: campaignId.toString(),
  });

  const severities = tags?.filter((tag) => tag.group.name === 'severity');
  const severitiesData = severities
    ?.map((severity) => severity.tags)
    .flat()
    .map((tag) => ({
      id: tag.id,
      name: tag.name,
      style: tag.style,
    }));

  const clustersData = [{ id: 0, name: t('__INSIGHT_CLUSTER_GENERAL') }];

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: uxData,
  } = useGetCampaignsByCidUxQuery({
    cid: campaignId.toString(),
    ...(!isPreview && { showAsCustomer: true }),
  });

  const { data: clusters } = useGetCampaignsByCidClustersQuery({
    cid: campaignId.toString(),
  });

  useEffect(() => {
    if (uxData?.findings) {
      setCampaignData({
        cid: campaignId,
        filters: {
          clusters: [
            ...clustersData,
            ...(clusters?.items?.map((c) => ({
              id: c.id,
              name: c.name,
            })) || []),
          ],
          severities: severitiesData,
        },
        uxData,
      });
    }
  }, [uxData, clusters]);

  return {
    isLoading:
      isLoadingCampaign ||
      isFetchingCampaign ||
      isLoadingTags ||
      isFetchingTags,
    isError: isErrorCampaign || isErrorTags,
    data: campaignData,
  };
};
