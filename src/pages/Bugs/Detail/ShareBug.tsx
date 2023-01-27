import {
  IconButton,
  Modal,
  ModalClose,
  MD,
  Span,
  Dots,
} from '@appquality/unguess-design-system';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { WaterButton } from 'src/common/components/waterButton';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-lg-stroke.svg';
import { useShareBug } from './hooks/useShareBug';

const StyledMd = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const ShareButton = ({ bug }: { bug: Bug }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const { createLink, link, isLoading, isError } = useShareBug({ bid: bug.id });

  const getButtonContent = useCallback(() => {
    if (isError) {
      return t('__BUGS_PAGE_SHARE_BUG_MODAL_CTA_ERROR_TEXT');
    }

    if (isLoading) {
      return <Dots />;
    }

    return link
      ? t('__BUGS_PAGE_SHARE_BUG_MODAL_CTA_SUCCESS_TEXT')
      : t('__BUGS_PAGE_SHARE_BUG_MODAL_CTA_TEXT');
  }, [isLoading, link, isError]);

  return (
    <>
      <IconButton onClick={() => setModalIsOpen(true)}>
        <ShareIcon />
      </IconButton>
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
          <Modal.Header>{t('__BUGS_PAGE_SHARE_BUG_MODAL_TITLE')}</Modal.Header>
          <Modal.Body>
            <StyledMd style={{ marginBottom: globalTheme.space.sm }}>
              <Trans i18nKey="__BUGS_PAGE_SHARE_BUG_MODAL_DESCRIPTION">
                It will be generated a public link to this bug, available for{' '}
                <Span isBold>50 days:</Span>
              </Trans>
            </StyledMd>
            <StyledMd>
              ID {bug.id} -
              <Span isBold>
                &quot;{bug.title.compact}
                &quot;
              </Span>
            </StyledMd>
          </Modal.Body>
          <Modal.Footer>
            <WaterButton
              isPrimary
              isPill
              disabled={isLoading}
              onClick={createLink}
            >
              {link && !isLoading && (
                <WaterButton.StartIcon>
                  <CheckIcon />
                </WaterButton.StartIcon>
              )}
              {getButtonContent()}
            </WaterButton>
          </Modal.Footer>
          <ModalClose />
        </Modal>
      )}
    </>
  );
};
