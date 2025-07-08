import {
  Col,
  Grid,
  Row,
  Select,
  theme,
} from '@appquality/unguess-design-system';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AsideNav,
  StickyNavItem,
  StickyNavItemLabel,
  StyledDivider,
} from 'src/common/components/navigation/asideNav';
import { useGetUsersRolesQuery } from 'src/features/api';
import { Page } from 'src/features/templates/Page';
import ProfilePageHeader from 'src/pages/Profile/Header';
import { Form } from './Form';
import { FormProvider } from './FormProvider';

const Profile = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetUsersRolesQuery();
  const renderOptions = useMemo(
    () =>
      isLoading || !data ? (
        <Select.Option value="loading">loading...</Select.Option>
      ) : (
        data?.map((role) => (
          <Select.Option key={role.id} value={role.id.toString()}>
            {role.name}
          </Select.Option>
        ))
      ),
    [data]
  );
  const selectRef = useRef<HTMLDivElement>(null);

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
                  <FormProvider>
                    <Form />
                  </FormProvider>
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
