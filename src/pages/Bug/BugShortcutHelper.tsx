import {
  MD,
  Modal,
  ModalClose,
  ShortcutTag,
} from '@appquality/unguess-design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/ai-icon.svg';
import { ReactComponent as DoubleCheck } from 'src/assets/icons/check-double-stroke.svg';
import { ReactComponent as MentionIcon } from 'src/assets/icons/at-stroke.svg';
import { ReactComponent as UserGroupIcon } from 'src/assets/icons/user-group-stroke.svg';
import { ReactComponent as EnterStroke } from 'src/assets/icons/enter-stroke.svg';
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

const ShortcutWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.xs};
`;

const ShortcutItem = ({
  icon,
  shortcut,
  children,
}: {
  icon: React.ReactNode;
  shortcut: (React.ReactNode | 'ctrl')[];
  children: React.ReactNode;
}) => (
  <ShortcutItemWrapper>
    <div className="description">
      {icon}
      {children}:
    </div>
    <ShortcutWrapper>
      {shortcut.map((key) => {
        if (key === 'ctrl') return <ShortcutTag ctrl />;
        return <ShortcutTag text={key} />;
      })}
    </ShortcutWrapper>
  </ShortcutItemWrapper>
);

export const BugShortcutHelper = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        <TitleWrapper>
          <ArrowLeft />
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
            <ShortcutItem icon={<BoldIcon />} shortcut={['ctrl', 'B']}>
              {t('__BUGS_PAGE_SHORTCUT_BOLD_TEXT', 'Bold Text')}
            </ShortcutItem>
            <ShortcutItem icon={<ItalicIcon />} shortcut={['ctrl', 'I']}>
              {t('__BUGS_PAGE_SHORTCUT_OBLIQUE_TEXT', 'Oblique Text')}
            </ShortcutItem>
            <ShortcutItem icon={<UserGroupIcon />} shortcut={[<MentionIcon />]}>
              {t('__BUGS_PAGE_SHORTCUT_MENTION', 'Mention')}
            </ShortcutItem>
            <ShortcutItem
              icon={<DoubleCheck />}
              shortcut={['ctrl', <EnterStroke />]}
            >
              {t('__BUGS_PAGE_SHORTCUT_SEND_TEXT', 'Send')}
            </ShortcutItem>
          </div>
        </ContentWrapper>
      </Modal.Body>
    </Modal>
  );
};
