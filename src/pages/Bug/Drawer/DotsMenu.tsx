import { Button, Modal } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as DotsIcon } from 'src/assets/icons/dots-icon.svg';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { appTheme } from 'src/app/theme';
// import { ColorPicker } from './ColorPicker';

const StyledModal = styled(Modal)`
  left: auto;
  right: auto;
  top: auto;
  bottom: auto;
  width: 200px;
`;

const StyledBody = styled(Modal.Body)`
  padding: ${({ theme }) => theme.space.sm};
`;

const DotsButton = styled(DotsIcon)`
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const DotsMenu = () => {
  const { t } = useTranslation();
  const [isDotsMenuOpen, setIsDotsMenuOpen] = useState(false);

  return (
    <>
      <DotsButton onClick={() => setIsDotsMenuOpen(true)} />
      {isDotsMenuOpen && (
        <StyledModal
          backdropProps={{
            style: {
              backgroundColor: 'transparent',
            },
          }}
          onClose={() => setIsDotsMenuOpen(false)}
        >
          <StyledBody>
            <StyledButton
              isBasic
              isStretched
              onClick={() => setIsDotsMenuOpen(false)}
            >
              {/* <Button.StartIcon>
                                <ColorPicker />
                            </Button.StartIcon> */}
              {t('__BUGS_PAGE_CUSTOM_STATUS_DRAWER_EDIT_CUSTOM_STATUS_BUTTON')}
            </StyledButton>
            <StyledButton
              isBasic
              isStretched
              onClick={() => setIsDotsMenuOpen(false)}
              style={{ color: appTheme.palette.red[500] }}
            >
              <Button.StartIcon>
                <TrashIcon color={appTheme.palette.red[500]} />
              </Button.StartIcon>
              {t(
                '__BUGS_PAGE_CUSTOM_STATUS_DRAWER_DELETE_CUSTOM_STATUS_BUTTON'
              )}
            </StyledButton>
          </StyledBody>
        </StyledModal>
      )}
    </>
  );
};
