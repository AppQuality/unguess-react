import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeUseCaseModal } from 'src/features/express/expressSlice';
import {
  Col,
  Grid,
  ModalFullScreen,
  Row,
  ContainerCard,
} from '@appquality/unguess-design-system';
import { ModalUseCaseHeader } from './ModalUseCaseHeader';
import { ModalUseCaseHelp } from './ModalUseCaseHelp';

const Body = styled(ModalFullScreen.Body)`
  padding: 0;
`;

const ContentCol = styled(Col)`
  padding: ${({ theme }) => theme.space.xl};
`;

const HelpCol = styled(Col)`
  padding: ${({ theme }) => theme.space.xl};
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
`;

const TextCasesTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.space.md};
`;

const TextCaseForm = styled(ContainerCard)`
  margin-top: ${({ theme }) => theme.space.lg};
`;

export const ModalUseCase = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { isUseCaseModalOpen } = useAppSelector((state) => state.express);

  return isUseCaseModalOpen ? (
    <ModalFullScreen
      onClose={() => {
        dispatch(closeUseCaseModal());
      }}
    >
      <ModalFullScreen.Header>
        <ModalUseCaseHeader />
      </ModalFullScreen.Header>
      <Body>
        <Grid>
          <Row>
            <ContentCol xs={8}>
              <TextCasesTabs>
                <span>TEXT CASES</span>
              </TextCasesTabs>
              <TextCaseForm>
                <span>FORM</span>
              </TextCaseForm>
            </ContentCol>
            <HelpCol xs={4}>
              <ModalUseCaseHelp />
            </HelpCol>
          </Row>
        </Grid>
      </Body>
    </ModalFullScreen>
  ) : null;
};
