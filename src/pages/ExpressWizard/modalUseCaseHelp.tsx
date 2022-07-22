import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeUseCaseModal } from 'src/features/express/expressSlice';
import {
  Logo,
  XXL,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { ReactComponent as ArrowLeftIcon } from 'src/assets/icons/chevron-left-icon.svg';
import useWindowSize from 'src/hooks/useWindowSize';

const Container = styled.div``;

export const ModalUseCaseHelp = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  return <Container>INFO</Container>;
};
