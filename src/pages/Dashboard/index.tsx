import { Grid } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { resetFilters } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { Page } from 'src/features/templates/Page';
import { useCampaignTemplates } from 'src/hooks/useCampaignTemplates';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { CampaignsList } from './campaigns-list';
import { DashboardHeaderContent } from './headerContent';
import { CreateProjectModal } from './Modals/CreateProjectModal';
import { SuggestedCampaigns } from './SuggestedCampaigns';

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data } = useCampaignTemplates();

  const { status } = useAppSelector((state) => state.user);
  const sendGTMEvent = useSendGTMevent();

  if (status === 'logged') dispatch(resetFilters()); // Reset filters

  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
      pageHeader={
        <DashboardHeaderContent
          handleOpenModal={() => {
            setOpenCreateProjectModal(true);

            sendGTMEvent({
              event: 'workspaces-action',
              category: 'projects_dashboard',
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
          {JSON.stringify(data)}
          <CampaignsList />
          {openCreateProjectModal ? (
            <CreateProjectModal setOpen={setOpenCreateProjectModal} />
          ) : null}
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default Dashboard;
