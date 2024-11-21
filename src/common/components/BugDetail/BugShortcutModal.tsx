import {
  Modal,
  MD,
  Span,
  ModalClose,
  Label,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as BoldIcon } from '@zendeskgarden/svg-icons/src/16/bold-stroke.svg';
import { Divider } from '../divider';

export const BugShortcutModal = ({ onClose }: { onClose: () => void }) => {
  const a = 1;

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        {t('__BUGS_PAGE_SHORTCUT_BUG_MODAL_TITLE', 'Keyboard Shortcut')}
      </Modal.Header>
      <Modal.Body>
        <MD style={{ marginBottom: appTheme.space.sm }}>
          Essential Keyboard shortcut for Messages
        </MD>

        <Divider />
        <Span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <BoldIcon style={{ marginRight: appTheme.space.sm }} />
          <Label> Bold Text </Label>
        </Span>
        <Divider />
        <Span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <BoldIcon style={{ marginRight: appTheme.space.sm }} />
          <Label> Oblique Text </Label>
        </Span>
        <Divider />
        <Span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <BoldIcon style={{ marginRight: appTheme.space.sm }} />
          <Label> Mention </Label>
        </Span>
      </Modal.Body>
      <Modal.Footer />
      <ModalClose />
    </Modal>
  );
};
