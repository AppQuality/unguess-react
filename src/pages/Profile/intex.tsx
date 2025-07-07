import { Header } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { Page } from 'src/features/templates/Page';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <Page
      title={t('__PROFILE_PAGE_TITLE')}
      className="profile-page"
      pageHeader={<Header />}
      route="profile"
      excludeMarginTop
      excludeMarginBottom
    >
      <LayoutWrapper isNotBoxed>ciao</LayoutWrapper>
    </Page>
  );
};

export default Profile;
