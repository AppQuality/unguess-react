import { useTranslation } from 'react-i18next';
import {
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { ReportRow } from './ReportRow';

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
  const reportList = [
    ...(reports ?? []),
    ...(campaign?.family.name.toLocaleLowerCase() === 'functional'
      ? ['bugreport' as const]
      : []),
  ];

  const showReport = !!(
    reportList &&
    campaign &&
    !isLoadingReports &&
    !isFetchingReports
  );

  if (!showReport || !campaign) return [];

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
