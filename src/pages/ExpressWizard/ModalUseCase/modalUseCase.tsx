import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeUseCaseModal, UseCase } from 'src/features/express/expressSlice';
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
import { ScrollingContainer, ModalUseCaseHelp } from './modalUseCaseHelp';
import { ModalUseCaseTabLayout } from './modalUseCaseTabLayout';
import { WizardModel } from '../wizardModel';
import { UseCaseDetails } from './useCaseDetails';

const Body = styled(ModalFullScreen.Body)`
  padding: 0;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ContentCol = styled(Col)`
  padding: 0;
  margin-bottom: 0;
  flex-wrap: nowrap;
  align-items: stretch;
  align-content: stretch;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HelpCol = styled(Col)`
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
  margin-bottom: 0;
  padding: 0;
  height: 100%;
`;

const TextCasesTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.space.xl};
  width: 100%;
  position: sticky;
  top: 0;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: ${({ theme }) => theme.space.xl};
`;

const TextCaseForm = styled(ContainerCard)``;

const PullRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space.md};
`;

const BodyScrollingContainer = styled(ScrollingContainer)`
  padding: 0 ${({ theme }) => theme.space.xl};
  padding-bottom: ${({ theme }) => theme.space.xl};

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar {
      background-color: inherit;
    }
  }
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

  const { values } = formikProps;
  const { use_cases } = values;

  const { isUseCaseModalOpen } = useAppSelector((state) => state.express);

  const useCaseIndex = use_cases
    ? use_cases.findIndex((item) => item.id === currentUseCase.id)
    : 0;

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
                <BodyScrollingContainer>
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
                </BodyScrollingContainer>
              ) : (
                <CenteredContainer>
                  <Paragraph>Empty state</Paragraph>
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
