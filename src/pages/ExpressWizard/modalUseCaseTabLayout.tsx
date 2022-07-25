import { Card } from '@appquality/unguess-design-system';
import { FieldArray, Form, Formik, FormikProps } from 'formik';
import styled from 'styled-components';
import {
  UseCase,
  addUseCase,
  removeUseCase,
  emptyUseCase,
  clearUseCases,
} from 'src/features/express/expressSlice';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { useTranslation } from 'react-i18next';
import { EXPRESS_USE_CASES_LIMIT } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect } from 'react';

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
  background-color: ${({ theme }) => theme.colors.primaryHue};
  border: 1px solid ${({ theme }) => theme.colors.primaryHue};
  color: white;
  padding: 0;
  height: ${({ theme }) => theme.space.base * 20}px;
  width: 20%;
  margin: 0 ${({ theme }) => theme.space.xs};
  cursor: pointer;
  user-select: none;

  &.add-card {
    background-color: ${({ theme }) => theme.palette.blue[100]};
    color: ${({ theme }) => theme.palette.grey[600]};
    border: 1px dashed ${({ theme }) => theme.palette.grey[500]};

    svg {
      margin-bottom: ${({ theme }) => theme.space.base}px;
    }
  }

  &:focus {
    outline: none;
  }
`;

export const ModalUseCaseTabLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { useCases } = useAppSelector((state) => state.express);

  console.log('state.express.useCases', useCases);

  return (
    <Container>
      <Formik
        initialValues={{ useCases }}
        onSubmit={(values, { setSubmitting }) =>
          alert(JSON.stringify(values, null, 2))
        }
      >
        {(formProps: FormikProps<any>) => {
          console.log('formProps.values', formProps.values);

          return (
            <Form>
              <FieldArray name="useCases">
                {({ push, remove, insert, replace }) => (
                  <UseCasesWrapper>
                    {formProps.values.useCases.length > 0 &&
                      formProps.values.useCases.map(
                        (useCase: UseCase, index: number) => (
                          <UseCaseCard
                            onClick={() => {
                              console.log('useCase', useCase);
                            }}
                          >
                            {t(
                              '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_USE_CASE_LABEL'
                            )}{' '}
                            {index + 1}
                          </UseCaseCard>
                        )
                      )}
                    {formProps.values.useCases.length <
                      EXPRESS_USE_CASES_LIMIT && (
                      <UseCaseCard
                        className="add-card"
                        onClick={() => {
                          push(emptyUseCase);
                          dispatch(addUseCase(emptyUseCase));
                        }}
                      >
                        <AddIcon />
                        {t(
                          '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_ADD_USE_CASE_BUTTON'
                        )}
                      </UseCaseCard>
                    )}
                  </UseCasesWrapper>
                )}
              </FieldArray>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
