import {
  Anchor,
  ButtonMenu,
  IconButton,
  PageHeader,
} from '@appquality/unguess-design-system';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import React, { Fragment } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { TabNavigation } from 'src/common/components/TabNavigation';
import { styled } from 'styled-components';
import { EditableEntityTitle } from './EditableEntityTitle';

export type EntityPageTabId =
  | 'overview'
  | 'media-list'
  | 'insights'
  | 'bug-list';

type EntityPageTab = {
  id: EntityPageTabId;
  label: string;
};

/**
 * A single action-menu entry. The header renders these generically; all gating
 * and behaviour is decided by the caller. Group items into sections (see
 * `menuSections`) to control where dividers appear.
 */
export type EntityMenuItem = {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactElement;
  isDisabled?: boolean;
  onSelect: () => void;
};

type EntityPageHeaderProps = {
  entityId: string;
  entityTitle: string;
  project: {
    name: string;
    route: string;
    hasAccess: boolean;
  };
  tabs: EntityPageTab[];
  activeTab: EntityPageTabId;
  /** Full-width alert rendered above the header (e.g. archived-entity banner). */
  bannerSlot?: React.ReactNode;
  shareAndViewersSlot?: React.ReactNode;
  ctaSlot?: React.ReactNode;
  /** Action-menu items grouped into sections; a divider separates each non-empty section. */
  menuSections?: EntityMenuItem[][];
};

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
`;

const TitleColumn = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  flex: 0 0 auto;
  gap: ${({ theme }) => theme.space.sm};
`;

const TabsRow = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

export const EntityPageHeader = ({
  entityId,
  entityTitle,
  project,
  tabs,
  activeTab,
  bannerSlot,
  shareAndViewersSlot,
  ctaSlot,
  menuSections,
}: EntityPageHeaderProps) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getTabLink = (tabId: EntityPageTabId) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabId);
    return `${location.pathname}?${params.toString()}${location.hash}`;
  };

  const visibleSections = (menuSections ?? []).filter(
    (section) => section.length > 0
  );
  const menuItems = visibleSections.flat();

  return (
    <>
      {bannerSlot}
      <LayoutWrapper isNotBoxed>
        <PageHeader
          style={{ borderBottom: 'none', paddingBottom: appTheme.space.xs }}
        >
          <PageHeader.Breadcrumbs>
            {project.hasAccess ? (
              <Link to={project.route}>
                <Anchor id="breadcrumb-project">{project.name}</Anchor>
              </Link>
            ) : (
              project.name
            )}
          </PageHeader.Breadcrumbs>
          <TitleRow>
            <TitleColumn>
              <EditableEntityTitle entityId={entityId} title={entityTitle} />
            </TitleColumn>
            <ActionsContainer>
              {shareAndViewersSlot}
              {ctaSlot}
              {menuItems.length > 0 && (
                <ButtonMenu
                  onSelect={(value) =>
                    menuItems.find((item) => item.id === value)?.onSelect()
                  }
                  label={(props) => (
                    <IconButton
                      data-qa="campaign_pageHeader_kebabMenu"
                      {...props}
                    >
                      <DotsIcon />
                    </IconButton>
                  )}
                >
                  {visibleSections.map((section, sectionIndex) => (
                    <Fragment key={section.map((item) => item.id).join('|')}>
                      {sectionIndex > 0 && <Divider />}
                      {section.map((item) => (
                        <ButtonMenu.Item
                          key={item.id}
                          value={item.id}
                          icon={item.icon}
                          isDisabled={item.isDisabled}
                        >
                          {item.label}
                        </ButtonMenu.Item>
                      ))}
                    </Fragment>
                  ))}
                </ButtonMenu>
              )}
            </ActionsContainer>
          </TitleRow>
        </PageHeader>

        <TabsRow>
          <TabNavigation
            aria-label={entityTitle}
            activeId={activeTab}
            items={tabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
              to: getTabLink(tab.id),
            }))}
          />
        </TabsRow>
      </LayoutWrapper>
    </>
  );
};
