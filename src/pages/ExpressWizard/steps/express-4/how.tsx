import {
  Card,
  ContainerCard,
  Label,
  Paragraph,
  SM,
  Span,
  Textarea,
  XL,
  XXL,
  Tag,
} from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-water-circle-add-icon.svg';
import { ReactComponent as RightArrow } from 'src/assets/icons/chevron-right-icon.svg';
import { ReactComponent as WarningIcon } from 'src/assets/icons/warning-icon.svg';
import { ReactComponent as SuccessIcon } from 'src/assets/icons/success-icon.svg';
import { ReactComponent as ErrorIcon } from 'src/assets/icons/error-icon.svg';
import { ReactComponent as UserTaskIcon } from 'src/assets/icons/user-task-icon.svg';
import { ReactComponent as ChatIcon } from 'src/assets/icons/chat-icon.svg';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Trans, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { openUseCaseModal } from 'src/features/express/expressSlice';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import { getLocalizedStrapiData } from 'src/common/utils';
import { EXPRESS_USE_CASES_LIMIT } from 'src/constants';
import { appTheme } from 'src/app/theme';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { CardDivider } from 'src/pages/ExpressWizard/cardDivider';
import { retrieveComponentStyles } from '@zendeskgarden/react-theming';
import { emptyUseCase, UseCase } from 'src/pages/ExpressWizard/fields/how';
import { ModalUseCase } from './ModalUseCase/modalUseCase';
import { HowLoading } from './howLoading';

const StepTitle = styled(XXL)`
  margin-bottom: ${({ theme }) => theme.space.base * 2}px;
  span {
    ${(props) => retrieveComponentStyles('text.primary', props)};
  }
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const UseCaseCardButton = styled(Card)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadii.xl};
`;

const UseCaseCardButtonText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 ${({ theme }) => theme.space.base * 4}px;
`;

const UseCaseCardButtonDescription = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const WarningMessage = styled(SM)`
  color: ${({ theme }) => theme.palette.yellow[800]};
`;

const UseCaseEditLabel = styled(Paragraph)`
  display: flex;
  align-items: center;
  svg {
    margin-right: ${({ theme }) => theme.space.sm};
  }
  ${(props) => retrieveComponentStyles('text.primary', props)};
  margin-right: ${({ theme }) => theme.space.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.sm};

  > * {
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;

export const HowStep = (props: FormikProps<WizardModel>) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [currentUseCase, setCurrentUseCase] = useState<UseCase | undefined>();
  const [highestUseCaseId, setHighestUseCaseId] = useState<number>(0);
  const { values, getFieldProps, setValues, validateForm, errors, touched } =
    props;
  const { use_cases } = values;

  const { expressTypeId } = useAppSelector((state) => state.express);

  const { data, isLoading } = useGeti18nExpressTypesByIdQuery({
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

  useEffect(() => {
    if (Array.isArray(use_cases) && use_cases.length > 0) {
      validateForm();
    }
  }, []);

  if (isLoading) {
    return <HowLoading />;
  }

  return (
    <>
      <ModalUseCase
        formikProps={props}
        currentUseCase={currentUseCase}
        setUseCase={setCurrentUseCase}
      />

      <ContainerCard>
        <StepTitle>
          <Span isBold>{t('__EXPRESS_WIZARD_STEP_HOW_LABEL')}</Span>&nbsp;
          {t('__EXPRESS_WIZARD_STEP_HOW_LABEL_EXTRA')}
        </StepTitle>
        <Paragraph>
          {t('__EXPRESS_WIZARD_STEP_HOW_UNMODERATED_SUBTITLE')}
        </Paragraph>

        <CardDivider />

        <StyledFormField>
          <TagsContainer>
            <Tag size="large">
              <Tag.Avatar>
                <UserTaskIcon />
              </Tag.Avatar>
              <Trans
                i18nKey="__EXPRESS_WIZARD_STEP_HOW_TAG_USER_TASKS_LABEL"
                components={{
                  span: <Span isBold />,
                }}
                defaults="N° User Tasks <span>{{ express_use_cases_limit }}</span>"
                values={{ express_use_cases_limit: EXPRESS_USE_CASES_LIMIT }}
              />
            </Tag>
            <Tag size="large">
              <Tag.Avatar>
                <ChatIcon />
              </Tag.Avatar>
              <Span>
                {t('__EXPRESS_WIZARD_STEP_HOW_TAG_THINK_ALOUD_LABEL')}
              </Span>
            </Tag>
          </TagsContainer>
        </StyledFormField>

        <StyledFormField>
          <Label>
            {t('__EXPRESS_WIZARD_STEP_HOW_FIELD_GOAL_TITLE')}
            <Span style={{ color: appTheme.components.text.dangerColor }}>
              *
            </Span>
          </Label>
          <Paragraph>
            {t('__EXPRESS_WIZARD_STEP_HOW_FIELD_GOAL_DESCRIPTION')}
          </Paragraph>
          <Textarea
            rows={5}
            placeholder={t('__EXPRESS_WIZARD_STEP_HOW_FIELD_GOAL_PLACEHOLDER')}
            isResizable
            style={{ marginTop: appTheme.space.xs }}
            {...getFieldProps('test_description')}
            {...(errors.test_description && { validation: 'error' })}
            onBlur={() => validateForm()}
          />
          {errors.test_description && (
            <HelpTextMessage validation="error">
              {errors.test_description}
            </HelpTextMessage>
          )}
        </StyledFormField>
      </ContainerCard>
      {use_cases &&
        use_cases.length > 0 &&
        use_cases.map((useCase: UseCase, index: number) => (
          <UseCaseCardButton
            className="use-case-edit-card-button"
            onClick={() => {
              setCurrentUseCase(useCase);
              dispatch(openUseCaseModal());
            }}
            style={{ marginTop: appTheme.space.md }}
          >
            {errors && errors.use_cases && errors.use_cases[useCase.id - 1] ? (
              <WarningIcon />
            ) : (
              <SuccessIcon />
            )}
            <UseCaseCardButtonText>
              <UseCaseCardButtonDescription>
                {index + 1}/{EXPRESS_USE_CASES_LIMIT}{' '}
                {t('__EXPRESS_4_WIZARD_STEP_HOW_USE_CASE_MODAL_USE_CASE_LABEL')}
              </UseCaseCardButtonDescription>
              <XL isBold>{useCase.title}</XL>
              {errors &&
                errors.use_cases &&
                errors.use_cases[useCase.id - 1] && (
                  <WarningMessage>
                    {t(
                      '__EXPRESS_4_WIZARD_STEP_HOW_EDIT_USE_CASE_CARD_INCOMEPLETE_LABEL'
                    )}
                  </WarningMessage>
                )}
            </UseCaseCardButtonText>
            <UseCaseEditLabel>
              {errors && errors.use_cases && errors.use_cases[useCase.id - 1]
                ? t(
                    '__EXPRESS_WIZARD_STEP_HOW_EDIT_USE_CASE_CARD_LABEL_INCOMPLETE'
                  )
                : t('__EXPRESS_WIZARD_STEP_HOW_EDIT_USE_CASE_CARD_LABEL')}
            </UseCaseEditLabel>
            <RightArrow />
          </UseCaseCardButton>
        ))}

      {use_cases && EXPRESS_USE_CASES_LIMIT - use_cases.length > 0 ? (
        <UseCaseCardButton
          className="use-case-add-card-button"
          onClick={() => {
            if (values.use_cases) {
              setValues({
                ...values,
                use_cases: [
                  ...values.use_cases,
                  {
                    ...emptyUseCase,
                    ...(expressData &&
                      expressData.default_use_case_text && {
                        description: expressData.default_use_case_text,
                      }),
                    id: highestUseCaseId + 1,
                  },
                ],
              });
            }

            setCurrentUseCase({
              ...emptyUseCase,
              ...(expressData &&
                expressData.default_use_case_text && {
                  description: expressData.default_use_case_text,
                }),
              id: highestUseCaseId + 1,
            });

            dispatch(openUseCaseModal());
          }}
          style={{ marginTop: appTheme.space.md }}
        >
          {errors &&
          touched.use_cases &&
          errors.use_cases &&
          typeof errors.use_cases === 'string' ? (
            <ErrorIcon />
          ) : (
            <AddIcon />
          )}
          <UseCaseCardButtonText>
            <XL isBold>
              {t('__EXPRESS_4_WIZARD_STEP_HOW_ADD_USE_CASE_CARD_TITLE')}
            </XL>
            {/* UseCase validation message */}
            {errors &&
            touched.use_cases &&
            errors.use_cases &&
            typeof errors.use_cases === 'string' ? (
              <UseCaseCardButtonDescription
                style={{ color: appTheme.components.text.dangerColor }}
              >
                {errors.use_cases}
              </UseCaseCardButtonDescription>
            ) : (
              <UseCaseCardButtonDescription>
                {t('__EXPRESS_WIZARD_STEP_HOW_ADD_USE_CASE_CARD_SUBTITLE')}
              </UseCaseCardButtonDescription>
            )}
          </UseCaseCardButtonText>
          <RightArrow />
        </UseCaseCardButton>
      ) : null}
    </>
  );
};

export const HowStepValidationSchema = Yup.object().shape({
  test_description: Yup.string().required(
    i18n.t('__EXPRESS_WIZARD_STEP_HOW_FIELD_GOAL_REQUIRED')
  ),
  use_cases: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        link: Yup.string().url(),
      })
    )
    .min(1, i18n.t('__EXPRESS_4_WIZARD_STEP_HOW_USE_CASE_MODAL_MIN_ERROR')),
});
