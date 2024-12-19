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

import { PropsWithChildren, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { useGetWorkspacesByWidProjectsQuery } from 'src/features/api';
import { toggleSidebar } from 'src/features/navigation/navigationSlice';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import useWindowSize from 'src/hooks/useWindowSize';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { WorkspacesDropdown } from '../workspacesDropdown';
import { ReactComponent as CampaignsIconActive } from './icons/campaigns-active.svg';
import { ReactComponent as CampaignsIcon } from './icons/campaigns.svg';
import { ReactComponent as ProjectsIcon } from './icons/projects.svg';
import { ReactComponent as ServicesIconActive } from './icons/services-active.svg';
import { ReactComponent as ServicesIcon } from './icons/services.svg';
import { ReactComponent as ArchiveIcon } from './icons/project-archive.svg';
import { SidebarSkeleton } from './skeleton';

const ScrollingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SharedLabel = styled(SM)`
  margin-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.palette.grey[600]};
  padding-left: ${({ theme }) => theme.space.md};
  text-transform: uppercase;
`;

const DropdownItem = styled.div`
  margin: ${({ theme }) => theme.space.xs};
  font-family: ${({ theme }) => theme.fonts.system};
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavItemArchive = styled(NavItemText)`
  .content {
    display: flex;
    flex-direction: column;

    ${SM} {
      color: ${({ theme }) => theme.palette.grey[600]};
    }
  }
`;

export const AppSidebar = (props: PropsWithChildren<SidebarProps>) => {
  const { route, onSidebarToggle } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSidebarOpen } = useAppSelector((state) => state.navigation);
  const { activeWorkspace } = useActiveWorkspace();
  const { isMobile } = useWindowSize();

  const prjRef = useRef<HTMLButtonElement>(null);

  const {
    currentData: allProjects,
    isLoading,
    isFetching,
  } = useGetWorkspacesByWidProjectsQuery(
    {
      wid: activeWorkspace?.id.toString() || '',
    },
    { skip: !activeWorkspace?.id }
  );
  const projects =
    allProjects && allProjects.items
      ? allProjects?.items.filter((project) => !project.is_archive)
      : [];
  const archive =
    allProjects &&
    allProjects.items &&
    allProjects?.items.find((project) => project.is_archive);

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
        {!isMobile && (
          <NavToggle
            id="sidebar-nav-toggle"
            onClick={onSidebarToggle}
            isExpanded={isSidebarOpen}
            style={{ display: 'block', zIndex: 4 }}
          />
        )}
        {isMobile && isSidebarOpen && (
          <DropdownItem id="sidebar-dropdown-item">
            <WorkspacesDropdown />
          </DropdownItem>
        )}

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
        {projects && projects.length ? (
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
              <NavAccordionItem.Panel
                style={{ padding: 0, maxHeight: '180px' }}
              >
                {projects.map((project) => (
                  <NavItemProject
                    className="sidebar-project-item"
                    key={project.id}
                    isExpanded={isSidebarOpen}
                    isCurrent={route === `projects/${project.id}`}
                    {...(route === `projects/${project.id}` && {
                      ref: prjRef,
                    })}
                    onClick={() =>
                      navigateTo('projects', project.id.toString())
                    }
                    style={{ alignItems: 'flex-start' }}
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
        >
          <NavItemIcon isStyled>
            {route === 'services' ? <ServicesIconActive /> : <ServicesIcon />}
          </NavItemIcon>
          <NavItemText>{t('__APP_SIDEBAR_SERVICES_ITEM_LABEL')}</NavItemText>
        </NavItem>
        {archive && (
          <NavItem
            className="sidebar-first-level-item"
            title="Archive"
            isExpanded={isSidebarOpen}
            isCurrent={route === `projects/${archive.id}`}
            onClick={() => navigateTo(`projects/${archive.id}`)}
          >
            <NavItemIcon isStyled style={{ alignSelf: 'center' }}>
              <ArchiveIcon />
            </NavItemIcon>
            <NavItemArchive>
              <div className="content">
                Archive
                <SM>
                  {archive.campaigns_count} {t('__SIDEBAR_CAMPAIGNS_LABEL')}
                </SM>
              </div>
            </NavItemArchive>
          </NavItem>
        )}
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
