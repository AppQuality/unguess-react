import { Button, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
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
  const hasWorksPacePermission = useCanAccessToActiveWorkspace();

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
        {hasWorksPacePermission && (
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
