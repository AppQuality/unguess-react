import ProfilePageHeader from 'src/pages/Profile/Header';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/features/templates/Page';
import {
  AccordionNew,
  Button,
  Card,
  Col,
  Grid,
  LG,
  Row,
  theme,
  Title,
} from '@appquality/unguess-design-system';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import {
  AsideNav,
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation/asideNav';
import { useProfileContext } from './ProfileContext';

const Profile = () => {
  const { t } = useTranslation();
  // const { openAccordions, setOpenAccordions } = useProfileContext();
  // const isOpen = openAccordions.includes('password');
  const isOpen = false; // Temporary, as the context is not fully implemented yet

  // const handleAccordionChange = () => {
  //   if (isOpen) {
  //     setOpenAccordions(openAccordions.filter((item) => item !== 'password'));
  //   } else {
  //     setOpenAccordions([...openAccordions, 'password']);
  //   }
  // };

  return (
    <Page
      title={t('__PROFILE_PAGE_TITLE')}
      className="profile-page"
      pageHeader={<ProfilePageHeader pageTitle="Profile settings" />}
      route="profile"
      excludeMarginTop
      excludeMarginBottom
    >
      <Grid gutters="xl" columns={12} style={{ marginTop: theme.space.xxl }}>
        <Row>
          <Col xs={12} lg={2} style={{ margin: 0 }}>
            <AsideNav containerId="main">
              <>
                <StickyNavItemLabel>PROFILE</StickyNavItemLabel>

                <StickyNavItem
                  id="anchor-profile"
                  to="anchor-profile"
                  containerId="main"
                  spy
                  smooth
                  duration={500}
                  offset={-30}
                >
                  Profile settings
                </StickyNavItem>

                <StyledDivider />
                <StickyNavItemLabel>PASSWORD</StickyNavItemLabel>

                <StickyNavItem
                  id="anchor-pino"
                  to="anchor-pino"
                  containerId="main"
                  spy
                  smooth
                  duration={500}
                  offset={-30}
                >
                  Password settings
                </StickyNavItem>
              </>
            </AsideNav>
          </Col>
          <Col xs={12} lg={10}>
            <Grid gutters="xl" columns={12}>
              <Row>
                <Col xs={12} lg={9} style={{ margin: 0 }}>
                  <Card
                    id="anchor-profile"
                    style={{ marginBottom: theme.space.xxl }}
                  >
                    <LG style={{ color: theme.palette.blue[600] }}>
                      <UserIcon /> {t('__PROFILE_PAGE_USER_CARD_LABEL')}
                    </LG>
                    <div>
                      <Button
                        isAccent
                        isPrimary
                        onClick={() => {
                          alert(
                            'User profile update functionality not implemented yet.'
                          );
                        }}
                      >
                        Save changes
                      </Button>
                    </div>
                  </Card>
                  <Card>
                    <AccordionNew
                      level={3}
                      key={`password_accordion_${isOpen}`}
                      defaultExpandedSections={isOpen ? [0, 1] : []}
                    >
                      <AccordionNew.Section>
                        <AccordionNew.Header icon={<KeyIcon />}>
                          <AccordionNew.Label
                            style={{
                              color: appTheme.palette.blue[600],
                            }}
                            label={t('__PROFILE_PAGE_PASSWORD_ACCORDION_LABEL')}
                          />
                        </AccordionNew.Header>
                        <AccordionNew.Panel>bla bla</AccordionNew.Panel>
                      </AccordionNew.Section>
                    </AccordionNew>
                  </Card>
                </Col>
              </Row>
            </Grid>
          </Col>
        </Row>
      </Grid>
    </Page>
  );
};

export default Profile;
