import { Card, Span } from '@appquality/unguess-design-system';
import { FieldArray, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { EXPRESS_USE_CASES_LIMIT } from 'src/constants';
import { getLocalizedStrapiData } from 'src/common/utils';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import i18n from 'i18next';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { emptyUseCase, UseCase } from 'src/pages/ExpressWizard/fields/how';

const Container = styled.div`
  padding: 0 ${({ theme }) => theme.space.md};
  width: 100%;
`;

const CardTitle = styled(Span)``;

const UseCaseCard = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  color: ${({ theme }) => theme.colors.primaryHue};
  padding: 0;
  height: ${({ theme }) => theme.space.base * 15}px;
  width: 20%;
  cursor: pointer;
  user-select: none;

  &.current-card {
    background-color: ${({ theme }) => theme.colors.primaryHue};
    border: 2px solid ${({ theme }) => theme.colors.primaryHue};
    color: white;
  }

  &.add-card {
    background-color: ${({ theme }) => theme.palette.blue[100]};
    color: ${({ theme }) => theme.palette.grey[600]};
    border: 2px dashed ${({ theme }) => theme.palette.grey[300]};

    svg {
      margin-bottom: ${({ theme }) => theme.space.base}px;
      margin-right: ${({ theme }) => theme.space.xs};

      @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin: 0;
      }
    }
  }

  &.empty-card {
    background-color: transparent;
    color: ${({ theme }) => theme.palette.grey[500]};
    border: 2px dashed ${({ theme }) => theme.palette.grey[300]};
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${CardTitle} {
      display: none;
    }
  }
`;

const UseCasesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.space.xxl};
  width: 100%;

  ${UseCaseCard} {
    margin: 0 ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
    &:first-child {
      margin-left: 0;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

export const ModalUseCaseTabLayout = ({
  formikProps,
  handleCurrentUseCase,
  currentUseCase,
}: {
  formikProps: FormikProps<WizardModel>;
  handleCurrentUseCase: (useCase: UseCase) => void;
  currentUseCase?: UseCase;
}) => {
  const { t } = useTranslation();
  const { values, validateForm } = formikProps;
  const [highestUseCaseId, setHighestUseCaseId] = useState<number>(0);
  const { use_cases } = values;

  const remainingSpots =
    EXPRESS_USE_CASES_LIMIT - (use_cases ? use_cases.length : 0);

  const { expressTypeId } = useAppSelector((state) => state.express);

  const { data } = useGeti18nExpressTypesByIdQuery({
    id: expressTypeId?.toString() || '0',
    populate: {
      localizations: {
        populate: '*',
      },
    },
  });

  const expressData = getLocalizedStrapiData({
    item: data,
    language: i18n.language,
  });

  useEffect(() => {
    if (Array.isArray(use_cases)) {
      const highestUCId = use_cases.reduce(
        (highestId, useCase) => Math.max(highestId, useCase.id),
        0
      );
      setHighestUseCaseId(highestUCId);
    }
  }, [use_cases]);

  return (
    <Container>
      <FieldArray name="use_cases">
        {({ push }) => (
          <UseCasesWrapper>
            {use_cases &&
              Array.isArray(use_cases) &&
              use_cases.map((useCase: UseCase, index: number) => (
                <UseCaseCard
                  {...(currentUseCase &&
                    currentUseCase.id === useCase.id && {
                      className: 'current-card',
                    })}
                  onClick={() => handleCurrentUseCase(useCase)}
                >
                  <CardTitle>
                    {t(
                      '__EXPRESS_4_WIZARD_STEP_HOW_USE_CASE_MODAL_USE_CASE_LABEL'
                    )}{' '}
                  </CardTitle>
                  {index + 1}
                </UseCaseCard>
              ))}
            {use_cases && use_cases.length < EXPRESS_USE_CASES_LIMIT && (
              <UseCaseCard
                className="add-card"
                onClick={() => {
                  validateForm().then(() => {
                    push({
                      ...emptyUseCase,
                      ...(expressData &&
                        expressData.default_use_case_text && {
                          description: expressData.default_use_case_text,
                        }),
                      id: highestUseCaseId + 1,
                    });

                    handleCurrentUseCase({
                      ...emptyUseCase,
                      ...(expressData &&
                        expressData.default_use_case_text && {
                          description: expressData.default_use_case_text,
                        }),
                      id: highestUseCaseId + 1,
                    });
                  });
                }}
              >
                <AddIcon />
                <CardTitle>
                  {t(
                    '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_ADD_USE_CASE_BUTTON'
                  )}
                </CardTitle>
              </UseCaseCard>
            )}
            {remainingSpots > 0 &&
              [...Array(remainingSpots - 1)].map(() => (
                <UseCaseCard isFloating={false} className="empty-card">
                  <CardTitle>
                    {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_EMPTY_LABEL')}
                  </CardTitle>
                </UseCaseCard>
              ))}
          </UseCasesWrapper>
        )}
      </FieldArray>
    </Container>
  );
};
