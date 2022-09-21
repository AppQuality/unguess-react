import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import {
  Grid,
  Skeleton,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import {
  projectFilterChanged,
  resetFilters,
} from 'src/features/campaignsFilter/campaignsFilterSlice';
import { useEffect, useState } from 'react';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { CardRowLoading } from './CardRowLoading';
import { ProjectItems } from './project-items';
import { ProjectPageHeader } from './projectPageHeader';

const Project = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notFoundRoute = useLocalizeRoute('oops');
  const { projectId } = useParams();

  if (!projectId || Number.isNaN(Number(projectId))) {
    navigate(notFoundRoute, { replace: true });
  } else {
    dispatch(resetFilters());
    dispatch(projectFilterChanged(Number(projectId)));
  }

  return (
    <Page
      title={t('__PAGE_TITLE_PRIMARY_DASHBOARD_SINGLE_PROJECT')}
      route="projects"
      pageHeader={<ProjectPageHeader projectId={Number(projectId) || 0} />}
    >
      <Grid>
        <ProjectItems />
      </Grid>
    </Page>
  );
};

export default Project;
