import {
  IconButton,
  Modal,
  ModalClose,
  MD,
  Span,
  Dots,
  Tooltip,
  Button,
} from '@appquality/unguess-design-system';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as ShareIcon } from 'src/assets/icons/share-stroke.svg';
import { Bug } from 'src/features/api';
import styled from 'styled-components';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-lg-stroke.svg';
import { useShareBug } from './hooks/useShareBug';

const StyledMd = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const ShareButton = ({
  bug,
  children,
}: {
  bug: Bug;
  children?: (action: Dispatch<SetStateAction<boolean>>) => ReactElement;
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const { createLink, link, isLoading, isError } = useShareBug({
    bid: bug.id,
    reset: modalIsOpen,
  });

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
    <div className="sharable-url-button">
      {children ? (
        children(setModalIsOpen)
      ) : (
        <Tooltip
          content={t('__BUGS_PAGE_SHARE_BUG_MODAL_CTA_TOOLTIP')}
          size="large"
          type="light"
          placement="auto"
        >
          <IconButton
            size="small"
            onClick={() => setModalIsOpen(true)}
            className="bug-detail-sharable-url"
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
      )}
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
          <Modal.Header>{t('__BUGS_PAGE_SHARE_BUG_MODAL_TITLE')}</Modal.Header>
          <Modal.Body>
            <StyledMd style={{ marginBottom: appTheme.space.sm }}>
              <Trans i18nKey="__BUGS_PAGE_SHARE_BUG_MODAL_DESCRIPTION">
                It will be generated a public link to this bug, available for{' '}
                <Span isBold>50 days:</Span>
              </Trans>
            </StyledMd>
            <StyledMd>
              ID {bug.id}{' '}
              <Span isBold>
                &quot;{bug.title.full}
                &quot;
              </Span>
            </StyledMd>
          </Modal.Body>
          <Modal.Footer>
            <Button
              isPrimary
              isAccent
              disabled={isLoading}
              onClick={createLink}
            >
              {link && !isLoading && (
                <Button.StartIcon>
                  <CheckIcon />
                </Button.StartIcon>
              )}
              {getButtonContent()}
            </Button>
          </Modal.Footer>
          <ModalClose />
        </Modal>
      )}
    </div>
  );
};
