import { Chat, MD, Modal, ModalClose } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { ReactComponent as KeyboardIcon } from 'src/assets/icons/keyboard.svg';
import { ReactComponent as DoubleCheck } from 'src/assets/icons/check-double-stroke.svg';
import { ReactComponent as UserGroupIcon } from 'src/assets/icons/user-group-stroke.svg';
import { ReactComponent as BoldIcon } from 'src/assets/icons/bold-stroke.svg';
import { ReactComponent as ItalicIcon } from 'src/assets/icons/italic-stroke.svg';

import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const ShortcutItemWrapper = styled.div`
  display: flex;
  margin: ${({ theme }) => theme.space.sm} 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  justify-content: space-between;
  .description {
    display: flex;
    gap: ${({ theme }) => theme.space.xs};
    align-items: center;
  }
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
        <ContentWrapper>
          <MD isBold>
            {t(
              '__BUGS_PAGE_SHORTCUT_MODAL_CONTENT_TITLE',
              'Essential Keyboard shortcut for Messages'
            )}
          </MD>
          <div>
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
          </div>
        </ContentWrapper>
      </Modal.Body>
    </Modal>
  );
};
