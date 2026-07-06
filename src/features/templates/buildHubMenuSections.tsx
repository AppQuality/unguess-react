import { ReactComponent as DownloadIcon } from '@zendeskgarden/svg-icons/src/16/download-stroke.svg';
import type { TFunction } from 'i18next';
import { ReactComponent as EditRedoStroke } from 'src/assets/icons/move-icon.svg';
import type { EntityMenuItem } from './EntityPageHeader';

/**
 * Builds the hub action-menu (kebab), grouped into sections (a divider is
 * rendered between non-empty sections by the header). Hubs currently expose
 * "Move to" and "Download report"; archiving is intentionally not offered yet.
 * All gating/handlers are supplied by the caller, mirroring
 * `buildCampaignMenuSections`.
 */
export const buildHubMenuSections = ({
  t,
  isMoveDisabled,
  onMove,
  onDownloadReport,
}: {
  t: TFunction;
  isMoveDisabled: boolean;
  onMove: () => void;
  onDownloadReport: () => void;
}): EntityMenuItem[][] => [
  [
    {
      id: 'move_hub',
      label: t('__CAMPAIGN_PAGE_DOTS_MENU_MOVE_CAMPAIGN_BUTTON'),
      icon: <EditRedoStroke />,
      isDisabled: isMoveDisabled,
      onSelect: onMove,
    },
  ],
  [
    {
      id: 'download_report',
      label: t('__VIDEO_PAGE_ACTIONS_EXPORT_BUTTON_LABEL'),
      icon: <DownloadIcon />,
      onSelect: onDownloadReport,
    },
  ],
];
