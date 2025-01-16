import {
  Skeleton,
  PageHeader,
  Anchor,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GetCampaignsByCidApiResponse,
  useGetProjectsByPidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const BreadCrumbs = ({
  campaign,
}: {
  campaign: GetCampaignsByCidApiResponse;
}) => {
  const { t } = useTranslation();

  const projectRoute = useLocalizeRoute(`projects/${campaign.project.id}`);
  const campaignRoute = useLocalizeRoute(`campaigns/${campaign.id}`);
  const bugsRoute = useLocalizeRoute(`campaigns/${campaign.id}/bugs`);

  const {
    currentData: project,
    isLoading,
    isFetching,
  } = useGetProjectsByPidQuery({
    pid: campaign.project.id.toString(),
  });

  if (isLoading || isFetching) {
    return <Skeleton width="200px" height="12px" />;
  }

  return (
    <PageHeader.Breadcrumbs>
      {project ? (
        <Link to={projectRoute}>
          <Anchor id="breadcrumb-parent">{project.name}</Anchor>
        </Link>
      ) : (
        campaign.project.name
      )}
      <Link to={campaignRoute}>
        <Anchor>{campaign.customer_title}</Anchor>
      </Link>
      <Link to={bugsRoute}>
        <Anchor>{t('__PAGE_TITLE_BUGS_COLLECTION')}</Anchor>
      </Link>
    </PageHeader.Breadcrumbs>
  );
};
