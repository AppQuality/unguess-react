import { useEffect, useState } from 'react';
import {
  GetCampaignsByCidUxApiResponse,
  useGetCampaignsByCidClustersQuery,
  useGetCampaignsByCidUxQuery,
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

  const severities = [
    { id: 1, name: t('__INSIGHT_SEVERITY_MINOR') },
    { id: 2, name: t('__INSIGHT_SEVERITY_MAJOR') },
    { id: 3, name: t('__INSIGHT_SEVERITY_POSITIVE') },
    { id: 4, name: t('__INSIGHT_SEVERITY_OBSERVATION') },
  ];

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
          clusters: clusters?.items || [],
          severities,
        },
        uxData,
      });
    }
  }, [uxData, clusters]);

  return {
    isLoading: isLoadingCampaign || isFetchingCampaign,
    isError: isErrorCampaign,
    data: campaignData,
  };
};