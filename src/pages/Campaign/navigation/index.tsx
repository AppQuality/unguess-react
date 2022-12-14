import { useTranslation } from 'react-i18next';
import { StyledDivider } from 'src/common/components/navigation';
import { CampaignWithOutput, Report } from 'src/features/api';
import { StickyContainer } from 'src/common/components/StickyContainer';
import {
  getLocalizedFunctionalDashboardUrl,
  getLocalizedUXDashboardUrl,
} from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { NavigationLoading } from './NavigationLoading';
import { BugsNavigation } from './BugsNavigation';
import { MediaNavigation } from './MediaNavigation';
import { ReportNavigation } from './ReportNavigation';
import { ExternalLink } from './ExternalLink';

const Navigation = ({
  campaignId,
  outputs,
  reports,
  isFunctional,
}: {
  campaignId: number;
  outputs: CampaignWithOutput['outputs'];
  reports: Report[];
  isFunctional?: boolean;
}) => {
  const { t } = useTranslation();

  const hasBugs = outputs?.includes('bugs');
  const hasMedia = outputs?.includes('media');
  const hasReports = !!(reports.length || isFunctional);

  return (
    <StickyContainer>
      {hasBugs && <BugsNavigation />}
      {hasMedia && <MediaNavigation />}
      {hasReports && <ReportNavigation />}
      {(hasBugs || hasMedia) && <StyledDivider />}
      {hasBugs && (
        <ExternalLink
          id="anchor-bugs-list-navigation"
          url={getLocalizedFunctionalDashboardUrl(campaignId, i18n.language)}
        >
          {t('__CAMPAIGN_PAGE_NAVIGATION_BUG_EXTERNAL_LINK_LABEL')}
        </ExternalLink>
      )}
      {hasMedia && (
        <ExternalLink
          id="anchor-media-list-navigation"
          url={getLocalizedUXDashboardUrl(campaignId, i18n.language)}
        >
          {t('__CAMPAIGN_PAGE_NAVIGATION_MEDIA_EXTERNAL_LINK_LABEL')}
        </ExternalLink>
      )}
    </StickyContainer>
  );
};

export { Navigation, NavigationLoading };
