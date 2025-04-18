import { DotsMenu } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useState } from 'react';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { ReactComponent as KeyboardIcon } from 'src/assets/icons/keyboard.svg';
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { ShareModal } from 'src/common/components/BugDetail/ShareModal';
import { GetCampaignsByCidBugsAndBidApiResponse } from 'src/features/api';
import { useCopyLink } from 'src/hooks/useCopyLink';
import { useSendGTMevent } from 'src/hooks/useGTMevent';
import { BugShortcutHelper } from '../BugShortcutHelper';

export const ActionsMenu = ({
  bug,
}: {
  bug: GetCampaignsByCidBugsAndBidApiResponse;
}) => {
  const copyLinkToClipboard = useCopyLink();
  const sendGTMEvent = useSendGTMevent();
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isShortcutModalOpen, setShortcutModalOpen] = useState(false);
  const handleClickMenu = (value: string | undefined) => {
    sendGTMEvent({
      event: 'bug_header_action',
      action: 'openDotsMenu',
    });

    if (value === 'share') {
      sendGTMEvent({
        event: 'bug_header_action',
        action: 'setShareModalOpen',
      });
      setShareModalOpen(true);
    }
    if (value === 'copy') {
      sendGTMEvent({
        event: 'bug_header_action',
        action: 'copyLinkToClipboard',
      });
      copyLinkToClipboard();
    }
    if (value === 'shortcut') {
      sendGTMEvent({
        event: 'bug_header_action',
        action: 'setShortcutModalOpen',
      });
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
