import { DotsMenu } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyboardIcon } from 'src/assets/icons/keyboard.svg';
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { useCopyLink } from 'src/common/components/utils/useCopyLink';
import { ShareModal } from 'src/common/components/BugDetail/ShareModal';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import { BugShortcutHelper } from '../BugShortcutHelper';

export const ActionsMenu = ({
  bug,
}: {
  bug: GetCampaignsByCidBugsAndBidApiResponse;
}) => {
  const copyLinkToClipboard = useCopyLink();
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isShortcutModalOpen, setShortcutModalOpen] = useState(false);
  const handleClickMenu = (value: string | undefined) => {
    if (value === 'share') {
      setShareModalOpen(true);
    }
    if (value === 'copy') {
      copyLinkToClipboard();
    }
    if (value === 'shortcut') {
      setShortcutModalOpen(true);
    }
  };
  return (
    <>
      <DotsMenu onSelect={handleClickMenu}>
        <DotsMenu.Item value="share">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: appTheme.space.xs,
            }}
          >
            <ShareIcon />
            {t('__BUG_PAGE_HEADER_SHARE_LINK_CTA', 'Share public link')}
          </div>
        </DotsMenu.Item>
        <DotsMenu.Item value="copy">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: appTheme.space.xs,
            }}
          >
            <CopyIcon />
            {t('__BUG_PAGE_HEADER_COPY_LINK_CTA', 'Copy link')}
          </div>
        </DotsMenu.Item>
        <DotsMenu.Item value="shortcut">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: appTheme.space.xs,
            }}
          >
            <KeyboardIcon />
            {t('__BUG_PAGE_HEADER_SHORTCUT_LINK_CTA', 'Keyboard shortcuts')}
          </div>
        </DotsMenu.Item>
      </DotsMenu>
      {isShareModalOpen && (
        <ShareModal bug={bug} onClose={() => setShareModalOpen(false)} />
      )}
      {isShortcutModalOpen && (
        <BugShortcutHelper onClose={() => setShortcutModalOpen(false)} />
      )}
    </>
  );
};