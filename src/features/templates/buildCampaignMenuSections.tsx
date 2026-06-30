import { ReactComponent as DownloadIcon } from '@zendeskgarden/svg-icons/src/16/download-stroke.svg';
import { ReactComponent as ExternalLinkIcon } from '@zendeskgarden/svg-icons/src/16/new-window-stroke.svg';
import type { TFunction } from 'i18next';
import { ReactComponent as GearIcon } from 'src/assets/icons/gear.svg';
import { ReactComponent as EditRedoStroke } from 'src/assets/icons/move-icon.svg';
import { ReactComponent as InboxFill } from 'src/assets/icons/project-archive.svg';
import type { GetCampaignsByCidApiResponse } from 'src/features/api';
import type { EntityMenuItem } from './EntityPageHeader';

/**
 * Builds the campaign action-menu, grouped into sections (a divider is rendered
 * between non-empty sections by the header). All gating and handlers are
 * supplied by the caller; this stays a pure, presentation-agnostic mapping.
 */
export const buildCampaignMenuSections = ({
  campaign,
  t,
  isMoveDisabled,
  showDownloadAnalysis,
  showBugActions,
  onMove,
  onArchive,
  onDownloadAnalysis,
  onDownloadBugReport,
  onIntegrationCenter,
  onGoToPlan,
}: {
  campaign: GetCampaignsByCidApiResponse;
  t: TFunction;
  isMoveDisabled: boolean;
  showDownloadAnalysis: boolean;
  showBugActions: boolean;
  onMove: () => void;
  onArchive: () => void;
  onDownloadAnalysis: () => void;
  onDownloadBugReport: () => void;
  onIntegrationCenter: () => void;
  onGoToPlan: () => void;
}): EntityMenuItem[][] => {
  const sections: EntityMenuItem[][] = [
    [
      {
        id: 'move_campaign',
        label: t('__CAMPAIGN_PAGE_DOTS_MENU_MOVE_CAMPAIGN_BUTTON'),
        icon: <EditRedoStroke />,
        isDisabled: isMoveDisabled,
        onSelect: onMove,
      },
      {
        id: 'archive_campaign',
        label: t('__CAMPAIGN_PAGE_DOTS_MENU_ARCHIVE_CAMPAIGN_BUTTON'),
        icon: <InboxFill />,
        isDisabled: campaign.status.id !== 2,
        onSelect: onArchive,
      },
    ],
  ];

  const downloadSection: EntityMenuItem[] = [];
  if (showDownloadAnalysis) {
    downloadSection.push({
      id: 'download_analysis',
      label: t('__VIDEO_PAGE_ACTIONS_EXPORT_BUTTON_LABEL'),
      icon: <DownloadIcon />,
      onSelect: onDownloadAnalysis,
    });
  }
  if (showBugActions) {
    downloadSection.push(
      {
        id: 'download_bug_report',
        label: t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_REPORT'),
        icon: <DownloadIcon />,
        onSelect: onDownloadBugReport,
      },
      {
        id: 'integration_center',
        label: t('__PAGE_HEADER_BUGS_DOTS_MENU_ITEM_INT_CENTER'),
        icon: <GearIcon />,
        onSelect: onIntegrationCenter,
      }
    );
  }
  if (downloadSection.length > 0) {
    sections.push(downloadSection);
  }

  if (campaign.plan) {
    sections.push([
      {
        id: 'go_to_plan',
        label: t('__CAMPAIGN_PAGE_DOTS_MENU_GO_TO_PLAN_BUTTON'),
        icon: <ExternalLinkIcon />,
        onSelect: onGoToPlan,
      },
    ]);
  }

  return sections;
};
