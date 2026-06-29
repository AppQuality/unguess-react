import {
  Anchor,
  ButtonMenu,
  IconButton,
  InputToggle,
  PageHeader,
} from '@appquality/unguess-design-system';
import { ReactComponent as ExternalLinkIcon } from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as EditRedoStroke } from 'src/assets/icons/move-icon.svg';
import { ReactComponent as InboxFill } from 'src/assets/icons/project-archive.svg';
import { Divider } from 'src/common/components/divider';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { TabNavigation } from 'src/common/components/TabNavigation';
import type { GetCampaignsByCidApiResponse } from 'src/features/api';
import { usePatchCampaignsByCidMutation } from 'src/features/api';
import { EditableTitle } from 'src/pages/Campaign/pageHeader/EditableTitle';
import { styled } from 'styled-components';

export type EntityPageTabId =
  | 'overview'
  | 'media-list'
  | 'insights'
  | 'bug-list';

type EntityPageTab = {
  id: EntityPageTabId;
  label: string;
};

type EntityPageHeaderProps = {
  isHub: boolean;
  entityId: string;
  entityTitle: string;
  project: {
    name: string;
    route: string;
    hasAccess: boolean;
  };
  campaign?: GetCampaignsByCidApiResponse;
  tabs: EntityPageTab[];
  activeTab: EntityPageTabId;
  shareAndViewersSlot?: React.ReactNode;
  ctaSlot?: React.ReactNode;
  showCampaignActions?: boolean;
  isMoveCampaignDisabled?: boolean;
  onMoveCampaign?: () => void;
  onArchiveCampaign?: () => void;
  onGoToPlan?: () => void;
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

const HubTitle = ({ entityId, title }: { entityId: string; title: string }) => {
  const { t } = useTranslation();
  const [hubTitle, setHubTitle] = useState(title);
  const [patchCampaign] = usePatchCampaignsByCidMutation();

  useEffect(() => {
    setHubTitle(title);
  }, [title]);

  return (
    <InputToggle className="editable-title">
      <InputToggle.Item
        preventEmpty
        textSize="xxxl"
        maxLength={64}
        value={hubTitle}
        onChange={(e) => setHubTitle(e.target.value)}
        onBlur={async (e) => {
          try {
            if (e.currentTarget.value && e.currentTarget.value !== title) {
              await patchCampaign({
                cid: entityId,
                body: { customer_title: e.currentTarget.value },
              }).unwrap();
            }
          } catch {
            // eslint-disable-next-line
            alert(t('__CAMPAIGN_PAGE_UPDATE_CAMPAIGN_NAME_ERROR'));
          }
        }}
        style={{ paddingLeft: 0 }}
      />
    </InputToggle>
  );
};

export const EntityPageHeader = ({
  isHub,
  entityId,
  entityTitle,
  project,
  campaign,
  tabs,
  activeTab,
  shareAndViewersSlot,
  ctaSlot,
  showCampaignActions = false,
  isMoveCampaignDisabled = false,
  onMoveCampaign,
  onArchiveCampaign,
  onGoToPlan,
}: EntityPageHeaderProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getTabLink = (tabId: EntityPageTabId) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabId);
    return `${location.pathname}?${params.toString()}${location.hash}`;
  };

  return (
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
            {isHub ? (
              <HubTitle entityId={entityId} title={entityTitle} />
            ) : (
              <EditableTitle campaignId={Number(entityId)} />
            )}
          </TitleColumn>
          <ActionsContainer>
            {!isHub && shareAndViewersSlot}
            {ctaSlot}
            {!isHub && showCampaignActions && campaign && (
              <ButtonMenu
                onSelect={(value) => {
                  if (value === 'move_campaign') {
                    onMoveCampaign?.();
                  } else if (value === 'archive_campaign') {
                    onArchiveCampaign?.();
                  } else if (value === 'go_to_plan') {
                    onGoToPlan?.();
                  }
                }}
                label={(props) => (
                  <IconButton
                    data-qa="campaign_pageHeader_kebabMenu"
                    {...props}
                  >
                    <DotsIcon />
                  </IconButton>
                )}
              >
                <ButtonMenu.Item
                  isDisabled={isMoveCampaignDisabled}
                  value="move_campaign"
                  icon={<EditRedoStroke />}
                >
                  {t('__CAMPAIGN_PAGE_DOTS_MENU_MOVE_CAMPAIGN_BUTTON')}
                </ButtonMenu.Item>
                <ButtonMenu.Item
                  isDisabled={campaign.status.id !== 2}
                  value="archive_campaign"
                  icon={<InboxFill />}
                >
                  {t('__CAMPAIGN_PAGE_DOTS_MENU_ARCHIVE_CAMPAIGN_BUTTON')}
                </ButtonMenu.Item>
                {!!campaign.plan && (
                  <>
                    <Divider />
                    <ButtonMenu.Item
                      value="go_to_plan"
                      icon={<ExternalLinkIcon />}
                    >
                      {t('__CAMPAIGN_PAGE_DOTS_MENU_GO_TO_PLAN_BUTTON')}
                    </ButtonMenu.Item>
                  </>
                )}
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
  );
};
