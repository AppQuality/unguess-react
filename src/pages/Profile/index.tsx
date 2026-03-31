import { Col, Grid, Row, theme } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  AsideNav,
  StickyNavItem,
} from 'src/common/components/navigation/asideNav';
import { Page } from 'src/features/templates/Page';
import ProfilePageHeader from 'src/pages/Profile/Header';
import { FormProfile } from './FormProfile';
import { FormNotificationSettings } from './FormNotificationSettings';
import { SecuritySettingsCard } from './parts/SecuritySettingsCard';

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
              <AsideNav
                containerId="main"
                isSpy
                isSmooth
                duration={500}
                offset={-30}
              >
                <>
                  <StickyNavItem
                    to="anchor-profile-id"
                    containerId="main"
                    spy
                    smooth
                    duration={500}
                    offset={-30}
                    activeClass="isCurrent"
                  >
                    {t('__PROFILE_PAGE_NAV_ITEM_PROFILE')}
                  </StickyNavItem>
                  <StickyNavItem
                    to="anchor-notification-settings-id"
                    containerId="main"
                    spy
                    smooth
                    duration={500}
                    offset={-30}
                    activeClass="isCurrent"
                  >
                    {t('__PROFILE_PAGE_NAV_ITEM_NOTIFICATION_SETTINGS')}
                  </StickyNavItem>

                  <StickyNavItem
                    to="anchor-security-settings-id"
                    containerId="main"
                    spy
                    smooth
                    duration={500}
                    offset={-30}
                    activeClass="isCurrent"
                  >
                    {t('__PROFILE_PAGE_NAV_ITEM_SECURITY')}
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
                    <FormNotificationSettings />
                    <SecuritySettingsCard />
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
