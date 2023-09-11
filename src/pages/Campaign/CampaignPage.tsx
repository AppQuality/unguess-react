import { Col, Grid, Row } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';

import { Page } from 'src/features/templates/Page';
import { useCampaignAnalytics } from 'src/hooks/useCampaignAnalytics';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  setCampaignId,
  setPermissionSettingsTitle,
  setWorkspace,
} from '../../features/navigation/navigationSlice';
import CampaignPageHeader from './pageHeader';
import { HeaderLoader } from './pageHeaderLoading';

const CampaignPage = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  useCampaignAnalytics(campaignId);

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: { campaign, workspace } = {},
  } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId?.toString() ?? '0',
  });

  if (isErrorCampaign) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

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

  if (!campaign) return null;

  return (
    <Page
      title={(campaign && campaign.customer_title) ?? 'Campaign'}
      pageHeader={
        isLoadingCampaign || isFetchingCampaign ? (
          <HeaderLoader />
        ) : (
          <CampaignPageHeader campaignId={Number(campaign ? campaign.id : 0)} />
        )
      }
      route="campaigns"
    >
      <LayoutWrapper>
        <Grid>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default CampaignPage;
