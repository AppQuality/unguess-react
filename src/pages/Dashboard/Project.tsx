import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Grid } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  projectFilterChanged,
  resetFilters,
} from 'src/features/campaignsFilter/campaignsFilterSlice';
import { useGetProjectWithWorkspaceQuery } from 'src/features/api/customEndpoints/getProjectWithWorkspace';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { appTheme } from 'src/app/theme';
import { Project as IProject } from 'src/features/api';
import { ProjectItems } from './project-items';
import { ProjectPageHeader } from './projectPageHeader';
import { CardRowLoading } from './CardRowLoading';
import {
  setPermissionSettingsTitle,
  setProjectId,
  setWorkspace,
} from '../../features/navigation/navigationSlice';
import { EmptyProjectOrArchive } from './empty-state';
import { LaunchCampaignCards } from './LaunchCampaignCards';

const Items = ({
  project,
  isLoading,
}: {
  project?: IProject;
  isLoading?: boolean;
}) => {
  if (!project || isLoading) {
    return (
      <LayoutWrapper>
        <Grid style={{ padding: 0 }}>
          <CardRowLoading />
        </Grid>
      </LayoutWrapper>
    );
  }

  if (project.campaigns_count > 0) {
    return (
      <LayoutWrapper style={{ paddingBottom: appTheme.space.xxl }}>
        <Grid style={{ padding: 0, marginBottom: appTheme.space.xxl }}>
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

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT')}
      route="projects"
      pageHeader={<ProjectPageHeader projectId={Number(projectId) || 0} />}
      excludeMarginBottom={!!project && project?.campaigns_count === 0}
      excludeMarginTop={!!project && project?.campaigns_count === 0}
    >
      <Items project={project} isLoading={isLoading || isFetching} />
    </Page>
  );
};

export default Project;
