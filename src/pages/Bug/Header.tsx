import { useAppDispatch } from 'src/app/hooks';
import { useEffect } from 'react';
import {
  Anchor,
  Button,
  PageHeader,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GetCampaignsByCidApiResponse,
  GetCampaignsByCidBugsAndBidApiResponse,
  useGetCampaignsByCidQuery,
  useGetProjectsByPidQuery,
} from 'src/features/api';
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { styled } from 'styled-components';
import {
  setCampaignId,
  setPermissionSettingsTitle,
} from '../../features/navigation/navigationSlice';

interface Props {
  campaignId: string;
  bug: Exclude<GetCampaignsByCidBugsAndBidApiResponse, undefined>;
}

const ActionContainer = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  justify-content: space-between;
`;

const BreadCrumbs = ({
  campaign,
  children,
}: {
  campaign: GetCampaignsByCidApiResponse;
  children?: React.ReactNode;
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
    <ActionContainer>
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
      {children}
    </ActionContainer>
  );
};

const StyledContainer = styled(LayoutWrapper)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export const Header = ({ campaignId, bug }: Props) => {
  const dispatch = useAppDispatch();
  const {
    isLoading: isCampaignLoading,
    isFetching: isCampaignFetching,
    isError: isCampaignError,
    data: campaign,
  } = useGetCampaignsByCidQuery({
    cid: campaignId,
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (campaign) {
      dispatch(setPermissionSettingsTitle(campaign.customer_title));
      dispatch(setCampaignId(campaign.id));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setCampaignId(undefined));
    };
  }, [campaign]);

  if (isCampaignLoading || isCampaignFetching || isCampaignError || !campaign) {
    return (
      <LayoutWrapper>
        <PageHeader>
          <Skeleton height="50px" />
        </PageHeader>
      </LayoutWrapper>
    );
  }

  return (
    <StyledContainer isNotBoxed>
      <PageHeader style={{ border: 'none' }}>
        <BreadCrumbs campaign={campaign}>
          <ShareButton bug={bug}>
            {(setModalOpen) => (
              <Button onClick={() => setModalOpen(true)}>
                <Button.StartIcon>
                  <ShareIcon />
                </Button.StartIcon>
                {t('__BUG_PAGE_HEADER_SHARE_LINK_CTA', 'Share public link')}
              </Button>
            )}
          </ShareButton>
        </BreadCrumbs>
      </PageHeader>
    </StyledContainer>
  );
};
