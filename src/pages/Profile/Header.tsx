import { MD, PageHeader, theme } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';

const ProfilePageHeader = ({ pageTitle }: { pageTitle?: string }) => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={pageTitle || 'My Dashboard'}>
          <PageHeader.Title>
            <PageTitle>{pageTitle || 'My Dashboard'}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Meta style={{ justifyContent: 'space-between' }} />
          <MD
            style={{
              gap: '8px',
              display: 'flex',
              color: theme.palette.grey[600],
            }}
          >
            Manage your data and update your information
          </MD>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default ProfilePageHeader;
