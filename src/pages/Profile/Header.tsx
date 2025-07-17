import { PageHeader } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { PageTitle } from 'src/common/components/PageTitle';

const ProfilePageHeader = ({ pageTitle }: { pageTitle?: string }) => {
  const { t } = useTranslation();

  return (
    <LayoutWrapper>
      <PageHeader>
        <PageHeader.Main mainTitle={pageTitle || 'Profile'}>
          <PageHeader.Title>
            <PageTitle>{pageTitle || 'Profile'}</PageTitle>
          </PageHeader.Title>
          <PageHeader.Description style={{ whiteSpace: 'pre-wrap' }}>
            {t('_PAGE_PROFILE_HEADER_TEXT')}
          </PageHeader.Description>
        </PageHeader.Main>
      </PageHeader>
    </LayoutWrapper>
  );
};

export default ProfilePageHeader;
