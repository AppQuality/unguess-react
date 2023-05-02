// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import {
  Grid,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { projectFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useEffect } from 'react';
import { SuggestedCampaigns } from './SuggestedCampaigns';
import { CampaignsList } from './campaigns-list';
import { DashboardHeaderContent } from './headerContent';

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.user);

  if (status === 'logged') dispatch(projectFilterChanged(0)); // Reset filters

  const { addToast } = useToast();

  // TODO: remove this, it's just a test
  useEffect(() => {
    if (status === 'logged') {
      addToast(
        ({ close }) => (
          <Notification
            onClose={() => {
              console.log('closed');
              close();
            }}
            message="Welcome back!"
            type="success"
            closeText="Dismiss"
            isPrimary
          />
        ),
        {
          placement: 'top',
        }
      );
    }
  }, [status]);

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
      pageHeader={
        <DashboardHeaderContent
          pageTitle={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
        />
      }
      route=""
    >
      <LayoutWrapper>
        <Grid>
          <SuggestedCampaigns />
          <CampaignsList />
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default Dashboard;
