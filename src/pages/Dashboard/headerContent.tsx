import { Button, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
import { FEATURE_FLAG_SKY_JOTFORM } from 'src/constants';
import { Feature } from 'src/features/api';
import { Counters } from './Counters';

export const DashboardHeaderContent = ({
  pageTitle,
}: {
  pageTitle?: string;
}) => {
  const { t } = useTranslation();
  const { status, userData } = useAppSelector((state) => state.user);

  const JOTFORM_URL = `https://form.jotform.com/220462541726351`;

  const hasButton =
    userData.features &&
    userData.features.find(
      (feature: Feature) => feature.slug === FEATURE_FLAG_SKY_JOTFORM
    );

  return status === 'idle' || status === 'loading' ? null : (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={pageTitle || 'My Dashboard'}>
          <PageHeader.Title>
            <PageTitle>{pageTitle || 'My Dashboard'}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Meta>
            <Counters />
          </PageHeader.Meta>
        </PageHeader.Main>
        {hasButton && (
          <PageHeader.Footer>
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
          </PageHeader.Footer>
        )}
      </PageHeader>
    </LayoutWrapper>
  );
};
