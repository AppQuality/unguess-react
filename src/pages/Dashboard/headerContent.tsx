import { Button, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
import { FEATURE_FLAG_SKY_JOTFORM } from 'src/constants';
import { useFeatureFlag } from 'src/hooks/useFeatureFlag';
import { Counters } from './Counters';

export const DashboardHeaderContent = ({
  pageTitle,
  handleOpenModal,
}: {
  pageTitle?: string;
  handleOpenModal: () => void;
}) => {
  const { t } = useTranslation();
  const { status } = useAppSelector((state) => state.user);
  const { hasFeatureFlag } = useFeatureFlag();

  const hasSkyJotformFeature = hasFeatureFlag(FEATURE_FLAG_SKY_JOTFORM);

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
        {hasSkyJotformFeature && (
          <PageHeader.Footer>
            <Button isPrimary onClick={handleOpenModal}>
              {t('__DASHBOARD_CREATE_NEW_PROJECT')}
            </Button>
          </PageHeader.Footer>
        )}
      </PageHeader>
    </LayoutWrapper>
  );
};
