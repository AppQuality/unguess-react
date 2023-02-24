import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import { Grid } from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useGetProjectsByPidQuery } from 'src/features/api';
import {
  projectFilterChanged,
  resetFilters,
} from 'src/features/campaignsFilter/campaignsFilterSlice';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ProjectItems } from './project-items';
import { ProjectPageHeader } from './projectPageHeader';
import { CardRowLoading } from './CardRowLoading';

const Project = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const { projectId } = useParams();

  if (!projectId || Number.isNaN(Number(projectId))) {
    navigate(notFoundRoute);
  }

  const project = useGetProjectsByPidQuery({
    pid: Number(projectId),
  });

  useEffect(() => {
    if (project.isSuccess) {
      dispatch(resetFilters());
      dispatch(projectFilterChanged(Number(projectId)));
    }
  }, [project]);

  if (project.isError) {
    navigate(notFoundRoute);
  }

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT')}
      route="projects"
      pageHeader={<ProjectPageHeader projectId={Number(projectId) || 0} />}
    >
      <LayoutWrapper>
        <Grid>{project.isSuccess ? <ProjectItems /> : <CardRowLoading />}</Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default Project;
