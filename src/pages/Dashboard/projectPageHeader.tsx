import {
  Button,
  IconButton,
  LG,
  PageHeader,
  Skeleton,
  XXXL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ProjectSettings } from 'src/common/components/inviteUsers/projectSettings';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { useGetProjectsByPidQuery } from 'src/features/api';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { Counters } from './Counters';
import { EditableDescription } from './EditableDescription';
import { EditableTitle } from './EditableTitle';
import { DeleteProjectModal } from './Modals/DeleteProjectModal';
import { useProjectPlans } from './hooks/useProjectPlans';

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

const StyledDiv = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

export const ProjectPageHeader = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { status } = useAppSelector((state) => state.user);
  const templatesRoute = useLocalizeRoute('templates');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { items: plans, isLoading: isLoadingPlans } = useProjectPlans({
    projectId: projectId || 0,
  });

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
  const hasWorksPacePermission = useCanAccessToActiveWorkspace();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={project?.name || ''}>
          <PageHeader.Title style={{ minHeight: '62px' }}>
            {isLoading ||
            isLoadingPlans ||
            isFetching ||
            status === 'loading' ? (
              <Skeleton width="60%" height="44px" />
            ) : (
              titleContent
            )}
          </PageHeader.Title>
          <PageHeader.Description style={{ width: '100%' }}>
            {isLoading ||
            isLoadingPlans ||
            isFetching ||
            status === 'loading' ? (
              <Skeleton width="60%" height="44px" />
            ) : (
              descriptionContent
            )}
          </PageHeader.Description>
          {!project?.is_archive && (
            <StyledPageHeaderMeta>
              <Counters />
              <StyledDiv>
                {hasWorksPacePermission && <ProjectSettings />}
                {hasWorksPacePermission && (
                  <Button
                    isAccent
                    isPrimary
                    onClick={() => {
                      navigate(templatesRoute, { state: { projectId } });
                    }}
                  >
                    {t('__DASHBOARD_CTA_NEW_ACTIVITY')}
                  </Button>
                )}
                {project?.campaigns_count === 0 && plans.length === 0 && (
                  <IconButton onClick={() => setDeleteModalOpen(true)}>
                    <DeleteIcon color={appTheme.palette.blue[600]} />
                  </IconButton>
                )}
              </StyledDiv>
            </StyledPageHeaderMeta>
          )}
          {deleteModalOpen && (
            <DeleteProjectModal
              projectId={projectId}
              onQuit={() => setDeleteModalOpen(false)}
            />
          )}
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
