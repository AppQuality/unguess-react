import {
  IconButton,
  MD,
  Modal,
  ModalClose,
  ShortcutTag,
} from '@appquality/unguess-design-system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';
import { ReactComponent as ForwardIcon } from 'src/assets/icons/forward.svg';
import { ReactComponent as KeyboardIcon } from 'src/assets/icons/keyboard.svg';
import { ReactComponent as MuteIcon } from 'src/assets/icons/mute.svg';
import { ReactComponent as PlayIcon } from 'src/assets/icons/play.svg';
import { ReactComponent as RewindIcon } from 'src/assets/icons/rewind.svg';
import { ReactComponent as TagIcon } from 'src/assets/icons/tag-icon.svg';
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

const ShortcutHelper = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Modal.Header>
            <TitleWrapper>
              <KeyboardIcon /> <span>{t('UX_SHORTCUT_MODAL_TITLE')}</span>
            </TitleWrapper>
            <ModalClose onClick={() => setIsOpen(false)} />
          </Modal.Header>
          <Modal.Body>
            <ContentWrapper>
              <MD isBold>{t('UX_SHORTCUT_MODAL_CONTENT_TITLE')}</MD>
              <div>
                <ShortcutItem icon={<PlayIcon />} shortcut={['Space']}>
                  {t('UX_SHORTCUT_PLAY_PAUSE')}
                </ShortcutItem>
                <ShortcutItem icon={<MuteIcon />} shortcut={['M']}>
                  {t('UX_SHORTCUT_MUTE')}
                </ShortcutItem>
                <ShortcutItem
                  icon={<ForwardIcon />}
                  shortcut={[<ArrowRight />]}
                >
                  {t('UX_SHORTCUT_FORWARD')}
                </ShortcutItem>
                <ShortcutItem icon={<RewindIcon />} shortcut={[<ArrowLeft />]}>
                  {t('UX_SHORTCUT_REWIND')}
                </ShortcutItem>
                <ShortcutItem icon={<TagIcon />} shortcut={['S']}>
                  {t('UX_SHORTCUT_ADD_OBSERVATION')}
                </ShortcutItem>
              </div>
            </ContentWrapper>
          </Modal.Body>
        </Modal>
      )}
      <IconButton isBasic={false} onClick={() => setIsOpen(true)}>
        <KeyboardIcon />
      </IconButton>
    </>
  );
};

export { ShortcutHelper };
