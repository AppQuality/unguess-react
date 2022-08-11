import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  Logo,
  XXL,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { ReactComponent as ArrowLeftIcon } from 'src/assets/icons/chevron-left-icon.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ModalTitle = styled(XXL)`
  color: ${({ theme }) => theme.colors.primaryHue};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const Back = styled(ArrowLeftIcon)`
  cursor: pointer;
`;

export const ModalUseCaseHeader = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Back onClick={onClose} />
      <Logo
        type="icon"
        size={25}
        style={{
          marginRight: globalTheme.space.md,
          marginLeft: globalTheme.space.sm,
        }}
      />
      <ModalTitle>{t('__WIZARD_EXPRESS_USE_CASE_MODAL_TITLE')}</ModalTitle>
    </Container>
  );
};
