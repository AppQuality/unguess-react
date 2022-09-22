import {
  Button,
  InputToggle,
  PageHeader,
  Skeleton,
} from '@appquality/unguess-design-system';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { useNavigate } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { FEATURE_FLAG_SKY_JOTFORM } from 'src/constants';
import {
  Feature,
  useGetProjectsByPidQuery,
  usePatchProjectsByPidMutation,
} from 'src/features/api';
import { Counters } from './Counters';

export const ProjectPageHeader = ({ projectId }: { projectId: number }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notFoundRoute = useLocalizeRoute('oops');

  const { status, userData } = useAppSelector((state) => state.user);
  const [itemTitle, setItemTitle] = useState<string>();

  const {
    isLoading,
    isFetching,
    isError,
    isSuccess,
    data: project,
  } = useGetProjectsByPidQuery({
    pid: projectId,
  });

  useEffect(() => {
    if (isSuccess && project) {
      setItemTitle(project.name);
    }
  }, [project]);

  if (isError) navigate(notFoundRoute, { replace: true });

  const [patchProject] = usePatchProjectsByPidMutation();

  const JOTFORM_URL = `https://form.jotform.com/220462541726351`;

  const hasButton =
    userData.features &&
    userData.features.find(
      (feature: Feature) => feature.slug === FEATURE_FLAG_SKY_JOTFORM
    );

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
              await patchProject({
                pid: projectId,
                body: { display_name: e.currentTarget.value },
              }).unwrap();
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
    <PageHeader>
      <PageHeader.Main infoTitle={itemTitle || ''}>
        <PageHeader.Title style={{ minHeight: '66px' }}>
          {isLoading || isFetching || status === 'loading' ? (
            <Skeleton width="60%" height="44px" />
          ) : (
            InputToggleMemo
          )}
        </PageHeader.Title>
        <PageHeader.Counters>
          <Counters />
        </PageHeader.Counters>
      </PageHeader.Main>
      {hasButton && (
        <PageHeader.Buttons>
          <Button
            isPrimary
            isPill
            onClick={() => {
              // eslint-disable-next-line security/detect-non-literal-fs-filename
              window.open(JOTFORM_URL, '_blank')?.focus(); // disable because it's a false positive (https://github.com/nodesecurity/eslint-plugin-security/issues/26)
            }}
          >
            {t('__DASHBOARD_SKY_JOTFORM_LAUNCH_CP_BUTTON')}
          </Button>
        </PageHeader.Buttons>
      )}
    </PageHeader>
  );
};
