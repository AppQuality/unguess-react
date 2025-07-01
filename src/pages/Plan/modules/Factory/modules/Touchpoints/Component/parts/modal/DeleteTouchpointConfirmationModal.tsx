import {
  Button,
  FooterItem,
  Modal,
  ModalClose,
} from '@appquality/unguess-design-system';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useModuleTouchpoints } from '../../hooks';

const DeleteTouchpointConfirmationModal = ({
  state,
}: {
  state: [
    {
      isOpen: boolean;
      touchpointKey: number;
    },
    Dispatch<
      SetStateAction<{
        isOpen: boolean;
        touchpointKey: number;
      }>
    >
  ];
}) => {
  const { t } = useTranslation();
  const { remove } = useModuleTouchpoints();

  const onQuit = () => {
    state[1]({
      isOpen: false,
      touchpointKey: 0,
    });
  };

  const onConfirm = () => {
    remove(state[0].touchpointKey);
    state[1]({
      isOpen: false,
      touchpointKey: 0,
    });
  };

  if (!state[0].isOpen) return null;

  return (
    <Modal onClose={onQuit}>
      <Modal.Header isDanger>
        {t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_MODAL_CONFIRMATION_REMOVE_TOUCHPOINT_TITLE'
        )}
      </Modal.Header>
      <Modal.Body>
        {t(
          '__PLAN_PAGE_MODULE_TOUCHPOINTS_MODAL_CONFIRMATION_REMOVE_TOUCHPOINT_DESCRIPTION'
        )}
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          <Button isDanger isBasic onClick={onConfirm}>
            {t(
              '__PLAN_PAGE_MODULE_TOUCHPOINTS_MODAL_CONFIRMATION_REMOVE_TOUCHPOINT_CONFIRM'
            )}
          </Button>
        </FooterItem>
        <FooterItem>
          <Button isPrimary isAccent onClick={onQuit}>
            {t(
              '__PLAN_PAGE_MODULE_TOUCHPOINTS_MODAL_CONFIRMATION_REMOVE_TOUCHPOINT_CANCEL'
            )}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose onClick={onQuit} />
    </Modal>
  );
};

export { DeleteTouchpointConfirmationModal };
