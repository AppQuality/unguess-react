import { Grid } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetUsersMeQuery } from 'src/features/api';
import { resetFilters } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { Page } from 'src/features/templates/Page';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { CampaignsList } from './campaigns-list';
import { DashboardHeaderContent } from './headerContent';
import { LaunchCampaignCards } from './LaunchCampaignCards';
import { CreateProjectModal } from './Modals/CreateProjectModal';
import { PromoContextProvider } from './PromoContext';
import { SuggestedCampaigns } from './SuggestedCampaigns';

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data: userData, isLoading, isFetching } = useGetUsersMeQuery();

  const sendGTMEvent = useSendGTMevent();

  if (!isFetching && !isLoading && userData) dispatch(resetFilters()); // Reset filters

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  return (
    <PromoContextProvider>
      <Page
        title={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
        pageHeader={
          <DashboardHeaderContent
            handleOpenModal={() => {
              setOpenCreateProjectModal(true);

              sendGTMEvent({
                event: 'workspaces-action',
                action: 'create_project_click',
                content: `${new Date().toISOString()}`,
              });
            }}
            pageTitle={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
          />
        }
        route=""
      >
        <LayoutWrapper>
          <Grid>
            <SuggestedCampaigns />
            <LaunchCampaignCards />
            <CampaignsList />
            {openCreateProjectModal ? (
              <CreateProjectModal setOpen={setOpenCreateProjectModal} />
            ) : null}
          </Grid>
        </LayoutWrapper>
      </Page>
    </PromoContextProvider>
  );
};

export default Dashboard;
