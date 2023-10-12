import {
  Chrome,
  Body,
  AppHeader,
  Content,
  Nav,
  Main,
  Skeleton,
  Grid,
  Row,
  Col,
  CampaignCard,
  NavToggle,
  NavItem,
  NavItemIcon,
  NavItemText,
  NavDivider,
  NavItemProject,
  ContainerCard,
} from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { Divider } from './divider';
import { LayoutWrapper } from './LayoutWrapper';

const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.base * 4}px;
`;

export const PageLoader = () => {
  const isExpanded = window.matchMedia(
    `only screen and (min-width: 576px)`
  ).matches;

  return (
    <Chrome isFluid hue={appTheme.palette.white}>
      <Body>
        <AppHeader isLoading />
        <Content>
          <Nav isExpanded={isExpanded}>
            <NavItem isExpanded={isExpanded} style={{ pointerEvents: 'none' }}>
              <NavItemIcon isStyled>
                <Skeleton
                  width="32px"
                  height="32px"
                  style={{
                    borderRadius: '100%',
                    marginRight: appTheme.space.md,
                  }}
                />
              </NavItemIcon>
              <Skeleton height="16px" width="60%" />
              <NavItemText />
            </NavItem>
            <NavItem isExpanded={isExpanded} style={{ pointerEvents: 'none' }}>
              <NavItemIcon isStyled>
                <Skeleton
                  width="32px"
                  height="32px"
                  style={{
                    borderRadius: '100%',
                    marginRight: appTheme.space.md,
                  }}
                />
              </NavItemIcon>
              <Skeleton height="16px" width="60%" />
              <NavItemText />
            </NavItem>
            <NavDivider isExpanded={isExpanded} />
            <NavItem isExpanded={isExpanded} style={{ pointerEvents: 'none' }}>
              <NavItemIcon isStyled>
                <Skeleton
                  width="32px"
                  height="32px"
                  style={{
                    borderRadius: '100%',
                    marginRight: appTheme.space.md,
                  }}
                />
              </NavItemIcon>
              <Skeleton height="16px" width="60%" />
              <NavItemText />
            </NavItem>
          </Nav>
          <Main style={{ margin: 0, overflow: 'hidden' }}>
            <div
              style={{
                paddingTop: appTheme.space.lg,
                paddingBottom: appTheme.space.md,
              }}
            >
              <LayoutWrapper>
                <Skeleton
                  width="30%"
                  height="50px"
                  style={{
                    display: 'block',
                    padding: `${appTheme.space.xs} 0`,
                    margin: `${appTheme.space.xs} 0`,
                  }}
                />
                <Skeleton
                  width="80%"
                  height="24px"
                  style={{ marginTop: appTheme.space.sm }}
                />
              </LayoutWrapper>
            </div>
            <Divider style={{ margin: 0 }} />
            <div
              style={{
                backgroundColor: appTheme.palette.grey[100],
                minHeight: '100%',
                paddingTop: appTheme.space.xxl,
              }}
            >
              <LayoutWrapper>
                <Skeleton
                  width="30%"
                  height="40px"
                  style={{
                    display: 'block',
                    padding: `${appTheme.space.xs} 0`,
                    marginBottom: appTheme.space.lg,
                  }}
                />
                <Grid>
                  <Row>
                    <Col xs={12} md={6} lg={3}>
                      <StyledContainerCard>
                        <Skeleton
                          width="40%"
                          height="16px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Skeleton
                          width="65%"
                          height="16px"
                          style={{
                            marginBottom: appTheme.space.sm,
                            marginTop: appTheme.space.sm,
                          }}
                        />
                        <Skeleton
                          height="26px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: appTheme.space.sm,
                          }}
                        >
                          <Skeleton width="40%" height="18px" />
                          <Skeleton width="26px" height="26px" />
                        </div>
                      </StyledContainerCard>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                      <StyledContainerCard>
                        <Skeleton
                          width="40%"
                          height="16px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Skeleton
                          width="65%"
                          height="16px"
                          style={{
                            marginBottom: appTheme.space.sm,
                            marginTop: appTheme.space.sm,
                          }}
                        />
                        <Skeleton
                          height="26px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: appTheme.space.sm,
                          }}
                        >
                          <Skeleton width="40%" height="18px" />
                          <Skeleton width="26px" height="26px" />
                        </div>
                      </StyledContainerCard>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                      <StyledContainerCard>
                        <Skeleton
                          width="40%"
                          height="16px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Skeleton
                          width="65%"
                          height="16px"
                          style={{
                            marginBottom: appTheme.space.sm,
                            marginTop: appTheme.space.sm,
                          }}
                        />
                        <Skeleton
                          height="26px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: appTheme.space.sm,
                          }}
                        >
                          <Skeleton width="40%" height="18px" />
                          <Skeleton width="26px" height="26px" />
                        </div>
                      </StyledContainerCard>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                      <StyledContainerCard>
                        <Skeleton
                          width="40%"
                          height="16px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Skeleton
                          width="65%"
                          height="16px"
                          style={{
                            marginBottom: appTheme.space.sm,
                            marginTop: appTheme.space.sm,
                          }}
                        />
                        <Skeleton
                          height="26px"
                          style={{ marginBottom: appTheme.space.sm }}
                        />
                        <Divider />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: appTheme.space.sm,
                          }}
                        >
                          <Skeleton width="40%" height="18px" />
                          <Skeleton width="26px" height="26px" />
                        </div>
                      </StyledContainerCard>
                    </Col>
                  </Row>
                </Grid>
                <Skeleton
                  width="80%"
                  height="24px"
                  style={{ marginTop: appTheme.space.sm }}
                />
              </LayoutWrapper>
            </div>
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};
