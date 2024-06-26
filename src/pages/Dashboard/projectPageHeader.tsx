import {
  Button,
  InputToggle,
  PageHeader,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { FEATURE_FLAG_SKY_JOTFORM } from 'src/constants';
import {
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
} from 'src/features/api';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ProjectSettings } from 'src/common/components/inviteUsers/projectSettings';
import styled from 'styled-components';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
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
  const notFoundRoute = useLocalizeRoute('oops');
  const location = useLocation();
  const { hasFeatureFlag } = useFeatureFlag();
  const { status } = useAppSelector((state) => state.user);
  const [itemTitle, setItemTitle] = useState<string>();

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
    }
  }, [project]);

  if (isError) {
    navigate(notFoundRoute, {
      state: { from: location.pathname },
    });
  }

  const [patchProject] = usePatchProjectsByPidMutation();

  const JOTFORM_URL = `https://form.jotform.com/220462541726351`;

  const hasSkyJotformFeature = hasFeatureFlag(FEATURE_FLAG_SKY_JOTFORM);

  // Memoize InputToggle component to avoid re-rendering
  const InputToggleMemo = useMemo(
    () => (
      <InputToggle>
        <InputToggle.Item
          textSize="xxxl"
          maxLength={64}
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          onBlur={async (e) => {
            try {
              if (
                e.currentTarget.value &&
                e.currentTarget.value !== project?.name
              ) {
                await patchProject({
                  pid: projectId.toString(),
                  body: { display_name: e.currentTarget.value },
                }).unwrap();
              }
            } catch {
              // eslint-disable-next-line
              alert(t('__PROJECT_PAGE_UPDATE_PROJECT_NAME_ERROR'));
            }
          }}
          style={{ paddingLeft: 0 }}
        />
      </InputToggle>
    ),
    [project, itemTitle]
  );

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={itemTitle || ''}>
          <PageHeader.Title style={{ minHeight: '62px' }}>
            {isLoading || isFetching || status === 'loading' ? (
              <Skeleton width="60%" height="44px" />
            ) : (
              InputToggleMemo
            )}
          </PageHeader.Title>
          <StyledPageHeaderMeta>
            <Counters />
            <ProjectSettings />
          </StyledPageHeaderMeta>
        </PageHeader.Main>
        {hasSkyJotformFeature && (
          <PageHeader.Footer>
            <Button
              isPrimary
              onClick={() => {
                // eslint-disable-next-line security/detect-non-literal-fs-filename
                window.open(JOTFORM_URL, '_blank')?.focus(); // disable because it's a false positive (https://github.com/nodesecurity/eslint-plugin-security/issues/26)
              }}
            >
              {t('__DASHBOARD_SKY_JOTFORM_LAUNCH_CP_BUTTON')}
            </Button>
          </PageHeader.Footer>
        )}
      </PageHeader>
    </LayoutWrapper>
  );
};
