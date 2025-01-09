import {
  Dots,
  Modal,
  MD,
  Span,
  ModalClose,
  Button,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Bug } from 'src/features/api';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-lg-stroke.svg';
import { useShareBug } from './hooks/useShareBug';

export const ShareModal = ({
  bug,
  onClose,
}: {
  bug: Bug;
  onClose: () => void;
}) => {
  const { createLink, link, isLoading, isError } = useShareBug({
    bid: bug.id,
    reset: false,
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
    <Modal onClose={onClose}>
      <Modal.Header>{t('__BUGS_PAGE_SHARE_BUG_MODAL_TITLE')}</Modal.Header>
      <Modal.Body>
        <MD style={{ marginBottom: appTheme.space.sm }}>
          <Trans i18nKey="__BUGS_PAGE_SHARE_BUG_MODAL_DESCRIPTION">
            It will be generated a public link to this bug, available for{' '}
            <Span isBold>50 days:</Span>
          </Trans>
        </MD>
        <MD>
          ID {bug.id}{' '}
          <Span isBold>
            &quot;{bug.title.full}
            &quot;
          </Span>
        </MD>
      </Modal.Body>
      <Modal.Footer>
        <Button isPrimary isAccent disabled={isLoading} onClick={createLink}>
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
  );
};
