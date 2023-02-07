import {
  Anchor,
  PageHeader,
  Skeleton,
  XXXL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

interface Props {
  campaignId: string;
  title: GetCampaignsByCidBugsAndBidApiResponse['title'];
}

export const Header = ({ campaignId, title }: Props) => {
  const { t } = useTranslation();
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });

  return (
    <PageHeader>
      {isCampaignLoading ||
      isCampaignFetching ||
      isCampaignError ||
      !campaign ? (
        <Skeleton height="50px" />
      ) : (
        <PageHeader.Breadcrumb>
          <Link to={useLocalizeRoute(`projects/${campaign.project.id}`)}>
            <Anchor id="breadcrumb-parent">{campaign.project.name}</Anchor>
          </Link>
          <Link to={useLocalizeRoute(`campaigns/${parseInt(campaignId, 10)}`)}>
            <Anchor>{campaign.customer_title}</Anchor>
          </Link>
          <Link
            to={useLocalizeRoute(`campaigns/${parseInt(campaignId, 10)}/bugs`)}
          >
            <Anchor>{t('__PAGE_TITLE_BUGS_COLLECTION')}</Anchor>
          </Link>
        </PageHeader.Breadcrumb>
      )}
      <PageHeader.Main infoTitle={title.full}>
        <XXXL isBold>{title.full}</XXXL>
      </PageHeader.Main>
    </PageHeader>
  );
};
