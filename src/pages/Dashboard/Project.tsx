// import { LoginForm } from "@appquality/unguess-design-system";
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Grid } from '@appquality/unguess-design-system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  projectFilterChanged,
  resetFilters,
} from 'src/features/campaignsFilter/campaignsFilterSlice';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { hasEnoughCoins } from 'src/common/utils';
import { ActionCards } from './ActionCards';
import { DashboardHeaderContent } from './headerContent';
import { CardRowLoading } from './CardRowLoading';
import { ProjectItems } from './project-items';

const Project = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const hasExpress = hasEnoughCoins({ workspace: activeWorkspace });

  const { projectId } = useParams();

  if (!projectId || Number.isNaN(Number(projectId))) {
    navigate(notFoundRoute, { replace: true });
  }

  const project = useGetProjectsByPidQuery({
    pid: projectId ? parseInt(projectId, 10) : 0,
  });

  if (project.isError) navigate(notFoundRoute, { replace: true });

  if (project.isSuccess && project.data) {
    dispatch(resetFilters());
    dispatch(projectFilterChanged(project.data.id));
  }

  const isLoading = project.isFetching || project.isLoading;

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT')}
      route="projects"
      pageHeader={
        <DashboardHeaderContent pageTitle={project?.data?.name || 'Project'} />
      }
    >
      <Grid>
        {isLoading ? (
          <CardRowLoading />
        ) : (
          <>
            {hasExpress && <ActionCards />}
            <ProjectItems />
          </>
        )}
      </Grid>
    </Page>
  );
};

export default Project;
