import {
  Anchor,
  Button,
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
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';

interface Props {
  campaignId: string;
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
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
export const Header = ({ campaignId, bug }: Props) => {
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });
  const { t } = useTranslation();

  if (isCampaignLoading || isCampaignFetching || isCampaignError || !campaign) {
    return (
      <LayoutWrapper isBoxed>
        <PageHeader>
          <Skeleton height="50px" />
          <PageHeader.Main infoTitle={bug.title.full}>
            <XXXL isBold>{bug.title.compact}</XXXL>
          </PageHeader.Main>
        </PageHeader>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper isBoxed>
      <PageHeader>
        <BreadCrumb campaign={campaign} />
        <PageHeader.Main infoTitle={bug.title.full}>
          <XXXL isBold>{bug.title.compact}</XXXL>
        </PageHeader.Main>
        <PageHeader.Buttons>
          <ShareButton bug={bug}>
            {(setModalOpen) => (
              <Button isPill hasStartIcon onClick={() => setModalOpen(true)}>
                <Button.StartIcon>
                  <ShareIcon />
                </Button.StartIcon>
                {t('__BUG_PAGE_HEADER_SHARE_LINK_CTA', 'Share public link')}
              </Button>
            )}
          </ShareButton>
        </PageHeader.Buttons>
      </PageHeader>
    </LayoutWrapper>
  );
};
