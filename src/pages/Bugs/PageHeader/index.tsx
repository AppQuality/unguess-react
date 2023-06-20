import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { Link } from 'react-router-dom';
import { HeaderSkeleton } from 'src/pages/Campaign/pageHeader/HeaderSkeleton';
import { Tools } from 'src/pages/Bugs/PageHeader/Tools';
import { useCampaign } from 'src/pages/Campaign/pageHeader/useCampaign';
import { useTranslation } from 'react-i18next';
import { getLocalizeoFirstLevelDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import BugsPageHeaderLoader from './PageHeaderLoader';

const BugsPageHeader = ({ campaignId }: { campaignId: number }) => {
  const { t } = useTranslation();
  const { isUserLoading, isLoading, isError, campaign, project } =
    useCampaign(campaignId);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return isUserLoading || isError ? null : (
    <LayoutWrapper isNotBoxed>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          {project.hasAccess ? (
            <Link to={project.route}>
              <Anchor id="breadcrumb-parent">{project.name}</Anchor>
            </Link>
          ) : (
            project.name
          )}

          <Link to={getLocalizeoFirstLevelDashboardRoute(campaignId)}>
            <Anchor>{campaign.customer_title}</Anchor>
          </Link>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={campaign.customer_title}>
          <PageHeader.Title>
            {t('__PAGE_TITLE_BUGS_COLLECTION')}
          </PageHeader.Title>
          <PageHeader.Meta>
            <Tools
              campaignId={campaignId}
              customerTitle={campaign.customer_title}
            />
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
export { BugsPageHeader, BugsPageHeaderLoader };
