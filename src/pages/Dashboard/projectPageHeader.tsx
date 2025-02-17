import {
  LG,
  PageHeader,
  Skeleton,
  XXXL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ProjectSettings } from 'src/common/components/inviteUsers/projectSettings';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { Counters } from './Counters';
import { EditableTitle } from './EditableTitle';
import { EditableDescription } from './EditableDescription';

const StyledPageHeaderMeta = styled(PageHeader.Meta)`
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    button {
      margin-top: ${({ theme }) => theme.space.md};
    }
  }
`;

export const ProjectPageHeader = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { status } = useAppSelector((state) => state.user);

  const {
    isLoading,
    isFetching,
    isError,
    data: project,
  } = useGetProjectsByPidQuery({
    pid: projectId.toString(),
  });

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const titleContent = project?.is_archive ? (
    <XXXL isBold>{project.name}</XXXL>
  ) : (
    <EditableTitle projectId={projectId} />
  );

  const descriptionContent = project?.is_archive ? (
    <LG color={appTheme.palette.grey[700]}>
      {t('__PROJECT_PAGE_ARCHIVE_DESCRIPTION')}
    </LG>
  ) : (
    <EditableDescription projectId={projectId} />
  );

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={project?.name || ''}>
          <PageHeader.Title style={{ minHeight: '62px' }}>
            {isLoading || isFetching || status === 'loading' ? (
              <Skeleton width="60%" height="44px" />
            ) : (
              titleContent
            )}
          </PageHeader.Title>
          <PageHeader.Description style={{ width: '100%' }}>
            {isLoading || isFetching || status === 'loading' ? (
              <Skeleton width="60%" height="44px" />
            ) : (
              descriptionContent
            )}
          </PageHeader.Description>
          {!project?.is_archive && (
            <StyledPageHeaderMeta>
              <Counters />
              <ProjectSettings />
            </StyledPageHeaderMeta>
          )}
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
