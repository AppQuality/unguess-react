import { Card } from '@appquality/unguess-design-system';
import { FieldArray, Form, Formik, FormikProps } from 'formik';
import styled from 'styled-components';
import {
  UseCase,
  addUseCase,
  emptyUseCase,
  setCurrentUseCase,
} from 'src/features/express/expressSlice';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { useTranslation } from 'react-i18next';
import { EXPRESS_USE_CASES_LIMIT } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.space.md};
  width: 100%;
`;

const UseCasesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.space.md};
  width: 100%;
`;

const UseCaseCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  color: ${({ theme }) => theme.colors.primaryHue};
  padding: 0;
  height: ${({ theme }) => theme.space.base * 20}px;
  width: 20%;
  margin: 0 ${({ theme }) => theme.space.xs};
  cursor: pointer;
  user-select: none;

  &.current-card {
    background-color: ${({ theme }) => theme.colors.primaryHue};
    border: 1px solid ${({ theme }) => theme.colors.primaryHue};
    color: white;
  }

  &.add-card {
    background-color: ${({ theme }) => theme.palette.blue[100]};
    color: ${({ theme }) => theme.palette.grey[600]};
    border: 1px dashed ${({ theme }) => theme.palette.grey[500]};

    svg {
      margin-bottom: ${({ theme }) => theme.space.base}px;
    }
  }

  &.empty-card {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.grey[500]};
    border: 1px dashed ${({ theme }) => theme.palette.grey[500]};
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }
`;

export const ModalUseCaseTabLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { useCases, currentUseCase } = useAppSelector((state) => state.express);
  let highestUseCaseId = 0;

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{ useCases }}
        onSubmit={() => {}}
      >
        {(formProps: FormikProps<any>) => (
          <Form>
            <FieldArray name="useCases">
              {({ push, remove }) => (
                <UseCasesWrapper>
                  {formProps.values.useCases.length > 0 &&
                    formProps.values.useCases.map(
                      (useCase: UseCase, index: number) => {
                        // Update the highest use case id
                        if (useCase.id > highestUseCaseId) {
                          highestUseCaseId = useCase.id;
                        }

                        return (
                          <UseCaseCard
                            {...(currentUseCase &&
                              currentUseCase.id === useCase.id && {
                                className: 'current-card',
                              })}
                            onClick={() => {
                              dispatch(setCurrentUseCase(useCase));
                            }}
                          >
                            {t(
                              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_USE_CASE_LABEL'
                            )}{' '}
                            {index + 1}
                          </UseCaseCard>
                        );
                      }
                    )}
                  {formProps.values.useCases.length <
                    EXPRESS_USE_CASES_LIMIT && (
                    <UseCaseCard
                      className="add-card"
                      onClick={() => {
                        push({
                          ...emptyUseCase,
                          id: highestUseCaseId + 1,
                        });
                        dispatch(
                          addUseCase({
                            ...emptyUseCase,
                            id: highestUseCaseId + 1,
                          })
                        );
                        dispatch(
                          setCurrentUseCase({
                            ...emptyUseCase,
                            id: highestUseCaseId + 1,
                          })
                        );
                      }}
                    >
                      <AddIcon />
                      {t(
                        '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_ADD_USE_CASE_BUTTON'
                      )}
                    </UseCaseCard>
                  )}
                  {EXPRESS_USE_CASES_LIMIT - formProps.values.useCases.length >
                    0 &&
                    [
                      ...Array(
                        EXPRESS_USE_CASES_LIMIT -
                          formProps.values.useCases.length -
                          1
                      ),
                    ].map(() => (
                      <UseCaseCard isFloating={false} className="empty-card">
                        {t(
                          '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_EMPTY_LABEL'
                        )}
                      </UseCaseCard>
                    ))}
                </UseCasesWrapper>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
