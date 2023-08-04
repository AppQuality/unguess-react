import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetCampaignWithWorkspaceQuery } from 'src/features/api/customEndpoints/getCampaignWithWorkspace';
import { setWorkspace } from 'src/features/navigation/navigationSlice';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useEffect } from 'react';
import { CampaignWidgets } from '../CampaignWidgets';

const CampaignPreview = () => {
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const { campaignId } = useParams();
  const dispatch = useAppDispatch();

  if (!campaignId || Number.isNaN(Number(campaignId))) {
    navigate(notFoundRoute);
  }

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: { campaign, workspace } = {},
  } = useGetCampaignWithWorkspaceQuery({
    cid: campaignId?.toString() ?? '0',
  });

  if (isErrorCampaign) {
    navigate(notFoundRoute);
  }

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  if (!campaign || isLoadingCampaign || isFetchingCampaign) return null;

  return (
    <Page
      title={(campaign && campaign.customer_title) ?? 'Campaign'}
      route="campaigns"
      isMinimal
    >
      <LayoutWrapper>
        <CampaignWidgets />
      </LayoutWrapper>
    </Page>
  );
};

export default CampaignPreview;
