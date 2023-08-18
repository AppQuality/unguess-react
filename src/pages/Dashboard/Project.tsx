import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Grid } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  projectFilterChanged,
  resetFilters,
} from 'src/features/campaignsFilter/campaignsFilterSlice';
import { useGetProjectWithWorkspaceQuery } from 'src/features/api/customEndpoints/getProjectWithWorkspace';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ProjectItems } from './project-items';
import { ProjectPageHeader } from './projectPageHeader';
import { CardRowLoading } from './CardRowLoading';
import {
  setPermissionSettingsTitle,
  setProjectId,
  setWorkspace,
} from '../../features/navigation/navigationSlice';

const Project = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const { projectId } = useParams();

  if (!projectId || Number.isNaN(Number(projectId))) {
    navigate(notFoundRoute);
  }

  const {
    data: { project, workspace } = {},
    isSuccess,
    isError,
  } = useGetProjectWithWorkspaceQuery({
    pid: projectId ?? '0',
  });

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
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT')}
      route="projects"
      pageHeader={<ProjectPageHeader projectId={Number(projectId) || 0} />}
    >
      <LayoutWrapper>
        <Grid>
          {isSuccess ? (
            <ProjectItems projectId={Number(projectId) || 0} />
          ) : (
            <CardRowLoading />
          )}
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default Project;
