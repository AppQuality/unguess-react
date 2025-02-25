import {
  Card,
  Span,
  getColor,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FieldArray, useFormikContext } from 'formik';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/app/hooks';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { getLocalizedStrapiData } from 'src/common/utils';
import { EXPRESS_USE_CASES_LIMIT } from 'src/constants';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import { UseCase, emptyUseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';

const Container = styled.div`
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
  ${(props) => retrieveComponentStyles('text.primary', props)};
  padding: 0;
  height: ${({ theme }) => theme.space.base * 15}px;
  width: 20%;
  cursor: pointer;
  user-select: none;

  &.current-card {
    background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
    border: 2px solid ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
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
    margin-right: ${({ theme }) => theme.space.sm};
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0;
  }
`;

export const ModalUseCaseTabLayout = ({
  handleCurrentUseCase,
  currentUseCase,
}: {
  handleCurrentUseCase: (useCase: UseCase) => void;
  currentUseCase?: UseCase;
}) => {
  const { t } = useTranslation();
  const { values, validateForm } = useFormikContext<WizardModel>();
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
                      '__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_USE_CASE_LABEL'
                    )}{' '}
                    {index + 1}
                  </CardTitle>
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
