import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useCampaign } from 'src/pages/Campaign/pageHeader/useCampaign';
import { Metas } from './Metas';

const VideosPageHeader = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const { campaign, project } = useCampaign(Number(campaignId));
  const projectRoute = useLocalizeRoute(`projects/${project?.id}`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaignId}`);
  if (!campaign || !project) return null;

  return (
    <LayoutWrapper isNotBoxed>
      <PageHeader>
        <PageHeader.Breadcrumbs>
          {project.hasAccess ? (
            <Link to={projectRoute}>
              <Anchor id="breadcrumb-project">{project.name}</Anchor>
            </Link>
          ) : (
            project.name
          )}
          <Link to={campaignRoute}>
            <Anchor id="breadcrumb-campaign">{campaign?.customer_title}</Anchor>
          </Link>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={t('__VIDEOS_PAGE_TITLE')}>
          <PageHeader.Title>{t('__VIDEOS_PAGE_TITLE')}</PageHeader.Title>
          <PageHeader.Meta>
            <Metas campaign={campaign} />
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideosPageHeader;
