import { useTranslation } from 'react-i18next';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { useMemo } from 'react';
import { ReportRow } from './ReportRow';
import { EmptyState } from './EmptyState';

export const widgets = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { data: campaign } = useGetCampaignsByCidQuery({
    cid: campaignId.toString(),
  });

  const {
    data: reports,
    isLoading: isLoadingReports,
    isFetching: isFetchingReports,
  } = useGetCampaignsByCidReportsQuery({
    cid: campaignId.toString(),
  });

  const reportList = useMemo(
    () => [
      ...(reports && reports.length ? reports : []),
      ...(campaign?.family.name.toLocaleLowerCase() === 'functional'
        ? ['bugreport' as const]
        : []),
    ],
    [campaign, reports]
  );

  const showReport = !!(
    reportList.length &&
    campaign &&
    !isLoadingReports &&
    !isFetchingReports
  );

  if (!showReport || !campaign)
    return [
      {
        title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_GROUP_OTHER_LABEL'),
        type: 'title' as const,
      },
      {
        id: 'reports',
        content: <EmptyState />,
        type: 'item' as const,
        title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OTHER_REPORTS_LABEL'),
      },
    ];

  return [
    {
      title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_GROUP_OTHER_LABEL'),
      type: 'title' as const,
    },
    {
      id: 'reports',
      content: <ReportRow reports={reportList} campaign={campaign} />,
      type: 'item' as const,
      title: t('__CAMPAIGN_PAGE_NAVIGATION_BUG_ITEM_OTHER_REPORTS_LABEL'),
    },
  ];
};
