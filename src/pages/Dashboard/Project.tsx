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
import { useGetProjectWithWorkspaceQuery } from 'src/features/api/api';
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

  const { data, isSuccess, isError } = useGetProjectWithWorkspaceQuery({
    pid: projectId ?? '0',
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetFilters());
      dispatch(projectFilterChanged(Number(projectId)));
    }

    if (data?.project) {
      dispatch(setPermissionSettingsTitle(data.project.name));
      dispatch(setProjectId(data.project.id));
    }

    if (data?.workspace) {
      dispatch(setWorkspace(data.workspace));
    }

    return () => {
      dispatch(setPermissionSettingsTitle(undefined));
      dispatch(setProjectId(undefined));
      dispatch(setWorkspace(undefined));
    };
  }, [data, dispatch, projectId]);

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
