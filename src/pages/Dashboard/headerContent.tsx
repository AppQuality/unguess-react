import { Button, PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';
import { useCanAccessToActiveWorkspace } from 'src/hooks/useCanAccessToActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
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
  const navigate = useNavigate();
  const templatesRoute = useLocalizeRoute('templates');

  return status === 'idle' || status === 'loading' ? null : (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={pageTitle || 'My Dashboard'}>
          <PageHeader.Title>
            <PageTitle>{pageTitle || 'My Dashboard'}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Meta style={{ justifyContent: 'space-between' }}>
            <Counters />
            {hasWorksPacePermission && (
              <div>
                <Button isBasic onClick={handleOpenModal}>
                  {t('__DASHBOARD_CREATE_NEW_PROJECT')}
                </Button>
                <Button
                  isAccent
                  isPrimary
                  onClick={() => {
                    navigate(templatesRoute);
                  }}
                >
                  {t('__DASHBOARD_CTA_NEW_ACTIVITY')}
                </Button>
              </div>
            )}
          </PageHeader.Meta>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};
