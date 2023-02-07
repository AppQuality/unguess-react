import {
  Anchor,
  PageHeader,
  Skeleton,
  XXXL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GetCampaignsByCidApiResponse,
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

interface Props {
  campaignId: string;
  title: GetCampaignsByCidBugsAndBidApiResponse['title'];
}

const BreadCrumb = ({
  campaign,
}: {
  campaign: GetCampaignsByCidApiResponse;
}) => {
  const { t } = useTranslation();
  return (
    <PageHeader.Breadcrumb>
      <Link to={useLocalizeRoute(`projects/${campaign.project.id}`)}>
        <Anchor id="breadcrumb-parent">{campaign.project.name}</Anchor>
      </Link>
      <Link to={useLocalizeRoute(`campaigns/${campaign.id}`)}>
        <Anchor>{campaign.customer_title}</Anchor>
      </Link>
      <Link to={useLocalizeRoute(`campaigns/${campaign.id}/bugs`)}>
        <Anchor>{t('__PAGE_TITLE_BUGS_COLLECTION')}</Anchor>
      </Link>
    </PageHeader.Breadcrumb>
  );
};
export const Header = ({ campaignId, title }: Props) => {
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });

  if (isCampaignLoading || isCampaignFetching || isCampaignError || !campaign) {
    return (
      <PageHeader>
        <Skeleton height="50px" />
        <PageHeader.Main infoTitle={title.full}>
          <XXXL isBold>{title.full}</XXXL>
        </PageHeader.Main>
      </PageHeader>
    );
  }

  return (
    <PageHeader>
      <BreadCrumb campaign={campaign} />
      <PageHeader.Main infoTitle={title.full}>
        <XXXL isBold>{title.full}</XXXL>
      </PageHeader.Main>
    </PageHeader>
  );
};
