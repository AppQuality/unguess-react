import { Chat, MD, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as BoldIcon } from 'src/assets/icons/bold-stroke.svg';
import { ReactComponent as DoubleCheck } from 'src/assets/icons/check-double-stroke.svg';
import { ReactComponent as ItalicIcon } from 'src/assets/icons/italic-stroke.svg';
import { ReactComponent as KeyboardIcon } from 'src/assets/icons/keyboard.svg';
import { ReactComponent as UserGroupIcon } from 'src/assets/icons/user-group-stroke.svg';

import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const ShortcutItemWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.sm};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

export const BugShortcutHelper = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        <TitleWrapper>
          <KeyboardIcon />
          <span>
            {t('__BUGS_PAGE_SHORTCUT_BUG_MODAL_TITLE', 'Keyboard Shortcut')}
          </span>
        </TitleWrapper>
        <ModalClose onClick={onClose} />
      </Modal.Header>
      <Modal.Body>
        <MD isBold style={{ marginBottom: appTheme.space.sm }}>
          {t(
            '__BUGS_PAGE_SHORTCUT_MODAL_CONTENT_TITLE',
            'Essential Keyboard shortcut for Messages'
          )}
        </MD>
        <ShortcutItemWrapper>
          <Chat.Shortcut icon={<BoldIcon />} type="bold">
            {t('__BUGS_PAGE_SHORTCUT_BOLD_TEXT', 'Bold Text')}
          </Chat.Shortcut>
        </ShortcutItemWrapper>
        <ShortcutItemWrapper>
          <Chat.Shortcut icon={<ItalicIcon />} type="italic">
            {t('__BUGS_PAGE_SHORTCUT_OBLIQUE_TEXT', 'Oblique Text')}
          </Chat.Shortcut>
        </ShortcutItemWrapper>
        <ShortcutItemWrapper>
          <Chat.Shortcut icon={<UserGroupIcon />} type="mention">
            {t('__BUGS_PAGE_SHORTCUT_MENTION', 'Mention')}
          </Chat.Shortcut>
        </ShortcutItemWrapper>
        <ShortcutItemWrapper>
          <Chat.Shortcut icon={<DoubleCheck />} type="send">
            {t('__BUGS_PAGE_SHORTCUT_SEND_TEXT', 'Send')}
          </Chat.Shortcut>
        </ShortcutItemWrapper>
      </Modal.Body>
    </Modal>
  );
};
