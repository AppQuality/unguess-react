import {
  InputToggle,
  LG,
  Message,
  Notification,
  PageHeader,
  Skeleton,
  useToast,
  XXXL,
} from '@appquality/unguess-design-system';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ProjectSettings } from 'src/common/components/inviteUsers/projectSettings';
import {
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
} from 'src/features/api';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { Counters } from './Counters';

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
  const { addToast } = useToast();
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { status } = useAppSelector((state) => state.user);
  const [itemTitle, setItemTitle] = useState<string>();
  const [itemDescription, setItemDescription] = useState<string>();

  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    data: project,
  } = useGetProjectsByPidQuery({
    pid: projectId.toString(),
  });

  useEffect(() => {
    if (isSuccess && project) {
      setItemTitle(project.name);
      setItemDescription(project.description);
    }
  }, [project]);

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const [patchProject] = usePatchProjectsByPidMutation();
  const sendGTMEvent = useSendGTMevent();

  const sendAnalyticEvents = (e: string) => {
    switch (e) {
      case 'ChangeDescription':
        sendGTMEvent({
          event: 'workspaces-action',
          category: '',
          action: 'change_description_success',
          content: itemDescription,
        });
        break;
      case 'ChangeTitle':
        sendGTMEvent({
          event: 'workspaces-action',
          category: '',
          action: 'change_name_success',
          content: itemTitle,
        });
        break;
      default:
    }
  };

  const InputToggleMemoDescription = useMemo(
    () => (
      <InputToggle>
        <InputToggle.Item
          textSize="lg"
          placeholder={t(
            '__PROJECT_PAGE_UPDATE_PROJECT_DESCRIPTION_PLACEHOLDER',
            'Write a description'
          )}
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          onBlur={async (e) => {
            try {
              if (
                e.currentTarget.value !== project?.description &&
                e.currentTarget.value.length <= 234
              ) {
                await patchProject({
                  pid: projectId.toString(),
                  body: { description: e.currentTarget.value ?? '' },
                }).unwrap();
                sendAnalyticEvents('ChangeDescription');
              }
            } catch {
              // eslint-disable-next-line
              alert(
                t('__PROJECT_PAGE_UPDATE_PROJECT_DESCRIPTION_ERROR', 'Error')
              );
            }
          }}
          style={{ paddingLeft: 0 }}
        />
        {itemDescription && itemDescription.length > 234 && (
          <Message validation="error" style={{ marginTop: '8px' }}>
            {t('__PROJECT_PAGE_UPDATE_PROJECT_DESCRIPTION_MAX_LENGTH')}
          </Message>
        )}
      </InputToggle>
    ),
    [project, itemDescription]
  );

  // Memoize InputToggle component to avoid re-rendering
  const InputToggleMemoTitle = useMemo(
    () => (
      <InputToggle>
        <InputToggle.Item
          placeholder=""
          textSize="xxxl"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          onBlur={async (e) => {
            try {
              if (
                e.currentTarget.value &&
                e.currentTarget.value !== project?.name &&
                e.currentTarget.value.length <= 64
              ) {
                await patchProject({
                  pid: projectId.toString(),
                  body: { display_name: e.currentTarget.value },
                }).unwrap();
                sendAnalyticEvents('ChangeTitle');
              }
            } catch {
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="error"
                    message={t('__PROJECT_PAGE_UPDATE_PROJECT_NAME_ERROR')}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
              setItemTitle(project?.name);
            }
          }}
          style={{ paddingLeft: 0 }}
        />
        {itemTitle?.length === 0 && (
          <Message validation="error" style={{ marginTop: '8px' }}>
            {t(
              '__PROJECT_PAGE_UPDATE_PROJECT_NAME_REQUIRED',
              'Mandatory field'
            )}
          </Message>
        )}
        {itemTitle && itemTitle.length > 64 && (
          <Message validation="error" style={{ marginTop: '8px' }}>
            {t('__PROJECT_PAGE_UPDATE_PROJECT_NAME_MAX_LENGTH')}
          </Message>
        )}
      </InputToggle>
    ),
    [project, itemTitle]
  );
  const titleContent = project?.is_archive ? (
    <XXXL isBold>{project.name}</XXXL>
  ) : (
    InputToggleMemoTitle
  );
  const descriptionContent = project?.is_archive ? (
    <LG color={appTheme.palette.grey[700]}>
      {t('__PROJECT_PAGE_ARCHIVE_DESCRIPTION')}
    </LG>
  ) : (
    InputToggleMemoDescription
  );
  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={itemTitle || ''}>
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
