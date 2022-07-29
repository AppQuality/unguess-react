import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeUseCaseModal } from 'src/features/express/expressSlice';
import {
  Col,
  Grid,
  ModalFullScreen,
  Row,
  Paragraph,
  ContainerCard,
  theme as globalTheme,
  Button,
} from '@appquality/unguess-design-system';

import { FieldArray, FormikProps } from 'formik';

import { ModalUseCaseHeader } from './modalUseCaseHeader';
import { ModalUseCaseHelp } from './modalUseCaseHelp';
import { ModalUseCaseTabLayout } from './modalUseCaseTabLayout';
import { WizardModel } from '../wizardModel';
import { UseCaseDetails } from './useCaseDetails';
import { UseCase } from '../fields/how';

const Body = styled(ModalFullScreen.Body)`
  padding: 0;
`;

const ContentCol = styled(Col)`
  padding: ${({ theme }) => theme.space.xl};
  margin-bottom: 0;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  display: flex;
  flex-direction: column;
`;

const HelpCol = styled(Col)`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
  margin-bottom: 0;
  padding: 0;
`;

const TextCasesTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.space.md};
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: ${({ theme }) => theme.space.xl};
`;

const TextCaseForm = styled(ContainerCard)`
  margin-top: ${({ theme }) => theme.space.lg};
`;
const PullRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space.md};
`;

export const ModalUseCase = ({
  formikProps,
  currentUseCase,
  setUseCase,
}: {
  formikProps: FormikProps<WizardModel>;
  currentUseCase: UseCase;
  setUseCase: (item: UseCase) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { values, validateForm } = formikProps;
  const { use_cases } = values;

  const { isUseCaseModalOpen } = useAppSelector((state) => state.express);

  const useCaseIndex = use_cases
    ? use_cases.findIndex((item) => item.id === currentUseCase.id)
    : 0;

  const closeModal = () => {
    validateForm().then(() => {
      // if (!errors || !errors.use_cases) {
      dispatch(closeUseCaseModal());
      // }
    });
  };

  return isUseCaseModalOpen ? (
    <ModalFullScreen onClose={closeModal}>
      <ModalFullScreen.Header>
        <ModalUseCaseHeader onClose={closeModal} />
      </ModalFullScreen.Header>
      <Body>
        <Grid style={{ height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <ContentCol xs={8}>
              <TextCasesTabs>
                <ModalUseCaseTabLayout
                  formikProps={formikProps}
                  handleCurrentUseCase={(useCase) => setUseCase(useCase)}
                  currentUseCase={currentUseCase}
                />
              </TextCasesTabs>
              {use_cases && use_cases.length ? (
                <TextCaseForm>
                  <UseCaseDetails
                    formikProps={formikProps}
                    useCase={currentUseCase}
                    useCaseIndex={useCaseIndex}
                  />
                  <PullRight>
                    <FieldArray name="use_cases">
                      {({ remove }) => (
                        <Button
                          themeColor={globalTheme.palette.red[600]}
                          onClick={() => {
                            remove(useCaseIndex);

                            // Set current use case
                            if (useCaseIndex === 0) {
                              setUseCase(use_cases[useCaseIndex + 1]);
                            } else {
                              setUseCase(use_cases[useCaseIndex - 1]);
                            }
                          }}
                        >
                          {t(
                            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_DELETE_USE_CASE_LABEL'
                          )}
                        </Button>
                      )}
                    </FieldArray>
                  </PullRight>
                </TextCaseForm>
              ) : (
                <CenteredContainer>
                  <Paragraph>Empty state 🚨</Paragraph>
                </CenteredContainer>
              )}
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
