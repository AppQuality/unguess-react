import { Anchor, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
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
          <Link to={projectRoute}>
            <Anchor id="breadcrumb-parent">{project?.name}</Anchor>
          </Link>
          <Link to={campaignRoute}>
            <Anchor id="breadcrumb-parent">{campaign?.customer_title}</Anchor>
          </Link>
        </PageHeader.Breadcrumbs>
        <PageHeader.Main mainTitle={t('__VIDEOS_PAGE_TITLE')}>
          <PageHeader.Title>
            <PageTitle>{t('__VIDEOS_PAGE_TITLE')}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Meta>
            <Metas campaign={campaign} />
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default VideosPageHeader;
