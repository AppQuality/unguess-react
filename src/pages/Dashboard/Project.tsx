import { Grid } from '@appquality/unguess-design-system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Project as IProject } from 'src/features/api';
import { useGetProjectWithWorkspaceQuery } from 'src/features/api/customEndpoints/getProjectWithWorkspace';
import {
  projectFilterChanged,
  resetFilters,
} from 'src/features/campaignsFilter/campaignsFilterSlice';
import { Page } from 'src/features/templates/Page';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  setPermissionSettingsTitle,
  setProjectId,
  setWorkspace,
} from '../../features/navigation/navigationSlice';
import { CardRowLoading } from './CardRowLoading';
import { EmptyProjectOrArchive } from './empty-state';
import { useProjectPlans } from './hooks/useProjectPlans';
import { LaunchCampaignCards } from './LaunchCampaignCards';
import { ProjectItems } from './project-items';
import { Plans } from './project-items/Plans';
import { ProjectPageHeader } from './projectPageHeader';
import { PromoContextProvider } from './PromoContext';

const Items = ({
  project,
  isLoading,
}: {
  project?: IProject;
  isLoading?: boolean;
}) => {
  const { items, isLoading: planLoading } = useProjectPlans({
    projectId: project?.id,
  });

  if (!project || isLoading || planLoading) {
    return (
      <LayoutWrapper>
        <Grid style={{ padding: 0 }}>
          <CardRowLoading />
        </Grid>
      </LayoutWrapper>
    );
  }

  if (project.campaigns_count > 0 || items.length > 0) {
    return (
      <LayoutWrapper style={{ paddingBottom: appTheme.space.xxl }}>
        <Grid style={{ padding: 0, marginBottom: appTheme.space.xxl }}>
          <Plans projectId={project.id} />
          <ProjectItems projectId={Number(project.id) || 0} />
        </Grid>
        <LaunchCampaignCards />
      </LayoutWrapper>
    );
  }

  return <EmptyProjectOrArchive isArchive={!!project?.is_archive} />;
};

const Project = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const { projectId } = useParams();
  const location = useLocation();

  if (!projectId || Number.isNaN(Number(projectId))) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const { items: plans } = useProjectPlans({
    projectId: Number(projectId) || 0,
  });

  const {
    data: { project, workspace } = {},
    isSuccess,
    isLoading,
    isFetching,
    isError,
  } = useGetProjectWithWorkspaceQuery(
    {
      pid: projectId ?? '0',
    },
    {
      skip: !projectId,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetFilters());
      dispatch(projectFilterChanged(Number(projectId)));
    }

    if (project) {
      dispatch(setPermissionSettingsTitle(project.name));
      dispatch(setProjectId(project.id));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setProjectId(undefined));
    };
  }, [project, dispatch, projectId]);

  useEffect(() => {
    if (workspace) {
      dispatch(setWorkspace(workspace));
    }
  }, [workspace, dispatch]);

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const isEmpty =
    plans.length === 0 && (!project || project?.campaigns_count === 0);

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT')}
      route="projects"
      pageHeader={<ProjectPageHeader projectId={Number(projectId) || 0} />}
      excludeMarginBottom={isEmpty}
      excludeMarginTop={isEmpty}
    >
      <PromoContextProvider>
        <Items project={project} isLoading={isLoading || isFetching} />
      </PromoContextProvider>
    </Page>
  );
};

export default Project;
