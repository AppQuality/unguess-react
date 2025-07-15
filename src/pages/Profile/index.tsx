import { Col, Grid, Row, theme } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  AsideNav,
  StickyNavItem,
  StickyNavItemLabel,
} from 'src/common/components/navigation/asideNav';
import { Page } from 'src/features/templates/Page';
import ProfilePageHeader from 'src/pages/Profile/Header';
import { FormPassword } from './FormPassword';
import { FormProfile } from './FormProfile';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <Page
      title={t('__PROFILE_PAGE_TITLE')}
      className="profile-page"
      pageHeader={<ProfilePageHeader pageTitle={t('__PROFILE_PAGE_TITLE')} />}
      route="profile"
    >
      <LayoutWrapper>
        <Grid gutters="xl" columns={12} style={{ marginTop: theme.space.xxl }}>
          <Row>
            <Col xs={12} lg={2} style={{ margin: 0 }}>
              <AsideNav containerId="main">
                <>
                  <StickyNavItem
                    id="anchor-profile"
                    to="anchor-profile-id"
                    containerId="main"
                    smooth
                    duration={500}
                    offset={-30}
                  >
                    {t('__PROFILE_PAGE_NAV_ITEM_PROFILE')}
                  </StickyNavItem>

                  <StickyNavItemLabel>
                    {t('__PROFILE_PAGE_NAV_SECTION_PASSWORD')}
                  </StickyNavItemLabel>

                  <StickyNavItem
                    id="anchor-password"
                    to="anchor-password-id"
                    containerId="main"
                    smooth
                    duration={500}
                  >
                    {t('__PROFILE_PAGE_NAV_ITEM_PASSWORD')}
                  </StickyNavItem>
                </>
              </AsideNav>
            </Col>
            <Col xs={12} lg={10}>
              <Grid gutters="xl" columns={12} id="main">
                <Row>
                  <Col
                    xs={12}
                    lg={9}
                    style={{
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: theme.space.xxl,
                    }}
                  >
                    <FormProfile />
                    <FormPassword />
                  </Col>
                </Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
      </LayoutWrapper>
    </Page>
  );
};

export default Profile;
