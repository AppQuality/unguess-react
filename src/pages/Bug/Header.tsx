import {
  Anchor,
  PageHeader,
  Skeleton,
  XXXL,
} from '@appquality/unguess-design-system';
import { useNavigate } from 'react-router-dom';
import {
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
} from 'src/features/api';
import { getLocalizeoFirstLevelDashboardRoute } from 'src/hooks/useLocalizeDashboardUrl';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

interface Props {
  campaignId: string;
  title: GetCampaignsByCidBugsAndBidApiResponse['title'];
}

export const Header = ({ campaignId, title }: Props) => {
  const navigate = useNavigate();
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
      <PageHeader.Breadcrumb>
        {isCampaignLoading ||
        isCampaignFetching ||
        isCampaignError ||
        !campaign ? (
          <Skeleton height="50px" />
        ) : (
          <>
            <Anchor
              id="breadcrumb-parent"
              onClick={() =>
                navigate(useLocalizeRoute(`projects/${campaign.project.id}`))
              }
            >
              {campaign.project.name}
            </Anchor>
            <Anchor
              onClick={() => {
                window.location.href = getLocalizeoFirstLevelDashboardRoute(
                  parseInt(campaignId, 10)
                );
              }}
            >
              {campaign.customer_title}
            </Anchor>
          </>
        )}
      </PageHeader.Breadcrumb>
      <PageHeader.Main infoTitle={title.full}>
        <XXXL isBold>{title.full}</XXXL>
      </PageHeader.Main>
    </PageHeader>
  );
};
