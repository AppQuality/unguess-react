import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useOutletContext } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import type { CampaignHubContext } from 'src/features/templates/CampaignsHubsMiddleware';
import type { GetCampaignsByCidApiResponse } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useCampaignOrHub } from 'src/pages/Campaign/pageHeader/useCampaign';
import { Metas } from './Metas';

const VideosPageHeader = () => {
  const { t } = useTranslation();
  const { isHub, entityId } = useOutletContext<CampaignHubContext>();

  const { campaign, project } = useCampaignOrHub(entityId, isHub);
  const projectRoute = useLocalizeRoute(`projects/${project?.id}`);
  const prefix = isHub ? 'hubs' : 'campaigns';
  const entityRoute = useLocalizeRoute(`${prefix}/${entityId}`);

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
          {!isHub ? (
            <Link to={entityRoute}>
              <Anchor id="breadcrumb-campaign">
                {campaign?.customer_title}
              </Anchor>
            </Link>
          ) : (
            campaign?.customer_title
          )}
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={t('__VIDEOS_PAGE_TITLE')}>
          <PageHeader.Title>{t('__VIDEOS_PAGE_TITLE')}</PageHeader.Title>
          <PageHeader.Meta>
            <Metas campaign={campaign as GetCampaignsByCidApiResponse} />
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideosPageHeader;
