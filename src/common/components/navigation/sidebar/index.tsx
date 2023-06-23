import {
  Logo,
  Nav,
  NavAccordionItem,
  NavDivider,
  NavItem,
  NavItemIcon,
  NavItemProject,
  NavItemText,
  NavToggle,
  SM,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import i18n from 'src/i18n';
import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isMaxMedia } from 'src/common/utils';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { toggleSidebar } from 'src/features/navigation/navigationSlice';
import { useNavigate } from 'react-router-dom';
import { SidebarSkeleton } from './skeleton';
import { ReactComponent as CampaignsIcon } from './icons/campaigns.svg';
import { ReactComponent as CampaignsIconActive } from './icons/campaigns-active.svg';
import { ReactComponent as ProjectsIcon } from './icons/projects.svg';
import { ReactComponent as ServicesIconActive } from './icons/services-active.svg';
import { ReactComponent as ServicesIcon } from './icons/services.svg';
import { WorkspacesDropdown } from '../workspacesDropdown';

const ScrollingContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;
  height: 100%;
`;

const SharedLabel = styled(SM)`
  margin-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.palette.grey[600]};
  padding-left: ${({ theme }) => theme.space.md};
  text-transform: uppercase;
`;

export const AppSidebar = (props: PropsWithChildren<SidebarProps>) => {
  const { route, onSidebarToggle } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSidebarOpen, activeWorkspace } = useAppSelector(
    (state) => state.navigation
  );

  const prjRef = useRef<HTMLButtonElement>(null);

  const {
    currentData: projects,
    isLoading,
    isFetching,
  } = useGetWorkspacesByWidProjectsQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
    },
    { skip: !activeWorkspace?.id }
  );

  const isMobile = isMaxMedia(appTheme.breakpoints.sm);

  const navigateTo = (destination: string, parameter?: string) => {
    let localizedRoute = '';
    if (destination === 'home') {
      localizedRoute = i18n.language === 'en' ? '/' : `/${i18n.language}`;
    } else {
      localizedRoute =
        i18n.language === 'en'
          ? `/${destination}`
          : `/${i18n.language}/${destination}`;

      if (parameter) {
        localizedRoute += `/${parameter}`;
      }
    }

    if (isMobile) {
      dispatch(toggleSidebar());
    }

    navigate(localizedRoute, { replace: true });
  };

  useEffect(() => {
    if (prjRef && prjRef.current && isSidebarOpen) {
      prjRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [isSidebarOpen]);

  const isLoadingOrFetching = isLoading || isFetching;

  return isLoadingOrFetching ? (
    <SidebarSkeleton {...props} />
  ) : (
    <Nav {...props} isExpanded={isSidebarOpen}>
      {activeWorkspace?.isShared && isSidebarOpen && (
        <SharedLabel>{t('__APP_SIDEBAR_SHARED_WORKSPACE_LABEL')}</SharedLabel>
      )}
      <ScrollingContainer>
        <NavToggle onClick={onSidebarToggle} isExpanded={isSidebarOpen} />
        {isMobile && <WorkspacesDropdown />}

        <NavItem
          className="sidebar-first-level-item"
          title="Home"
          isExpanded={isSidebarOpen}
          isCurrent={route === ''}
          onClick={() => navigateTo('home')}
        >
          <NavItemIcon>
            {route === '' ? <CampaignsIconActive /> : <CampaignsIcon />}
          </NavItemIcon>
          <NavItemText>
            {activeWorkspace?.isShared
              ? t('__APP_SIDEBAR_SHARED_WORKSPACE_HOME_ITEM_LABEL')
              : t('__APP_SIDEBAR_HOME_ITEM_LABEL')}
          </NavItemText>
        </NavItem>

        {/** Projects Accordion */}
        {projects?.items && projects.items.length ? (
          <NavAccordionItem
            className="sidebar-project-accordion-first-item"
            level={4}
            defaultExpandedSections={[0]}
            isExpanded={isSidebarOpen}
            isAnimated={false}
          >
            <NavAccordionItem.Section>
              <NavAccordionItem.Header>
                <ProjectsIcon />
                <NavAccordionItem.Label>
                  {t('__APP_SIDEBAR_PROJECTS_DIVIDER_LABEL')}{' '}
                </NavAccordionItem.Label>
              </NavAccordionItem.Header>
              <NavAccordionItem.Panel style={{ padding: 0 }}>
                {projects.items.map((project) => (
                  <NavItemProject
                    className="sidebar-project-item"
                    key={project.id}
                    isExpanded={isSidebarOpen}
                    isCurrent={route === `projects/${project.id}`}
                    {...(route === `projects/${project.id}` && { ref: prjRef })}
                    onClick={() =>
                      navigateTo('projects', project.id.toString())
                    }
                  >
                    <NavItemProject.Title title={project.name}>
                      {project.name}
                    </NavItemProject.Title>

                    <NavItemProject.SubTitle>
                      {project.campaigns_count} {t('__SIDEBAR_CAMPAIGNS_LABEL')}
                    </NavItemProject.SubTitle>
                  </NavItemProject>
                ))}
              </NavAccordionItem.Panel>
            </NavAccordionItem.Section>
          </NavAccordionItem>
        ) : null}

        <NavDivider isExpanded={isSidebarOpen} />

        {/** Services */}
        <NavItem
          className="sidebar-first-level-item"
          title="Services"
          isExpanded={isSidebarOpen}
          isCurrent={route === 'services'}
          onClick={() => navigateTo('services')}
          style={{ marginBottom: '16px' }}
        >
          <NavItemIcon isStyled>
            {route === 'services' ? <ServicesIconActive /> : <ServicesIcon />}
          </NavItemIcon>
          <NavItemText>{t('__APP_SIDEBAR_SERVICES_ITEM_LABEL')}</NavItemText>
        </NavItem>
      </ScrollingContainer>
      {/* Footer Logo */}
      <NavItem
        isExpanded={isSidebarOpen}
        hasBrandmark
        title="Be smart from the start"
        style={{ pointerEvents: 'none', paddingBottom: appTheme.space.md }}
      >
        <NavItemIcon>
          <Logo type="icon" size={150} />
        </NavItemIcon>
        <NavItemText>UNGUESS</NavItemText>
      </NavItem>
    </Nav>
  );
};
