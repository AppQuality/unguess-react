import { useTranslation } from 'react-i18next';
import {
  Output,
  useGetCampaignsByCidQuery,
  useGetCampaignsByCidReportsQuery,
} from 'src/features/api';
import { getLocalizedPlanUrl } from 'src/hooks/useLocalizeDashboardUrl';
import { ExternalLink } from '../../ExternalLink';
import { ReportRow } from './ReportRow';

export const widgets = ({ campaignId }: { campaignId: number }) => {
  const { t, i18n } = useTranslation();
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

  function hasBugs(outputs: Output[] = []) {
    return outputs.includes('bugs');
  }

  const reportList = [
    ...(reports && reports.length ? reports : []),
    ...(hasBugs(campaign?.outputs) ? ['bugreport' as const] : []),
  ];

  const showReport = !!(
    reportList.length &&
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
    ...(campaign?.plan
      ? [
          {
            id: 'anchor-plan-navigation',
            content: (
              <ExternalLink
                id="anchor-plan-navigation"
                url={getLocalizedPlanUrl(campaign.plan, i18n.language)}
              >
                {t('__CAMPAIGN_PAGE_NAVIGATION_PLAN_EXTERNAL_LINK_LABEL')}
              </ExternalLink>
            ),
            type: 'footer' as const,
          },
        ]
      : []),
  ];
};
