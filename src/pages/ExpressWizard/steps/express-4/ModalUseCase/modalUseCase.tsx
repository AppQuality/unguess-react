import {
  Col,
  Grid,
  ModalFullScreen,
  Row,
} from '@appquality/unguess-design-system';
import { FormikProps, useFormikContext } from 'formik';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { closeUseCaseModal } from 'src/features/express/expressSlice';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';
import { ModalUseCaseHeader } from './modalUseCaseHeader';
import { ModalUseCaseHelp } from './modalUseCaseHelp';
import { ModalUseCaseTabLayout } from './modalUseCaseTabLayout';
import { ModalUseCaseBody } from './modalUseCaseBody';

const Body = styled(ModalFullScreen.Body)`
  padding: 0;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentCol = styled(Col)`
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;

const HelpCol = styled(Col)`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-right: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
  margin-bottom: 0;
  height: 100%;
  position: sticky;
  top: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const TextCasesTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.space.md} 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f6f6f8;
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  padding-left: calc(
    ${({ theme }) => theme.space.lg} + ${({ theme }) => theme.space.xxl}
  );
  margin-bottom: ${({ theme }) => theme.space.lg};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.md} 0;
  }
`;

const StyledModal = styled(ModalFullScreen)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const ModalBodyLayout = styled(LayoutWrapper)`
  padding: 0;
`;

export const ModalUseCase = ({
  currentUseCase,
  setUseCase,
}: {
  currentUseCase?: UseCase;
  setUseCase: (item?: UseCase) => void;
}) => {
  const dispatch = useAppDispatch();
  const { validateForm } = useFormikContext<WizardModel>();
  const { isUseCaseModalOpen } = useAppSelector((state) => state.express);

  const closeModal = () => {
    validateForm().then(() => {
      dispatch(closeUseCaseModal());
    });
  };

  return isUseCaseModalOpen ? (
    <StyledModal onClose={closeModal} focusOnMount={false}>
      <StyledModal.Header style={{ backgroundColor: appTheme.palette.white }}>
        <LayoutWrapper isNotBoxed>
          <ModalUseCaseHeader onClose={closeModal} />
        </LayoutWrapper>
      </StyledModal.Header>
      <Body>
        <ModalBodyLayout isNotBoxed>
          <Grid style={{ height: '100%' }}>
            <Row style={{ height: '100%' }}>
              <ContentCol xs={12} lg={8}>
                <TextCasesTabs>
                  <ModalUseCaseTabLayout
                    handleCurrentUseCase={setUseCase}
                    currentUseCase={currentUseCase}
                  />
                </TextCasesTabs>
                <ModalUseCaseBody
                  currentUseCase={currentUseCase}
                  setUseCase={setUseCase}
                />
              </ContentCol>
              <HelpCol xs={12} lg={4}>
                <ModalUseCaseHelp />
              </HelpCol>
            </Row>
          </Grid>
        </ModalBodyLayout>
      </Body>
    </StyledModal>
  ) : null;
};
