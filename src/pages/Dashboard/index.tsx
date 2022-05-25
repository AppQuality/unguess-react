// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Grid, theme, XXL, XXXL } from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { projectFilterChanged } from 'src/features/campaignsFilter/campaignsFilterSlice';
import { isMinMedia } from 'src/common/utils';
import { SuggestedCampaigns } from './SuggestedCampaigns';
import { CampaignsList } from './campaigns-list';
import { DashboardHeaderContent } from './headerContent';

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.user);

  if (status === 'logged') dispatch(projectFilterChanged(0)); // Reset filters

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
      pageHeader={
        <DashboardHeaderContent>
          {isMinMedia(theme.breakpoints.sm) ? (
            <XXXL style={{ color: theme.palette.blue[600] }}>
              {t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
            </XXXL>
          ) : (
            <XXL style={{ color: theme.palette.blue[600] }}>
              {t('__PAGE_TITLE_PRIMARY_DASHBOARD')}
            </XXL>
          )}
        </DashboardHeaderContent>
      }
      route=""
    >
      <Grid>
        <SuggestedCampaigns />
        <CampaignsList />
      </Grid>
    </Page>
  );
};

export default Dashboard;
