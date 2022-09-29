import {
  Anchor,
  PageHeader,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';

export const CampaignPageHeader = ({
  pageTitle,
  projectId,
}: {
  pageTitle?: string;
  projectId: number;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.user);

  const {
    isLoading,
    isFetching,
    data: project,
    isError,
  } = useGetProjectsByPidQuery({
    pid: projectId,
  });

  const projectRoute = useLocalizeRoute(`project/${projectId}`);

  if (isLoading || isFetching) {
    return (
      <PageHeader>
        <PageHeader.Main infoTitle="My Campaign">
          <Skeleton width="80%" height="34px" />
          <Skeleton width="60%" height="18px" />
        </PageHeader.Main>
      </PageHeader>
    );
  }

  return status === 'idle' || status === 'loading' || isError ? null : (
    <PageHeader>
      <PageHeader.Breadcrumb>
        <Anchor onClick={() => navigate(projectRoute)}>
          {project?.name || 'Project'}
        </Anchor>
        <Span>{pageTitle}</Span>
      </PageHeader.Breadcrumb>
      <PageHeader.Main infoTitle={pageTitle || 'My Campaign'}>
        <PageHeader.Title>{pageTitle || 'My Campaign'}</PageHeader.Title>
      </PageHeader.Main>
    </PageHeader>
  );
};
