import {
  Modal,
  FooterItem,
  Button,
  ModalClose,
  Paragraph,
  Checkbox,
  Label,
} from '@appquality/unguess-design-system';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import styled from 'styled-components';
import { ReactComponent as AlertIcon } from 'src/assets/icons/alert-icon.svg';
import { useTranslation } from 'react-i18next';
import { Field } from '@zendeskgarden/react-forms';
import { appTheme } from 'src/app/theme';
import { useState } from 'react';

const DangerHeader = styled(Modal.Header)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${({ theme }) => theme.space.xs};
  padding-left: ${({ theme }) => theme.space.xs};
  gap: ${({ theme }) => theme.space.xs};
  ${(props) => retrieveComponentStyles('text.danger', props)};
`;

const RemoveConfirmModal = ({
  handleCancel,
  onClose,
}: {
  handleCancel: () => void;
  onClose?: (includeShared: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [includeShared, setIncludeShared] = useState(false);

  return (
    <Modal isLarge onClose={handleCancel}>
      <DangerHeader>
        <AlertIcon />
        {t('__PERMISSION_SETTINGS_REMOVE_CONFIRM_MODAL_HEADER')}
      </DangerHeader>
      <Modal.Body>
        <Paragraph>
          {t('__PERMISSION_SETTINGS_REMOVE_CONFIRM_MODAL_MESSAGE')}
        </Paragraph>
        <Field style={{ marginTop: appTheme.space.md }}>
          <Checkbox
            checked={includeShared}
            onChange={() => setIncludeShared(!includeShared)}
          >
            <Label isRegular>
              {t('__PERMISSION_SETTINGS_REMOVE_CONFIRM_MODAL_DEEP_CLEAN_LABEL')}
            </Label>
          </Checkbox>
        </Field>
      </Modal.Body>
      <Modal.Footer>
        <FooterItem>
          {onClose && (
            <Button isDanger isBasic onClick={() => onClose(includeShared)}>
              {t(
                '__PERMISSION_SETTINGS_REMOVE_CONFIRM_MODAL_CONTINUE_BUTTON_TEXT'
              )}
            </Button>
          )}
        </FooterItem>
        <FooterItem>
          <Button isPrimary isAccent onClick={handleCancel}>
            {t('__PERMISSION_SETTINGS_REMOVE_CONFIRM_MODAL_CANCEL_BUTTON_TEXT')}
          </Button>
        </FooterItem>
      </Modal.Footer>
      <ModalClose aria-label="Close modal" />
    </Modal>
  );
};

export default RemoveConfirmModal;
