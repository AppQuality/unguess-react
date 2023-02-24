import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeUseCaseModal } from 'src/features/express/expressSlice';
import {
  Col,
  Grid,
  ModalFullScreen,
  Row,
  ContainerCard,
  theme as globalTheme,
  Button,
  LG,
  Paragraph,
} from '@appquality/unguess-design-system';
import { ReactComponent as EmptyImg } from 'src/assets/modal-use-case-empty.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { FieldArray, FormikProps } from 'formik';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import { ModalUseCaseHeader } from './modalUseCaseHeader';
import { ScrollingContainer, ModalUseCaseHelp } from './modalUseCaseHelp';
import { ModalUseCaseTabLayout } from './modalUseCaseTabLayout';
import { UseCaseDetails } from './useCaseDetails';

const Body = styled(ModalFullScreen.Body)`
  padding: 0;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  max-width: ${({ theme }) => theme.breakpoints.xxl};
  margin: 0 auto;
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
  border-right: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
  margin-bottom: 0;
  padding: 0;
  height: 100%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const TextCasesTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.space.md};
  width: 100%;
  position: sticky;
  top: 0;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.md} 0;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const PullLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.sm};
  }
`;

const EmptyStateTitle = styled(LG)`
  color: ${({ theme }) => theme.colors.primaryHue};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const EmptyStateText = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  }
`;

const StyledModal = styled(ModalFullScreen)`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

export const ModalUseCase = ({
  formikProps,
  currentUseCase,
  setUseCase,
}: {
  formikProps: FormikProps<WizardModel>;
  currentUseCase?: UseCase;
  setUseCase: (item?: UseCase) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { values, validateForm } = formikProps;
  const { use_cases } = values;

  const { isUseCaseModalOpen } = useAppSelector((state) => state.express);

  const useCaseIndex =
    currentUseCase && use_cases && Array.isArray(use_cases) && use_cases.length
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
    <StyledModal onClose={closeModal} focusOnMount={false}>
      <StyledModal.Header
        style={{ backgroundColor: globalTheme.palette.white }}
      >
        <LayoutWrapper isNotBoxed>
          <ModalUseCaseHeader onClose={closeModal} />
        </LayoutWrapper>
      </StyledModal.Header>
      <Body>
        <LayoutWrapper isNotBoxed>
          <Grid style={{ height: '100%' }}>
            <Row style={{ height: '100%' }}>
              <ContentCol xs={12} lg={8}>
                <TextCasesTabs>
                  <ModalUseCaseTabLayout
                    formikProps={formikProps}
                    handleCurrentUseCase={setUseCase}
                    currentUseCase={currentUseCase}
                  />
                </TextCasesTabs>
                <BodyScrollingContainer>
                  <StyledContainerCard>
                    {use_cases && currentUseCase && use_cases.length ? (
                      <>
                        <UseCaseDetails
                          key={`useCaseDetails_k${currentUseCase.id}`}
                          formikProps={formikProps}
                          useCase={currentUseCase}
                          useCaseIndex={useCaseIndex}
                        />
                        <PullLeft style={{ marginTop: globalTheme.space.xxl }}>
                          <FieldArray name="use_cases">
                            {({ remove }) => (
                              <Button
                                themeColor={globalTheme.palette.red[600]}
                                isBasic
                                onClick={() => {
                                  if (
                                    // eslint-disable-next-line no-alert
                                    window.confirm(
                                      t(
                                        '__EXPRESS_WIZARD_CONFIRM_DELETE_USE_CASE'
                                      )
                                    )
                                  ) {
                                    remove(useCaseIndex);

                                    // Set current use case
                                    if (useCaseIndex === 0) {
                                      // If there is at least an other use case next, set it
                                      if (use_cases[useCaseIndex + 1]) {
                                        setUseCase(use_cases[useCaseIndex + 1]);
                                      } else {
                                        // Clear current use case
                                        setUseCase();
                                      }
                                    } else if (useCaseIndex > 0) {
                                      // Set the previous one
                                      setUseCase(use_cases[useCaseIndex - 1]);
                                    }
                                  }
                                }}
                              >
                                <Button.StartIcon>
                                  <TrashIcon />
                                </Button.StartIcon>
                                {t(
                                  '__EXPRESS_2_WIZARD_STEP_HOW_USE_CASE_MODAL_DELETE_USE_CASE_LABEL'
                                )}
                              </Button>
                            )}
                          </FieldArray>
                        </PullLeft>
                      </>
                    ) : (
                      <CenteredContainer>
                        <EmptyImg
                          style={{ marginBottom: globalTheme.space.lg }}
                        />
                        <EmptyStateTitle>
                          {t(
                            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_EMPTY_USE_CASE_LABEL'
                          )}
                        </EmptyStateTitle>
                        <EmptyStateText>
                          {t(
                            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_EMPTY_USE_CASE_DESCRIPTION'
                          )}
                        </EmptyStateText>
                      </CenteredContainer>
                    )}
                  </StyledContainerCard>
                </BodyScrollingContainer>
              </ContentCol>
              <HelpCol xs={12} lg={4}>
                <ModalUseCaseHelp />
              </HelpCol>
            </Row>
          </Grid>
        </LayoutWrapper>
      </Body>
    </StyledModal>
  ) : null;
};
