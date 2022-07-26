import {
  Card,
  ContainerCard,
  Paragraph,
  SM,
  Span,
  Textarea,
  theme as globalTheme,
  XL,
  XXL,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { ReactComponent as RightArrow } from 'src/assets/icons/chevron-right-icon.svg';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useTranslation } from 'react-i18next';
import {
  addUseCase,
  emptyUseCase,
  openUseCaseModal,
  setCurrentUseCase,
  UseCase,
} from 'src/features/express/expressSlice';
import { EXPRESS_USE_CASES_LIMIT } from 'src/constants';
import { WizardModel } from '../wizardModel';
import { CardDivider } from '../cardDivider';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.grey[800]};
  span {
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledLanguageTitle = styled(XL)`
  padding-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const UseCaseCardButton = styled(Card)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;

const UseCaseCardButtonText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 ${({ theme }) => theme.space.base * 4}px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const UseCaseCardButtonDescription = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const UseCaseEditLabel = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.primaryHue};
  margin-right: ${({ theme }) => theme.space.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const HowStep = ({
  errors,
  values,
  ...props
}: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { useCases } = useAppSelector((state) => state.express);
  let highestUseCaseId = 0;

  return (
    <>
      <ContainerCard>
        <StepTitle>
          <Span isBold>{t('__EXPRESS_WIZARD_STEP_HOW_LABEL')}</Span>&nbsp;
          {t('__EXPRESS_WIZARD_STEP_HOW_LABEL_EXTRA')}
        </StepTitle>
        <Paragraph>{t('__EXPRESS_WIZARD_STEP_HOW_SUBTITLE')}</Paragraph>
        <CardDivider />
        <StyledFormField>
          <StyledLanguageTitle>
            {t('__EXPRESS_WIZARD_STEP_HOW_FIELD_DESCRIPTION_TITLE')}
            <Span style={{ color: globalTheme.colors.dangerHue }}>*</Span>
          </StyledLanguageTitle>
          <Paragraph>
            {t('__EXPRESS_WIZARD_STEP_HOW_FIELD_DESCRIPTION_DESCRIPTION')}
          </Paragraph>
          <Textarea
            rows={5}
            placeholder={t(
              '__EXPRESS_WIZARD_STEP_HOW_FIELD_DESCRIPTION_PLACEHOLDER'
            )}
            isResizable
            style={{ marginTop: globalTheme.space.md }}
            {...props.getFieldProps('test_description')}
          />
        </StyledFormField>
      </ContainerCard>
      {useCases.map((useCase: UseCase, index: number) => {
        // Update the highest use case id
        if (useCase.id > highestUseCaseId) {
          highestUseCaseId = useCase.id;
        }

        return (
          <UseCaseCardButton
            className="use-case-edit-card-button"
            onClick={() => {
              dispatch(setCurrentUseCase(useCase));
              dispatch(openUseCaseModal());
            }}
            style={{ marginTop: globalTheme.space.md }}
          >
            <UseCaseCardButtonText>
              <UseCaseCardButtonDescription>
                {index + 1}/{EXPRESS_USE_CASES_LIMIT}{' '}
                {t('__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_USE_CASE_LABEL')}
              </UseCaseCardButtonDescription>
              <XL>{useCase.title}</XL>
            </UseCaseCardButtonText>
            <UseCaseEditLabel>
              {t('__EXPRESS_WIZARD_STEP_HOW_EDIT_USE_CASE_CARD_LABEL')}
            </UseCaseEditLabel>
            <RightArrow />
          </UseCaseCardButton>
        );
      })}
      {EXPRESS_USE_CASES_LIMIT - useCases.length > 0 && (
        <UseCaseCardButton
          className="use-case-add-card-button"
          onClick={() => {
            dispatch(addUseCase({ ...emptyUseCase, id: highestUseCaseId + 1 }));
            dispatch(
              setCurrentUseCase({ ...emptyUseCase, id: highestUseCaseId + 1 })
            );
            dispatch(openUseCaseModal());
          }}
          style={{ marginTop: globalTheme.space.md }}
        >
          <AddIcon />
          <UseCaseCardButtonText>
            <XL>{t('__EXPRESS_WIZARD_STEP_HOW_ADD_USE_CASE_CARD_TITLE')}</XL>
            <UseCaseCardButtonDescription>
              {t('__EXPRESS_WIZARD_STEP_HOW_ADD_USE_CASE_CARD_SUBTITLE')}
            </UseCaseCardButtonDescription>
          </UseCaseCardButtonText>
          <RightArrow />
        </UseCaseCardButton>
      )}
    </>
  );
};

export const HowStepValidationSchema = Yup.object().shape({});
