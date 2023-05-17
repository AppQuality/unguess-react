import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  XL,
  Button,
  Anchor,
  IconButton,
} from '@appquality/unguess-design-system';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-circle.svg';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/chevron-left-icon.svg';
import useWindowSize from 'src/hooks/useWindowSize';
import { appTheme } from 'src/app/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
`;

const ModalTitle = styled(XL)`
  color: ${({ theme }) => theme.palette.grey[800]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: ${({ theme }) => theme.space.xxs} 0;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.space.xs};
`;

export const ModalUseCaseHeader = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();

  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.md, 10);

  return (
    <Container>
      <BackContainer>
        <IconButton onClick={onClose}>
          <ArrowLeft width={30} height={30} />
        </IconButton>
      </BackContainer>
      <TitleContainer>
        <Anchor onClick={onClose}>
          {t('__WIZARD_EXPRESS_3_USE_CASE_MODAL_PRE_TITLE')}
        </Anchor>
        <ModalTitle>{t('__WIZARD_EXPRESS_USE_CASE_MODAL_TITLE')}</ModalTitle>
      </TitleContainer>
      {width > breakpointSm && (
        <Button
          isPrimary
          onClick={onClose}
          isAccent
          style={{ marginLeft: 'auto' }}
        >
          <Button.StartIcon>
            <CheckIcon />
          </Button.StartIcon>
          {t('__WIZARD_EXPRESS_3_USE_CASE_MODAL_HEADER_SAVE_BUTTON')}
        </Button>
      )}
    </Container>
  );
};
