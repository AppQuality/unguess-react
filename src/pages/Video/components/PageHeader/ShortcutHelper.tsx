import {
  IconButton,
  MD,
  Modal,
  ModalClose,
  PlayerProvider,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  margin: ${({ theme }) => theme.space.sm} 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const ShortcutHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                <ShortcutItemWrapper>
                  <PlayerProvider.Shortcut
                    icon={<PlayIcon />}
                    type="play/pause"
                  >
                    {t('UX_SHORTCUT_PLAY_PAUSE')}
                  </PlayerProvider.Shortcut>
                </ShortcutItemWrapper>

                <ShortcutItemWrapper>
                  <PlayerProvider.Shortcut icon={<MuteIcon />} type="mute">
                    {t('UX_SHORTCUT_MUTE')}
                  </PlayerProvider.Shortcut>
                </ShortcutItemWrapper>

                <ShortcutItemWrapper>
                  <PlayerProvider.Shortcut
                    icon={<ForwardIcon />}
                    type="forward"
                  >
                    {t('UX_SHORTCUT_FORWARD')}
                  </PlayerProvider.Shortcut>
                </ShortcutItemWrapper>

                <ShortcutItemWrapper>
                  <PlayerProvider.Shortcut
                    icon={<RewindIcon />}
                    type="backward"
                  >
                    {t('UX_SHORTCUT_REWIND')}
                  </PlayerProvider.Shortcut>
                </ShortcutItemWrapper>

                <ShortcutItemWrapper>
                  <PlayerProvider.Shortcut
                    icon={<TagIcon />}
                    type="observation"
                  >
                    {t('UX_SHORTCUT_ADD_OBSERVATION')}
                  </PlayerProvider.Shortcut>
                </ShortcutItemWrapper>
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
