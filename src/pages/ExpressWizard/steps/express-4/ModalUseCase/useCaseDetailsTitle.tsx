import { InputToggle, Span } from '@appquality/unguess-design-system';
import { FormikProps } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { HelpTextMessage } from 'src/common/components/helpTextMessage';

const UseCaseTitle = ({
  formikProps,
  useCase,
  useCaseIndex,
}: {
  formikProps: FormikProps<WizardModel>;
  useCase: UseCase;
  useCaseIndex: number;
}) => {
  const { t } = useTranslation();
  const { getFieldProps, validateForm, errors } = formikProps;
  const [title, setTitle] = useState(useCase ? useCase.title : '');

  const useCaseErrors =
    errors && errors.use_cases && Array.isArray(errors.use_cases)
      ? (errors.use_cases[useCaseIndex as number] as UseCase)
      : null;

  return (
    <>
      <InputToggle isFocused>
        <InputToggle.Label>
          {t('__EXPRESS_4_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_TITLE')}
          <Span style={{ color: appTheme.components.text.dangerColor }}>*</Span>
        </InputToggle.Label>
        <InputToggle.Item
          key={`use_cases[${useCaseIndex}].title`}
          textSize="xxl"
          placeholder={t(
            '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_PLACEHOLDER'
          )}
          {...getFieldProps(`use_cases[${useCaseIndex}].title`)}
          {...(useCaseErrors &&
            useCaseErrors?.title && { validation: 'error' })}
          value={title}
          onBlur={() => {
            validateForm();
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputToggle>
      {useCaseErrors && useCaseErrors?.title && (
        <HelpTextMessage validation="error">
          {t('__EXPRESS_4_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_REQUIRED')}
        </HelpTextMessage>
      )}
    </>
  );
};

export { UseCaseTitle };
